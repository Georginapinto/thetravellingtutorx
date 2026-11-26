import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FileDown, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ExamCountdown from "@/components/ExamCountdown";
import SignupForm from "@/components/SignupForm";
import { PROOF } from "@/components/NewsletterSignup";
import { hasSignedUp, onOpenSignupPopup, openSignupPopup, store } from "@/lib/signup";

const SEEN_KEY = "ttx_popup_seen_v1";
const DISMISS_BAR_KEY = "ttx_signup_bar_dismissed_v1";
const DELAY_MS = 35000;
const NO_AUTO_PATHS = ["/contact"];

// Free-guide pop-up. Opens by itself once per visitor — when they move to
// leave the page (desktop) or after 35 seconds — and whenever the mobile bar
// is tapped. Never opens by itself for someone who has already signed up.
export function SignupPopup() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => onOpenSignupPopup(() => setOpen(true)), []);

  useEffect(() => {
    if (hasSignedUp() || store.get(SEEN_KEY) || NO_AUTO_PATHS.includes(pathname)) return;
    const show = () => {
      if (hasSignedUp() || store.get(SEEN_KEY)) return;
      store.set(SEEN_KEY, "1");
      setOpen(true);
    };
    const onLeave = (e) => { if (e.clientY <= 0 && !e.relatedTarget) show(); };
    const t = setTimeout(show, DELAY_MS);
    document.addEventListener("mouseout", onLeave);
    return () => { clearTimeout(t); document.removeEventListener("mouseout", onLeave); };
  }, [pathname]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-xl rounded-[2rem] bg-white p-7 md:p-10 border-0 max-h-[90vh] overflow-y-auto">
        <div className="w-12 h-12 rounded-2xl bg-brand-maroon text-white grid place-items-center"><FileDown className="w-6 h-6" /></div>
        <DialogTitle className="text-2xl md:text-3xl font-semibold text-brand-ink leading-tight">
          Wait — grab the essay structure examiners reward.
        </DialogTitle>
        <DialogDescription className="text-brand-mute text-base">
          My free A* Essay Super-Structure, with a full model answer annotated by an AQA examiner. Instant download.
        </DialogDescription>
        <ExamCountdown />
        <SignupForm source="popup" cta="Send It Free" testIds={false} />
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {PROOF.map(([Icon, t]) => (
            <span key={t} className="flex items-center gap-1.5 text-xs font-semibold text-brand-navyDeep">
              <Icon className="w-3.5 h-3.5 text-brand-maroon" /> {t}
            </span>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Slim bar pinned to the bottom of the screen on phones once the visitor has
// scrolled a little. Tapping it opens the pop-up; it can be closed for good.
export function StickySignupBar() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(() => hasSignedUp() || !!store.get(DISMISS_BAR_KEY));

  useEffect(() => {
    if (closed) return;
    const onScroll = () => setVisible(window.scrollY > 700 && !hasSignedUp());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [closed]);

  if (closed || !visible) return null;

  const close = () => { store.set(DISMISS_BAR_KEY, "1"); setClosed(true); };

  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] animate-fade-up" data-testid="signup-bar">
      <div className="flex items-center gap-2 rounded-full bg-brand-navyDeep text-white shadow-medium pl-5 pr-1.5 py-1.5">
        <p className="flex-1 text-sm font-semibold leading-tight">Free A* essay guide</p>
        <button
          type="button"
          onClick={openSignupPopup}
          className="h-10 px-5 rounded-full bg-brand-maroon hover:bg-brand-maroonDeep text-sm font-semibold"
        >
          Get it free
        </button>
        <button type="button" onClick={close} aria-label="Close" className="p-2 rounded-full text-white/70 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
