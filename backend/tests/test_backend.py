"""Backend tests for The Travelling Tutor — Stripe checkout + existing endpoints."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://sociology-essentials.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def s():
    sess = requests.Session()
    sess.headers.update({"Content-Type": "application/json"})
    return sess


# ---------- existing endpoints ----------
def test_root(s):
    r = s.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("status") == "ok"


def test_testimonials(s):
    r = s.get(f"{API}/testimonials")
    assert r.status_code == 200
    items = r.json().get("items", [])
    assert len(items) == 6
    assert all(k in items[0] for k in ["id", "audience", "name", "rating", "quote"])


def test_contact(s):
    r = s.post(f"{API}/contact", json={
        "name": "TEST_User", "email": "test_contact@example.com", "role": "parent", "message": "hi"
    })
    assert r.status_code == 200
    d = r.json()
    assert d["email"] == "test_contact@example.com" and "id" in d and "created_at" in d


def test_lead_magnet(s):
    r = s.post(f"{API}/lead-magnet", json={
        "first_name": "TEST", "email": "test_lead@example.com",
        "audience": "student", "magnet": "essay-super-structure-families"
    })
    assert r.status_code == 200
    assert r.json()["magnet"] == "essay-super-structure-families"


def test_newsletter_idempotent(s):
    email = "test_newsletter_dup@example.com"
    r1 = s.post(f"{API}/newsletter", json={"email": email, "source": "footer"})
    r2 = s.post(f"{API}/newsletter", json={"email": email, "source": "footer"})
    assert r1.status_code == 200 and r2.status_code == 200
    assert r1.json()["id"] == r2.json()["id"]


def test_tutor_application(s):
    r = s.post(f"{API}/tutor-application", json={
        "name": "TEST_Tutor", "email": "test_tutor@example.com", "phone": "1234",
        "qualifications": "BA", "experience": "5y", "why_join": "love it"
    })
    assert r.status_code == 200
    assert r.json()["email"] == "test_tutor@example.com"


# ---------- Stripe checkout ----------
def test_checkout_invalid_package(s):
    r = s.post(f"{API}/checkout/session", json={
        "package_id": "nonexistent_pkg",
        "origin_url": "https://example.com",
        "name": "TEST_X", "email": "test_x@example.com",
    })
    assert r.status_code == 400


def test_checkout_session_valid(s):
    r = s.post(f"{API}/checkout/session", json={
        "package_id": "tutor_training_deposit",
        "origin_url": "https://example.com",
        "name": "TEST_Buyer", "email": "test_buyer@example.com", "phone": "111",
        # spurious — must be ignored
        "amount": 1.00, "currency": "usd",
    })
    assert r.status_code == 200, r.text
    d = r.json()
    assert "url" in d and "session_id" in d
    assert "stripe.com" in d["url"]
    # status check round-trip
    sid = d["session_id"]
    rs = s.get(f"{API}/checkout/status/{sid}")
    assert rs.status_code == 200
    st = rs.json()
    assert "status" in st and "payment_status" in st
    assert st.get("buyer_email") == "test_buyer@example.com"


def test_checkout_status_repeated_no_credit(s):
    # create a session then call status twice — no exception, fields stable
    r = s.post(f"{API}/checkout/session", json={
        "package_id": "tutor_training_deposit",
        "origin_url": "https://example.com",
        "name": "TEST_R", "email": "test_r@example.com",
    })
    sid = r.json()["session_id"]
    a = s.get(f"{API}/checkout/status/{sid}").json()
    b = s.get(f"{API}/checkout/status/{sid}").json()
    assert a["payment_status"] == b["payment_status"]


def test_webhook_empty_body_400(s):
    r = s.post(f"{API}/webhook/stripe", data=b"", headers={"Content-Type": "application/json"})
    # endpoint exists, returns 400 for invalid signature/body
    assert r.status_code in (400, 422), f"unexpected {r.status_code}: {r.text[:200]}"
