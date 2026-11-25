import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { FORMS } from "../constants/testIds";
import { api } from "../lib/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Honeypot } from "./Honeypot";

const perks = [
  "Free examiner-written revision resources",
  "Insider tips on exactly what AQA examiners reward",
  "Revision strategies that build real exam confidence",
  "First access to bootcamps, workshops & tutoring places",
];

// The mailing-list signup card. `source` is saved with the subscriber so you
// can see which placement on the site brought them in.
export const NewsletterSignup = ({ source = "footer", className = "" }) => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await api.post("/newsletter", { email, source, website });
      toast.success("You're in! Check your inbox for your first free resources.");
      setEmail("");
    } catch {
      toast.error("Something went wrong — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={`bg-white rounded-[2rem] shadow-medium border border-border/60 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center ${className}`}>
      <div>
        <p className="font-handwritten text-3xl text-brand-sageDeep">it's free — sign up today</p>
        <h3 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1">
          Get your best results — and unlock your next steps.
        </h3>
        <p className="text-brand-mute mt-3 max-w-md">
          Straight from an AQA Sociology Examiner to your inbox: the exact techniques that have helped some of my students climb
          from E grades to A grades. Don't leave your grades to chance — the university place, apprenticeship or career
          you want could depend on it.
        </p>
      </div>
      <div>
        <form onSubmit={submit} className="relative flex flex-col sm:flex-row gap-3">
          <Honeypot value={website} onChange={setWebsite} />
          <Input
            data-testid={FORMS.newsletterEmail}
            type="email"
            required
            aria-label="Email address"
            placeholder="Your best email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 rounded-full px-6 bg-brand-warmWhite border-border"
          />
          <Button
            data-testid={FORMS.newsletterSubmit}
            type="submit"
            disabled={busy}
            className="h-14 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white px-7"
          >
            {busy ? "Joining..." : "Yes, Send My Free Resources"}
          </Button>
        </form>
        <p className="text-xs text-brand-mute mt-3">100% free. No spam, unsubscribe any time.</p>
        <ul className="mt-4 space-y-1.5">
          {perks.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-brand-ink/85">
              <CheckCircle2 className="w-4 h-4 text-brand-sageDeep shrink-0" /> {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewsletterSignup;
