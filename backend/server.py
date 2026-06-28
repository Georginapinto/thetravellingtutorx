from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Literal, Dict, Any
import uuid
from datetime import datetime, timezone
from emergentintegrations.payments.stripe.checkout import (
    StripeCheckout, CheckoutSessionRequest, CheckoutSessionResponse, CheckoutStatusResponse
)


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="The Travelling Tutor API")
api_router = APIRouter(prefix="/api")


# ---------- MODELS ----------
def _now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    role: Literal["student", "parent", "teacher", "other"]
    subject: Optional[str] = None
    message: str


class Contact(ContactCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


class LeadMagnetCreate(BaseModel):
    first_name: str
    email: EmailStr
    audience: Literal["student", "parent", "teacher"]
    magnet: str  # e.g. "revision-starter-pack"


class LeadMagnet(LeadMagnetCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


class NewsletterCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "footer"


class Newsletter(NewsletterCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


class BookingCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    role: Literal["student", "parent", "teacher", "other"]
    preferred_date: Optional[str] = None
    preferred_time: Optional[str] = None
    notes: Optional[str] = None


class Booking(BookingCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


class TutorApplicationCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    qualifications: str
    experience: str
    why_join: str


class TutorApplication(TutorApplicationCreate):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: str = Field(default_factory=_now_iso)


# ---------- ROUTES ----------
@api_router.get("/")
async def root():
    return {"message": "The Travelling Tutor API", "status": "ok"}


@api_router.post("/contact", response_model=Contact)
async def create_contact(payload: ContactCreate):
    obj = Contact(**payload.model_dump())
    await db.contacts.insert_one(obj.model_dump())
    return obj


@api_router.get("/contact", response_model=List[Contact])
async def list_contacts():
    items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return items


@api_router.post("/lead-magnet", response_model=LeadMagnet)
async def create_lead_magnet(payload: LeadMagnetCreate):
    obj = LeadMagnet(**payload.model_dump())
    await db.lead_magnets.insert_one(obj.model_dump())
    return obj


@api_router.post("/newsletter", response_model=Newsletter)
async def subscribe_newsletter(payload: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": payload.email}, {"_id": 0})
    if existing:
        return existing
    obj = Newsletter(**payload.model_dump())
    await db.newsletter.insert_one(obj.model_dump())
    return obj


@api_router.post("/booking", response_model=Booking)
async def create_booking(payload: BookingCreate):
    obj = Booking(**payload.model_dump())
    await db.bookings.insert_one(obj.model_dump())
    return obj


@api_router.post("/tutor-application", response_model=TutorApplication)
async def create_tutor_application(payload: TutorApplicationCreate):
    obj = TutorApplication(**payload.model_dump())
    await db.tutor_applications.insert_one(obj.model_dump())
    return obj


@api_router.get("/testimonials")
async def get_testimonials():
    # Curated static testimonials (could be moved to DB later)
    return {
        "items": [
            {
                "id": "1",
                "audience": "student",
                "name": "Amelia R.",
                "role": "A-Level Sociology Student",
                "rating": 5,
                "quote": "Went from a predicted C to an A* in six months. Georgina actually teaches you how examiners think — nothing felt like guesswork anymore.",
            },
            {
                "id": "2",
                "audience": "parent",
                "name": "Sarah & David M.",
                "role": "Parents of Year 13 student",
                "rating": 5,
                "quote": "We tried two other tutors. The difference with The Travelling Tutor was night and day — structured, calm, and our daughter finally believed she could do it.",
            },
            {
                "id": "3",
                "audience": "teacher",
                "name": "Priya K.",
                "role": "Head of Sociology, Manchester",
                "rating": 5,
                "quote": "The CPD session reset our whole department. Practical, examiner-led and immediately usable in lessons.",
            },
            {
                "id": "4",
                "audience": "student",
                "name": "Jordan T.",
                "role": "GCSE Sociology Student",
                "rating": 5,
                "quote": "I used to panic at essay questions. Now I have a plan I can actually follow. My mock jumped two grades.",
            },
            {
                "id": "5",
                "audience": "parent",
                "name": "Helen W.",
                "role": "Mum of Year 11",
                "rating": 5,
                "quote": "Honest feedback every session. Felt like we finally had someone in our corner who knew exactly what the exam wanted.",
            },
            {
                "id": "6",
                "audience": "teacher",
                "name": "Marcus B.",
                "role": "Tutor Partner",
                "rating": 5,
                "quote": "Joining the Tutor Partner Programme gave me leads, structure and a real community. I left my full-time role within a year.",
            },
        ]
    }


# ---------- STRIPE / TRAINING PROGRAMME ----------
# Server-side fixed packages — NEVER trust amounts from frontend.
PACKAGES: Dict[str, Dict[str, Any]] = {
    "tutor_training_deposit": {
        "name": "Sociology Tutor Training Programme — Deposit",
        "description": "Deposit to secure your place. Total programme £497. Balance due 19 July.",
        "amount": 248.50,
        "currency": "gbp",
        "programme": "tutor_training_2025_07",
    },
}


class CheckoutCreateRequest(BaseModel):
    package_id: str
    origin_url: str
    name: str
    email: EmailStr
    phone: Optional[str] = None


@api_router.post("/checkout/session")
async def create_checkout(payload: CheckoutCreateRequest, request: Request):
    pkg = PACKAGES.get(payload.package_id)
    if not pkg:
        raise HTTPException(400, "Invalid package")

    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        raise HTTPException(500, "Stripe is not configured")

    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    sc = StripeCheckout(api_key=api_key, webhook_url=webhook_url)

    origin = payload.origin_url.rstrip("/")
    success_url = f"{origin}/tutor-partner?session_id={{CHECKOUT_SESSION_ID}}"
    cancel_url = f"{origin}/tutor-partner?status=cancelled"

    metadata = {
        "package_id": payload.package_id,
        "programme": pkg["programme"],
        "buyer_name": payload.name,
        "buyer_email": payload.email,
        "buyer_phone": payload.phone or "",
        "source": "tutor_partner_page",
    }

    req = CheckoutSessionRequest(
        amount=float(pkg["amount"]),
        currency=pkg["currency"],
        success_url=success_url,
        cancel_url=cancel_url,
        metadata=metadata,
    )
    session: CheckoutSessionResponse = await sc.create_checkout_session(req)

    await db.payment_transactions.insert_one({
        "id": str(uuid.uuid4()),
        "session_id": session.session_id,
        "package_id": payload.package_id,
        "amount": float(pkg["amount"]),
        "currency": pkg["currency"],
        "buyer_name": payload.name,
        "buyer_email": payload.email,
        "buyer_phone": payload.phone or "",
        "metadata": metadata,
        "status": "initiated",
        "payment_status": "pending",
        "created_at": _now_iso(),
        "updated_at": _now_iso(),
    })

    return {"url": session.url, "session_id": session.session_id}


@api_router.get("/checkout/status/{session_id}")
async def checkout_status(session_id: str, request: Request):
    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        raise HTTPException(500, "Stripe is not configured")
    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    sc = StripeCheckout(api_key=api_key, webhook_url=webhook_url)

    status: CheckoutStatusResponse = await sc.get_checkout_status(session_id)

    tx = await db.payment_transactions.find_one({"session_id": session_id}, {"_id": 0})
    already_paid = tx and tx.get("payment_status") == "paid"

    if not already_paid:
        await db.payment_transactions.update_one(
            {"session_id": session_id},
            {"$set": {
                "status": status.status,
                "payment_status": status.payment_status,
                "amount_total": status.amount_total,
                "updated_at": _now_iso(),
            }},
        )

    return {
        "status": status.status,
        "payment_status": status.payment_status,
        "amount_total": status.amount_total,
        "currency": status.currency,
        "metadata": status.metadata,
        "buyer_email": (tx or {}).get("buyer_email"),
        "buyer_name": (tx or {}).get("buyer_name"),
    }


@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    api_key = os.environ.get("STRIPE_API_KEY")
    if not api_key:
        raise HTTPException(500, "Stripe is not configured")
    host_url = str(request.base_url).rstrip("/")
    webhook_url = f"{host_url}/api/webhook/stripe"
    sc = StripeCheckout(api_key=api_key, webhook_url=webhook_url)

    body = await request.body()
    signature = request.headers.get("Stripe-Signature")
    try:
        event = await sc.handle_webhook(body, signature)
    except Exception as e:
        logger.exception("Stripe webhook handling failed")
        raise HTTPException(400, f"Webhook error: {e}")

    if getattr(event, "session_id", None):
        await db.payment_transactions.update_one(
            {"session_id": event.session_id},
            {"$set": {
                "payment_status": getattr(event, "payment_status", "unknown"),
                "last_event": getattr(event, "event_type", "unknown"),
                "updated_at": _now_iso(),
            }},
        )
    return {"received": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
