import React from "react";
import PageHero from "@/components/PageHero";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Sparkles, MonitorPlay, BookOpenCheck, ArrowUpRight, ClipboardList, FileText, Mail, Target } from "lucide-react";

const services = [
  { icon: GraduationCap, t: "One-to-One Tutoring", d: "Bespoke weekly sessions tailored to your spec, your weak spots, and your target grade." },
  { icon: Sparkles, t: "Sociology Grade Booster Bootcamps", d: "Our flagship group programme — small cohorts, examiner-led structure, real results." },
  { icon: MonitorPlay, t: "Online Course", d: "Self-paced video lessons covering every AQA Sociology paper." },
  { icon: BookOpenCheck, t: "Revision Workshops", d: "Intensive sessions focused on essay craft and exam technique." },
];

export default function Students() {
  return (
    <>
      <PageHero
        eyebrow="for students"
        title="Top grades in GCSE & A-Level Sociology — without the panic."
        lede="Learn from someone who actually marks AQA Sociology exams. Clear structure, examiner-tested essay frameworks, and the confidence to walk into any question."
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <Link to="/contact">Get one-to-one support</Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-pink/40 text-brand-pink hover:bg-brand-pinkSoft">
          <a href="#starter-pack">Grab the free starter pack</a>
        </Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink">Ways students learn with me</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {services.map((s) => (
              <div key={s.t} className="rounded-3xl p-7 bg-brand-warmWhite border border-border/60 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-2xl bg-brand-pink text-white grid place-items-center"><s.icon className="w-6 h-6" /></div>
                <h3 className="mt-5 text-xl font-semibold text-brand-ink">{s.t}</h3>
                <p className="text-brand-mute mt-2">{s.d}</p>
                <Link to="/contact" className="mt-4 inline-flex items-center gap-1 text-brand-pink font-medium underline-grow">Enquire <ArrowUpRight className="w-4 h-4" /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section id="starter-pack" className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-handwritten text-3xl text-brand-pink">free for students</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Free Sociology Revision Starter Pack</h2>
              <p className="text-brand-mute mt-4 text-lg max-w-lg">Everything you need to start revising like a top-band candidate — straight from an AQA examiner.</p>
              <ul className="mt-6 space-y-2.5 text-brand-ink">
                {[
                  { i: ClipboardList, t: "Examiner Essay Tips" },
                  { i: Target, t: "Revision Checklist" },
                  { i: FileText, t: "Command Words Guide" },
                  { i: BookOpenCheck, t: "Essay Planner" },
                  { i: Mail, t: "Weekly Revision Emails" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-2"><Icon className="w-5 h-5 text-brand-pink" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-7 shadow-medium">
              <LeadMagnetForm audience="student" magnet="revision-starter-pack" ctaLabel="Download Free Pack" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
