import React from "react";
import { FileDown } from "lucide-react";
import ExamCountdown from "@/components/ExamCountdown";
import SignupForm from "@/components/SignupForm";

// A compact sign-up strip placed straight after proof (reviews, TikTok).
export default function InlineSignup({ source, title = "Liked what you saw? Get my free A* essay structure." }) {
  return (
    <div className="rounded-[2rem] bg-brand-navyDeep text-white p-6 md:p-8 grid lg:grid-cols-[1fr_1.1fr] gap-6 items-center">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10 grid place-items-center shrink-0"><FileDown className="w-6 h-6" /></div>
        <div>
          <p className="text-xl md:text-2xl font-semibold leading-snug">{title}</p>
          <ExamCountdown variant="inline" className="mt-2 text-brand-maroonPastel" />
        </div>
      </div>
      <SignupForm source={source} dark testIds={false} />
    </div>
  );
}
