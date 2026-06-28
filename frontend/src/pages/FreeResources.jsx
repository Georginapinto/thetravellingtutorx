import React from "react";
import PageHero from "@/components/PageHero";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { ClipboardList, FileText, BookOpenCheck, Target, Mail, Sparkles, Compass } from "lucide-react";

const packs = [
  {
    audience: "student",
    magnet: "revision-starter-pack",
    title: "Sociology Revision Starter Pack",
    desc: "For students. Examiner essay tips, revision checklist, command words guide, essay planner and weekly revision emails.",
    color: "bg-brand-pinkSoft",
    icon: ClipboardList,
    cta: "Download Free Pack",
  },
  {
    audience: "parent",
    magnet: "parent-guide",
    title: "Parent Guide to Sociology Success",
    desc: "For parents. Revision advice, how parents can help, study planning and motivation tips.",
    color: "bg-brand-sageSoft",
    icon: Compass,
    cta: "Send Me the Parent Guide",
  },
  {
    audience: "teacher",
    magnet: "teacher-resources",
    title: "Free Sociology Teaching Resources",
    desc: "For teachers. Lesson activities, essay planner, retrieval quiz, CPD updates and tutor opportunities.",
    color: "bg-brand-pinkPastel",
    icon: BookOpenCheck,
    cta: "Join the Teacher Community",
  },
];

export default function FreeResources() {
  return (
    <>
      <PageHero
        eyebrow="free, always"
        title="Free Sociology resources for every journey."
        lede="Pick the pack that fits you — students, parents or teachers. Each one is examiner-led, classroom-tested and immediately useful."
      />

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
          {packs.map((p) => (
            <div key={p.audience} className={`rounded-[2rem] p-7 ${p.color} border border-white shadow-soft`}>
              <div className="w-14 h-14 rounded-2xl bg-white grid place-items-center text-brand-pink"><p.icon className="w-6 h-6" /></div>
              <h3 className="mt-5 text-2xl font-semibold text-brand-ink">{p.title}</h3>
              <p className="text-brand-mute mt-2">{p.desc}</p>
              <div className="mt-6 bg-white rounded-2xl p-5">
                <LeadMagnetForm audience={p.audience} magnet={p.magnet} ctaLabel={p.cta} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
