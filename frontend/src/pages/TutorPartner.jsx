import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { BRAND, FORMS } from "@/constants/testIds";
import { api } from "@/lib/api";
import { toast } from "sonner";
import {
  CheckCircle2, Plane, Heart, PoundSterling, Users, MonitorPlay, FileEdit, GraduationCap,
  MessageCircle, ClipboardCheck, BarChart3, ShieldCheck, CalendarDays, Award, Sparkles,
  Lock, Mail, BookOpenCheck, Video, AlertCircle
} from "lucide-react";

// ----- Programme constants (mirrors backend PACKAGES["tutor_training_deposit"]) -----
const PROGRAMME = {
  title: "Sociology Tutor Training Programme",
  subtitle: "AQA Examiner-Led · 6-Week Cohort",
  startDate: "Week beginning 20th July",
  weeks: 6,
  cadence: "1 live session per week + recordings",
  total: 497,
  deposit: 248.5,
  balanceDue: "19th July",
  cohortCap: 12,
};

const whoFor = [
  "You want to become a confident Sociology tutor",
  "You want examiner-level understanding of AQA marking",
  "You want a flexible, online income — on your terms",
  "You want structured training, not a free-for-all",
  "You're ready to commit to one focused live session per week",
];

const founderCreds = [
  { i: GraduationCap, t: "Qualified Teacher", d: "Years in the classroom across GCSE & A-Level Sociology." },
  { i: Award, t: "Director of Sixth Form", d: "Leading academic teams and shaping student outcomes." },
  { i: ClipboardCheck, t: "AQA Examiner Training", d: "Trained as an AQA Sociology examiner — knows the mark scheme inside out." },
  { i: BookOpenCheck, t: "8 Years Marking Scripts", d: "Nearly a decade of marking real candidate scripts at the top end." },
];

const whatHappensNext = [
  { i: Mail, t: "Instant confirmation email", d: "Your receipt + welcome pack lands in your inbox within seconds." },
  { i: Lock, t: "Private Google Classroom access", d: "All materials, recordings and resources in one place." },
  { i: CalendarDays, t: "Start: week beginning 20th July", d: "1 live session per week for 6 weeks. Recorded if you miss one." },
  { i: Video, t: "Every session recorded", d: "Catch up any time — perfect if you've got teaching or family commitments." },
];

const process = [
  { n: 1, i: MessageCircle, t: "Apply", d: "Tell us about you below — we'll review and reply within 48 hours." },
  { n: 2, i: PoundSterling, t: "Secure your place", d: "Pay your £248.50 deposit via Stripe to confirm your seat." },
  { n: 3, i: GraduationCap, t: "Train", d: "6 weekly examiner-led sessions + private Google Classroom." },
  { n: 4, i: BarChart3, t: "Start earning", d: "Begin tutoring as a Travelling Tutor X partner." },
];

// ---------- Payment helpers ----------
const useQuery = () => new URLSearchParams(useLocation().search);

function PaymentStatusModal({ open, onOpenChange, status, buyerEmail }) {
  if (!open) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-3xl p-0 overflow-hidden">
        {status === "paid" ? (
          <>
            <div className="bg-brand-sageSoft p-6 flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white grid place-items-center text-brand-sageDeep">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold text-brand-ink">You're in! Welcome to the cohort.</DialogTitle>
                <DialogDescription className="text-brand-mute">Deposit received — your place is confirmed.</DialogDescription>
              </div>
            </div>
            <div className="p-6 space-y-4 text-sm text-brand-ink">
              <p>{buyerEmail ? <>A confirmation email is on the way to <span className="font-semibold">{buyerEmail}</span>.</> : "A confirmation email is on the way."}</p>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2"><Mail className="w-5 h-5 text-brand-pink flex-none mt-0.5" /> Instant receipt + welcome pack in your inbox.</li>
                <li className="flex items-start gap-2"><Lock className="w-5 h-5 text-brand-pink flex-none mt-0.5" /> Private Google Classroom invite within 24 hours.</li>
                <li className="flex items-start gap-2"><CalendarDays className="w-5 h-5 text-brand-pink flex-none mt-0.5" /> Cohort starts <span className="font-semibold">week beginning 20th July</span> — 1 live session per week for 6 weeks.</li>
                <li className="flex items-start gap-2"><Video className="w-5 h-5 text-brand-pink flex-none mt-0.5" /> Every session recorded — catch up any time.</li>
                <li className="flex items-start gap-2"><PoundSterling className="w-5 h-5 text-brand-pink flex-none mt-0.5" /> Remaining balance (£248.50) due by <span className="font-semibold">19th July</span>.</li>
              </ul>
              <Button onClick={() => onOpenChange(false)} className="w-full mt-2 h-12 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white">Brilliant, see you soon</Button>
            </div>
          </>
        ) : status === "cancelled" ? (
          <div className="p-8 text-center">
            <AlertCircle className="w-10 h-10 mx-auto text-brand-pink" />
            <h4 className="text-2xl font-heading mt-3">Payment cancelled</h4>
            <p className="text-brand-mute mt-2">No worries — your place isn't booked yet. You can try again whenever you're ready.</p>
            <Button onClick={() => onOpenChange(false)} className="mt-6 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white px-6 h-11">Close</Button>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="w-10 h-10 mx-auto rounded-full border-4 border-brand-pink/30 border-t-brand-pink animate-spin" />
            <h4 className="text-2xl font-heading mt-3">Checking your payment...</h4>
            <p className="text-brand-mute mt-2">This usually takes just a few seconds.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function TutorPartner() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [busy, setBusy] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState("pending");
  const [buyerEmail, setBuyerEmail] = useState(null);
  const query = useQuery();
  const navigate = useNavigate();
  const location = useLocation();

  const u = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }));

  // Poll payment status when returning from Stripe
  useEffect(() => {
    const sessionId = query.get("session_id");
    const status = query.get("status");
    if (status === "cancelled") {
      setModalStatus("cancelled");
      setModalOpen(true);
      navigate(location.pathname, { replace: true });
      return;
    }
    if (!sessionId) return;
    setModalStatus("pending");
    setModalOpen(true);

    let attempts = 0;
    const max = 8;
    const tick = async () => {
      attempts += 1;
      try {
        const { data } = await api.get(`/checkout/status/${sessionId}`);
        setBuyerEmail(data.buyer_email || null);
        if (data.payment_status === "paid") {
          setModalStatus("paid");
          navigate(location.pathname, { replace: true });
          return;
        }
        if (data.status === "expired") {
          setModalStatus("cancelled");
          navigate(location.pathname, { replace: true });
          return;
        }
      } catch {}
      if (attempts < max) setTimeout(tick, 2000);
      else {
        setModalStatus("cancelled");
        toast.error("Couldn't confirm payment automatically. Check your email or contact us.");
      }
    };
    tick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkout = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Please add your name & email first.");
    setBusy(true);
    try {
      const { data } = await api.post("/checkout/session", {
        package_id: "tutor_training_deposit",
        origin_url: window.location.origin,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });
      if (data.url) window.location.href = data.url;
      else toast.error("Couldn't start checkout — please try again.");
    } catch (err) {
      toast.error("Checkout failed. Please try again or email help@thetravellingtutorx.co.uk");
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="AQA examiner-led · 6 weeks · cohort starts 20 July"
        title={
          <>
            Sociology Tutor Training Programme <span className="font-handwritten text-brand-pink block mt-2">AQA Examiner-Led</span>
          </>
        }
        lede="A focused 6-week training programme to become a confident, examiner-aware Sociology tutor. One live session per week, every session recorded, full private Google Classroom — and the brand-name partnership behind you."
        accent="sage"
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <a href="#secure-place">Secure my place <Plane className="w-4 h-4 ml-2 -rotate-12" /></a>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-pink/40 text-brand-pink hover:bg-brand-pinkSoft">
          <a href="#whats-included">See what's included</a>
        </Button>
      </PageHero>

      {/* AT-A-GLANCE */}
      <section className="bg-brand-pinkSoft py-10">
        <div className="container-px max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { l: "Cohort starts", v: "Week of 20 July" },
            { l: "Length", v: "6 weeks · 1 session/week" },
            { l: "Sessions", v: "All recorded" },
            { l: "Cohort size", v: `Capped at ${PROGRAMME.cohortCap}` },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-semibold text-brand-ink text-lg md:text-xl">{s.v}</p>
              <p className="text-sm text-brand-mute mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOUNDER / TRUST */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-sageSoft rounded-[2.5rem] -rotate-2" />
            <img src={BRAND.avatar} alt="Georgina — Founder, The Travelling Tutor X" className="relative bg-brand-pinkSoft rounded-[2.5rem] aspect-square object-contain w-full shadow-medium" />
            <div className="absolute -bottom-5 right-5 bg-white rounded-2xl shadow-medium p-4 max-w-[240px] border border-border/50">
              <p className="font-handwritten text-2xl text-brand-pink leading-none">A message from Georgina —</p>
              <p className="text-sm text-brand-mute mt-2">"This is the training I wish existed when I started tutoring. Examiner-led, no fluff."</p>
            </div>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pinkSoft text-brand-pink text-xs font-semibold uppercase tracking-wide">About the Lead Tutor</span>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-3">You'll learn directly from an AQA Sociology examiner.</h2>
            <p className="text-brand-mute mt-4 text-lg">No layers. No theory-only modules. Every session is led personally by Georgina — founder of The Travelling Tutor X.</p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {founderCreds.map((c) => (
                <div key={c.t} className="rounded-2xl p-4 bg-brand-warmWhite border border-border/60">
                  <c.i className="w-6 h-6 text-brand-pink" />
                  <p className="font-semibold text-brand-ink mt-2">{c.t}</p>
                  <p className="text-sm text-brand-mute mt-1">{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="section-y">
        <div className="container-px max-w-5xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-sageSoft p-8 md:p-14">
            <p className="font-handwritten text-3xl text-brand-pink">this is for you if...</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1">A clear fit — or not at all.</h2>
            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {whoFor.map((t) => (
                <li key={t} className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-white">
                  <CheckCircle2 className="w-5 h-5 text-brand-sageDeep flex-none mt-0.5" />
                  <span className="text-brand-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section id="whats-included" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink text-center">What's included</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { i: GraduationCap, t: "6 live sessions", d: "1 per week — direct teaching from an AQA examiner." },
              { i: Video, t: "Full recordings", d: "Every session recorded so you never miss a beat." },
              { i: Lock, t: "Private Google Classroom", d: "All slides, resources & worked examples in one place." },
              { i: FileEdit, t: "Tutor toolkit", d: "Essay frameworks, mark scheme decoders, lesson plans." },
              { i: Users, t: "Q&A + feedback", d: "Small cohort means real feedback — not noise." },
              { i: Sparkles, t: "Brand partnership pathway", d: "Optional route to becoming a Travelling Tutor X partner." },
              { i: MonitorPlay, t: "Content templates", d: "TikTok hooks, captions, evergreen post templates." },
              { i: Heart, t: "Community", d: "Ongoing alumni group after the programme ends." },
            ].map((s) => (
              <div key={s.t} className="rounded-3xl p-6 bg-brand-warmWhite border border-border/60 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-brand-pink text-white grid place-items-center"><s.i className="w-6 h-6" /></div>
                <p className="font-semibold text-brand-ink mt-4">{s.t}</p>
                <p className="text-sm text-brand-mute mt-1.5">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="section-y">
        <div className="container-px max-w-5xl mx-auto">
          <p className="font-handwritten text-3xl text-brand-pink text-center">straight after you pay</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink text-center mt-1">What happens next.</h2>
          <p className="text-brand-mute text-center mt-3 max-w-xl mx-auto">No mystery — here's exactly what arrives the moment your deposit clears.</p>
          <div className="mt-10 grid sm:grid-cols-2 gap-5">
            {whatHappensNext.map((s) => (
              <div key={s.t} className="rounded-3xl p-6 bg-white border border-border/60 shadow-soft">
                <div className="w-12 h-12 rounded-2xl bg-brand-pinkSoft text-brand-pink grid place-items-center"><s.i className="w-6 h-6" /></div>
                <p className="font-semibold text-brand-ink mt-4">{s.t}</p>
                <p className="text-sm text-brand-mute mt-1.5">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink text-center">How it works</h2>
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            {process.map((s) => (
              <div key={s.n} className="rounded-3xl p-6 bg-brand-warmWhite border border-border/60 text-center">
                <div className="relative w-14 h-14 mx-auto rounded-full bg-brand-pinkSoft text-brand-pink grid place-items-center">
                  <s.i className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-brand-pink text-white text-xs font-semibold grid place-items-center">{s.n}</span>
                </div>
                <h3 className="mt-4 font-semibold text-brand-ink">{s.t}</h3>
                <p className="text-sm text-brand-mute mt-1">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAYMENT / SECURE PLACE */}
      <section id="secure-place" className="section-y">
        <div className="container-px max-w-3xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-12 relative overflow-hidden">
            <span className="absolute -top-3 left-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink text-white text-xs font-semibold uppercase tracking-wide shadow-soft">
              <AlertCircle className="w-3.5 h-3.5" /> Cohort capped at {PROGRAMME.cohortCap} — personalised feedback
            </span>
            <p className="font-handwritten text-3xl text-brand-pink mt-3">secure your place</p>
            <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1">Pay your deposit. Confirm your seat.</h2>

            <div className="mt-6 grid sm:grid-cols-2 gap-4 text-sm">
              <div className="bg-white rounded-2xl p-5">
                <p className="text-brand-mute">Programme total</p>
                <p className="text-3xl font-semibold text-brand-ink mt-1">£{PROGRAMME.total.toFixed(2)}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 ring-2 ring-brand-pink">
                <p className="text-brand-pink font-semibold">Deposit today</p>
                <p className="text-3xl font-semibold text-brand-ink mt-1">£{PROGRAMME.deposit.toFixed(2)}</p>
                <p className="text-xs text-brand-mute mt-1">Balance £{PROGRAMME.deposit.toFixed(2)} due by {PROGRAMME.balanceDue}</p>
              </div>
            </div>

            <ul className="mt-5 grid sm:grid-cols-2 gap-2 text-sm text-brand-ink">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-sageDeep" /> Secure card payment via Stripe</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-sageDeep" /> No hidden fees</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-sageDeep" /> Place confirmed once deposit received</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-sageDeep" /> Receipt + Google Classroom invite within 24h</li>
            </ul>

            <form onSubmit={checkout} className="mt-7 bg-white rounded-2xl p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><Label>Full name</Label><Input data-testid={FORMS.applyName} required value={form.name} onChange={u("name")} className="h-12 rounded-xl mt-1" /></div>
                <div><Label>Email</Label><Input data-testid={FORMS.applyEmail} required type="email" value={form.email} onChange={u("email")} className="h-12 rounded-xl mt-1" /></div>
              </div>
              <div><Label>Phone (optional)</Label><Input data-testid={FORMS.applyPhone} value={form.phone} onChange={u("phone")} className="h-12 rounded-xl mt-1" /></div>
              <Button
                data-testid="checkout-deposit-btn"
                type="submit"
                disabled={busy}
                className="w-full h-13 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white text-base"
              >
                {busy ? "Opening secure checkout..." : `Pay £${PROGRAMME.deposit.toFixed(2)} deposit & secure my place`}
              </Button>
              <p className="text-xs text-brand-mute text-center">By continuing you agree the £{PROGRAMME.deposit.toFixed(2)} balance is due by {PROGRAMME.balanceDue}. Your place is only confirmed once the deposit is received.</p>
            </form>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-px max-w-5xl mx-auto text-center">
          <p className="font-handwritten text-3xl text-brand-pink">teach. inspire. earn.</p>
          <h3 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1 max-w-2xl mx-auto">A growing Sociology brand — and a place for you in it.</h3>
          <p className="text-brand-mute mt-4 max-w-xl mx-auto">Questions? Email <a className="text-brand-pink underline-grow" href="mailto:help@thetravellingtutorx.co.uk">help@thetravellingtutorx.co.uk</a> — we reply within 24 hours.</p>
        </div>
      </section>

      <PaymentStatusModal open={modalOpen} onOpenChange={setModalOpen} status={modalStatus} buyerEmail={buyerEmail} />
    </>
  );
}
