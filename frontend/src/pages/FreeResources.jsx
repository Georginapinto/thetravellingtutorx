import React from "react";
import PageHero from "@/components/PageHero";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { BRAND } from "@/constants/testIds";
import { ClipboardList, FileText, BookOpenCheck, Target, Mail, Sparkles, Compass, FileDown } from "lucide-react";

const packs = [
  {
    audience: "student",
    magnet: "essay-super-structure-families",
    title: "Essay Super Structure: Families & Households (10m)",
    desc: "For students. Georgina's recommended essay structure with a full annotated model answer for the AQA Sociology Families & Households 10-marker.",
    color: "bg-brand-pinkSoft",
    icon: FileDown,
    cta: "Get my free essay guide",
    downloadUrl: BRAND.essayStructurePdf,
    downloadFilename: "Essay-Super-Structure-Families-and-Households-10m.pdf",
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
              <span className="inline-block mt-4 text-xs px-3 py-1 rounded-full bg-white/70 text-brand-ink font-semibold tracking-wide uppercase">For {p.audience}s</span>
              <h3 className="mt-3 text-2xl font-semibold text-brand-ink leading-tight">{p.title}</h3>
              <p className="text-brand-mute mt-2">{p.desc}</p>
              <div className="mt-6 bg-white rounded-2xl p-5">
                <LeadMagnetForm
                  audience={p.audience}
                  magnet={p.magnet}
                  ctaLabel={p.cta}
                  downloadUrl={p.downloadUrl}
                  downloadFilename={p.downloadFilename}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
