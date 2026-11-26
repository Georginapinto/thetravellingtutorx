import React, { useEffect, useState } from "react";
import { CalendarClock } from "lucide-react";
import { EXAM_DATES } from "@/constants/site";

const DAY = 24 * 60 * 60 * 1000;

// Whole days from today (UK calendar date) until each exam date.
function daysUntil(iso) {
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/London" });
  return Math.round((Date.parse(iso) - Date.parse(today)) / DAY);
}

function useExams() {
  const calc = () => EXAM_DATES.map((e) => ({ ...e, days: daysUntil(e.date) })).filter((e) => e.days >= 0);
  const [exams, setExams] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setExams(calc()), 60 * 60 * 1000);
    return () => clearInterval(t);
  }, []);
  return exams;
}

const label = (d) => (d === 0 ? "Today" : d === 1 ? "1 day" : `${d} days`);

// "days until the first AQA exam" for each subject. `variant`:
// "card" (big tiles), "inline" (one line of text), "dark" (tiles on navy).
export default function ExamCountdown({ variant = "card", className = "" }) {
  const exams = useExams();
  if (!exams.length) return null;

  if (variant === "inline") {
    return (
      <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold ${className}`}>
        <CalendarClock className="w-4 h-4 shrink-0" />
        {exams.map((e, i) => (
          <span key={e.subject}>
            {label(e.days)} until AQA {e.subject}{i < exams.length - 1 ? " ·" : ""}
          </span>
        ))}
      </p>
    );
  }

  const dark = variant === "dark";
  return (
    <div className={className} data-testid="exam-countdown">
      <p className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-wider ${dark ? "text-white/75" : "text-brand-maroon"}`}>
        <CalendarClock className="w-4 h-4" /> Days until the first AQA exam
      </p>
      <div className="mt-3 grid grid-cols-2 gap-3 max-w-sm">
        {exams.map((e) => (
          <div key={e.subject} className={`rounded-2xl px-4 py-3 ${dark ? "bg-white/10 border border-white/15" : "bg-brand-maroonSoft"}`}>
            <p className={`text-3xl md:text-4xl font-bold leading-none tabular-nums ${dark ? "text-white" : "text-brand-maroon"}`}>{e.days}</p>
            <p className={`text-sm font-medium mt-1.5 ${dark ? "text-white/80" : "text-brand-navyDeep"}`}>days · {e.subject}</p>
            <p className={`text-xs mt-0.5 ${dark ? "text-white/55" : "text-brand-mute"}`}>
              {new Date(e.date).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
