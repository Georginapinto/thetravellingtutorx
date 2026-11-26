import React from "react";
import { CheckCircle2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Honeypot } from "@/components/Honeypot";
import { FORMS } from "@/constants/testIds";
import { downloadGuide, useNewsletterSignup } from "@/lib/signup";

// Email box + button for the free essay guide. After signing up it swaps to a
// confirmation with a "download again" button.
export default function SignupForm({ source, cta = "Send My Free Essay Guide", dark = false, testIds = true }) {
  const s = useNewsletterSignup(source);

  if (s.done) {
    return (
      <div className={`flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl ${dark ? "bg-white/10" : "bg-brand-navySoft"}`}>
        <CheckCircle2 className={`w-6 h-6 shrink-0 ${dark ? "text-white" : "text-brand-navyDeep"}`} />
        <p className={`flex-1 text-sm font-medium ${dark ? "text-white" : "text-brand-ink"}`}>
          You're in! Your guide is downloading — and examiner tips are on their way to your inbox.
        </p>
        <Button type="button" onClick={downloadGuide} variant="outline" className="rounded-full h-10 shrink-0">
          <Download className="w-4 h-4 mr-1" /> Download again
        </Button>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={s.submit} className="relative flex flex-col sm:flex-row gap-3">
        <Honeypot value={s.website} onChange={s.setWebsite} />
        <Input
          data-testid={testIds ? FORMS.newsletterEmail : undefined}
          type="email"
          required
          aria-label="Email address"
          placeholder="Your best email"
          value={s.email}
          onChange={(e) => s.setEmail(e.target.value)}
          className="h-14 rounded-full px-6 bg-brand-cream border-border text-brand-ink"
        />
        <Button
          data-testid={testIds ? FORMS.newsletterSubmit : undefined}
          type="submit"
          disabled={s.busy}
          className="h-14 rounded-full bg-brand-maroon hover:bg-brand-maroonDeep text-white px-7 font-semibold shrink-0"
        >
          {s.busy ? "Sending..." : cta}
        </Button>
      </form>
      <p className={`text-xs mt-3 ${dark ? "text-white/60" : "text-brand-mute"}`}>Instant download. 100% free. No spam, unsubscribe any time.</p>
    </div>
  );
}
