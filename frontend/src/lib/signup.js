import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { SIGNUP_GUIDE } from "@/constants/site";

// Shared state for every email sign-up on the site (homepage card, inline
// forms, pop-up, mobile bar). Storage can be blocked, so every access is guarded.
const SIGNED_UP_KEY = "ttx_signed_up_v1";
const OPEN_EVENT = "ttx:open-signup";

export const store = {
  get(key) { try { return window.localStorage.getItem(key); } catch { return null; } },
  set(key, v) { try { window.localStorage.setItem(key, v); } catch { /* ignore */ } },
};

export const hasSignedUp = () => store.get(SIGNED_UP_KEY) === "1";
export const openSignupPopup = () => window.dispatchEvent(new Event(OPEN_EVENT));
export const onOpenSignupPopup = (fn) => {
  window.addEventListener(OPEN_EVENT, fn);
  return () => window.removeEventListener(OPEN_EVENT, fn);
};

export const downloadGuide = () => {
  const a = document.createElement("a");
  a.href = SIGNUP_GUIDE.url;
  a.target = "_blank";
  a.rel = "noopener";
  a.download = SIGNUP_GUIDE.filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

// `source` is saved with the subscriber so you can see which placement worked.
export function useNewsletterSignup(source) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await api.post("/newsletter", { email, source, website });
      store.set(SIGNED_UP_KEY, "1");
      setDone(true);
      downloadGuide();
      toast.success("You're in! Your free essay guide is downloading now.");
    } catch {
      toast.error("Something went wrong — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return { email, setEmail, website, setWebsite, busy, done, submit };
}
