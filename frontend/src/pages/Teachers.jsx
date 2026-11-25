import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { Button } from "@/components/ui/button";
import {
  BookOpenCheck, Users, ClipboardCheck, Sparkles, FileText, Compass, ArrowUpRight, CalendarDays,
  Video, Award, ShieldCheck, CheckCircle2, School,
} from "lucide-react";

const enquire = (subject) => `/contact?role=teacher&subject=${encodeURIComponent(subject)}`;

const more = [
  { i: ClipboardCheck, t: "Examiner-led CPD", d: "Practical sessions on AQA mark schemes, essay craft and Sociology pedagogy." },
  { i: Sparkles, t: "Department workshops", d: "Tailored support for your Sociology team — in person or online." },
  { i: FileText, t: "Classroom-ready resources", d: "Essay planners, model answers and revision materials for your students." },
];

export default function Teachers() {
  return (
    <>
      <PageHero
        eyebrow="for teachers"
        title="Sharper teaching. Stronger results."
        lede="Training and mentoring for Sociology teachers and tutors from an AQA examiner of 9 years, former Head of Sociology and Director of Sixth Form."
        accent="navy"
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
          <Link to="/tutor-partner">Tutor Training Programme <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-maroon/40 text-brand-maroon hover:bg-brand-maroonSoft">
          <a href="#mentoring">Mentoring</a>
        </Button>
      </PageHero>

      {/* TUTOR TRAINING */}
      <section id="tutor-training" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-brand-maroonSoft p-8 md:p-14 grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-maroon text-xs font-semibold uppercase tracking-wide">
                <Users className="w-3.5 h-3.5" /> Tutor Training Programme
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-4 leading-tight">
                Become a confident, examiner-aware Sociology tutor in 6 weeks.
              </h2>
              <p className="text-brand-ink/80 mt-4 text-lg max-w-lg leading-relaxed">
                One live session per week, every session recorded, a private Google Classroom — and the brand-name partnership behind you.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  { i: CalendarDays, t: "6-week live cohort" },
                  { i: Video, t: "1 live session per week · all recorded" },
                  { i: BookOpenCheck, t: "Private Google Classroom + full tutor toolkit" },
                  { i: Award, t: "Led personally by Georgina — AQA examiner" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-2 text-brand-ink"><Icon className="w-5 h-5 text-brand-maroon" /> {t}</li>
                ))}
              </ul>
              <Button asChild className="mt-8 rounded-full h-12 px-7 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
                <Link to="/tutor-partner">See the full programme <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="lg:col-span-2 bg-white rounded-3xl p-7 shadow-medium">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-mute">Programme fee</p>
              <p className="text-5xl font-semibold text-brand-ink mt-3">£497</p>
              <p className="text-sm text-brand-mute mt-1">Secure your place with a £248.50 deposit</p>
              <div className="mt-6 space-y-3 text-sm text-brand-ink">
                <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-navyDeep" /> Secure Stripe checkout</p>
                <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-navyDeep" /> No hidden fees</p>
                <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-navyDeep" /> Welcome pack within 24h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENTORING */}
      <section id="mentoring" className="section-y">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="mentoring"
              title="1:1 mentoring from an AQA examiner."
              lede="Personal guidance for Sociology teachers and tutors who want to grow in confidence, sharpen their marking and get better results for their students."
            />
            <Button asChild className="mt-8 rounded-full h-12 px-7 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
              <Link to={enquire("Mentoring")}>Enquire about mentoring <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <ul className="rounded-[2rem] bg-white border border-border/60 shadow-soft p-8 md:p-10 space-y-5">
            {[
              ["Marking with confidence", "Understand exactly how AQA examiners apply the mark scheme."],
              ["Feedback that moves grades", "Practical strategies to help students improve essay by essay."],
              ["Planning & teaching", "Support with curriculum planning, resources and exam preparation."],
              ["Leadership & career growth", "Guidance from a former Head of Sociology and Director of Sixth Form."],
            ].map(([t, d]) => (
              <li key={t} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-brand-ink">{t}</p>
                  <p className="text-brand-mute text-sm mt-0.5">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MORE SUPPORT */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeader eyebrow="more support" title="Support for your whole department." />
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {more.map((o) => (
              <div key={o.t} className="rounded-3xl p-7 bg-brand-cream border border-border/60">
                <div className="w-12 h-12 rounded-2xl bg-brand-navySoft text-brand-navyDeep grid place-items-center"><o.i className="w-6 h-6" /></div>
                <h3 className="mt-5 text-xl font-semibold text-brand-ink">{o.t}</h3>
                <p className="text-brand-mute mt-2">{o.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl bg-brand-navyDeep text-white p-7 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-center gap-4">
              <School className="w-9 h-9 shrink-0" />
              <p className="text-lg">Schools can buy resources at <span className="font-semibold">exclusive discounted rates</span>.</p>
            </div>
            <Button asChild className="rounded-full h-11 px-6 bg-white text-brand-maroon hover:bg-brand-cream font-semibold shrink-0">
              <Link to="/schools">Enquire for your school</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FREE TEACHER RESOURCES */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-brand-navySoft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-handwritten text-xl md:text-2xl text-brand-maroon">free for teachers</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1">Free Sociology Teaching Resources</h2>
              <p className="text-brand-ink/80 mt-4 text-lg max-w-md">A starter bundle of examiner-tested teaching resources delivered straight to your inbox.</p>
              <ul className="mt-5 space-y-2 text-brand-ink">
                <li className="flex items-center gap-2"><BookOpenCheck className="w-5 h-5 text-brand-maroon" /> Lesson activities</li>
                <li className="flex items-center gap-2"><FileText className="w-5 h-5 text-brand-maroon" /> Essay planner</li>
                <li className="flex items-center gap-2"><Compass className="w-5 h-5 text-brand-maroon" /> Retrieval quiz</li>
                <li className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-maroon" /> CPD updates & tutor opportunities</li>
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-7 shadow-medium">
              <LeadMagnetForm audience="teacher" magnet="teacher-resources" ctaLabel="Join the Teacher Community" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
