import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Sparkles, MonitorPlay, GraduationCap, BookOpenCheck, Clock, Plane } from "lucide-react";

const courses = [
  { i: Sparkles, t: "Sociology Success Academy", d: "Our flagship group programme — small cohorts, examiner-led, results focused.", price: "Joining soon", tag: "Most popular" },
  { i: MonitorPlay, t: "A-Level Sociology Online Course", d: "Self-paced video lessons covering every AQA paper, with worked essay plans.", price: "From £149", tag: "Self-paced" },
  { i: GraduationCap, t: "Year 12 Sociology Glow-Up", d: "Turn D into A* over a summer. Skills-led, not content-padded.", price: "Summer cohort", tag: "Limited" },
  { i: BookOpenCheck, t: "Revision Workshops", d: "Half-term intensives focused on essay craft and exam technique.", price: "£45 per session", tag: "Live" },
];

export default function Courses() {
  return (
    <>
      <PageHero
        eyebrow="courses & programmes"
        title="Structured Sociology programmes that get results."
        lede="Group, self-paced and live — pick the route that fits how you learn. Stripe checkout coming soon; for now, register your interest and we'll personally onboard you."
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-maroon hover:bg-brand-maroonDeep text-white">
          <Link to="/contact">Register interest</Link>
        </Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {courses.map((c) => (
            <div key={c.t} className="rounded-[1.75rem] p-7 bg-brand-cream border border-border/60 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-2xl bg-brand-maroon text-white grid place-items-center"><c.i className="w-6 h-6" /></div>
                <span className="text-xs px-3 py-1 rounded-full bg-brand-navySoft text-brand-navyDeep font-medium">{c.tag}</span>
              </div>
              <h3 className="mt-5 text-xl font-semibold text-brand-ink">{c.t}</h3>
              <p className="text-brand-mute mt-2">{c.d}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="text-brand-maroon font-semibold">{c.price}</p>
                <Button asChild variant="outline" className="rounded-full border-brand-maroon/40 text-brand-maroon hover:bg-brand-maroonSoft h-10">
                  <Link to="/contact">Enquire</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="container-px max-w-3xl mx-auto mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-maroonSoft text-brand-maroon"><Clock className="w-4 h-4" /> Secure checkout via Stripe — launching soon</div>
          <p className="text-brand-mute mt-4">Want a head start? <Link to="/contact" className="text-brand-maroon underline-grow">Get in touch</Link> and we'll personally onboard you.</p>
        </div>
      </section>
    </>
  );
}
