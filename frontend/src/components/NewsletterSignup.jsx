import React from "react";
import { CheckCircle2, Users, Play, Award } from "lucide-react";
import ExamCountdown from "@/components/ExamCountdown";
import SignupForm from "@/components/SignupForm";

const perks = [
  "The essay structure examiners reward, with an annotated A* model answer",
  "Insider tips on exactly what AQA examiners look for",
  "Revision strategies that build real exam confidence",
  "First access to bootcamps, workshops & tutoring places",
];

export const PROOF = [
  [Award, "9 years as an AQA examiner"],
  [Users, "1,000s of students taught"],
  [Play, "42K+ views on TikTok lessons"],
];

// The main mailing-list card: exam countdown, the free guide offer and proof.
export const NewsletterSignup = ({ source = "footer", className = "" }) => (
  <div className={`bg-white rounded-[2rem] shadow-medium border border-border/60 p-8 md:p-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center ${className}`}>
    <div>
      <ExamCountdown />
      <h3 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-6 leading-tight">
        Get my free A* essay structure — before the clock runs out.
      </h3>
      <p className="text-brand-mute mt-3 max-w-md">
        Straight from an <strong className="text-brand-ink">AQA EXAMINER</strong>: the exact essay structure that has helped some of
        my students climb from E grades to A grades. Every week you wait is a week less to practise it.
      </p>
    </div>
    <div>
      <SignupForm source={source} />
      <ul className="mt-5 space-y-1.5">
        {perks.map((p) => (
          <li key={p} className="flex items-start gap-2 text-sm text-brand-ink/85">
            <CheckCircle2 className="w-4 h-4 text-brand-navyDeep shrink-0 mt-0.5" /> {p}
          </li>
        ))}
      </ul>
      <div className="mt-5 pt-5 border-t border-border/60 flex flex-wrap gap-x-5 gap-y-2">
        {PROOF.map(([Icon, t]) => (
          <span key={t} className="flex items-center gap-1.5 text-xs font-semibold text-brand-navyDeep">
            <Icon className="w-4 h-4 text-brand-maroon" /> {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default NewsletterSignup;
