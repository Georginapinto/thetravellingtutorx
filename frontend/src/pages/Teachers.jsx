import React from "react";
import PageHero from "@/components/PageHero";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpenCheck, Users, ClipboardCheck, Sparkles, FileText, Compass, ArrowUpRight } from "lucide-react";

const offerings = [
  { i: ClipboardCheck, t: "Examiner-led CPD", d: "Practical sessions on AQA mark schemes, essay craft, and Sociology pedagogy." },
  { i: FileText, t: "Classroom-ready resources", d: "Essay planners, retrieval quizzes, model answers, lesson activities." },
  { i: Users, t: "Tutor Partner Programme", d: "Train, get leads, build a tutoring side business with full brand support." },
  { i: Sparkles, t: "Bespoke department workshops", d: "Tailored support for your Sociology team — in-person or online." },
];

export default function Teachers() {
  return (
    <>
      <PageHero
        eyebrow="for teachers & tutors"
        title="Sharper teaching. Stronger results. A community that gets it."
        lede="Examiner-led CPD, classroom-ready resources, and a pathway into tutoring with full brand and leads support. Built by a Director of Sixth Form and AQA Sociology Examiner."
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <Link to="/tutor-partner">Explore Tutor Partner <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
        </Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {offerings.map((o) => (
            <div key={o.t} className="rounded-3xl p-7 bg-brand-warmWhite border border-border/60 shadow-soft hover:-translate-y-1 hover:shadow-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-sageSoft text-brand-sageDeep grid place-items-center"><o.i className="w-6 h-6" /></div>
              <h3 className="mt-5 text-xl font-semibold text-brand-ink">{o.t}</h3>
              <p className="text-brand-mute mt-2">{o.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-sageSoft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-handwritten text-3xl text-brand-pink">free for teachers</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Free Sociology Teaching Resources</h2>
              <p className="text-brand-ink/80 mt-4 text-lg max-w-md">A starter bundle of high-quality, examiner-tested teaching resources delivered straight to your inbox.</p>
              <ul className="mt-5 space-y-2 text-brand-ink">
                <li className="flex items-center gap-2"><BookOpenCheck className="w-5 h-5 text-brand-pink" /> Lesson activities</li>
                <li className="flex items-center gap-2"><FileText className="w-5 h-5 text-brand-pink" /> Essay planner</li>
                <li className="flex items-center gap-2"><Compass className="w-5 h-5 text-brand-pink" /> Retrieval quiz</li>
                <li className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-pink" /> CPD updates & tutor opportunities</li>
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
