import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/constants/testIds";
import { Award, BookOpenCheck, ClipboardCheck, Plane, Heart, Star } from "lucide-react";
import { SignatureLogo } from "@/components/SignatureLogo";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="meet georgina"
        title="The teacher behind The Travelling Tutor."
        lede="An experienced Sociology teacher, AQA Sociology Examiner and Director of Sixth Form, helping students across the UK turn confusion into confidence — and confidence into top-band marks."
        image={BRAND.avatar}
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <Link to="/contact">Get in touch</Link>
        </Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-px max-w-5xl mx-auto">
          <div className="prose prose-lg max-w-none text-brand-ink/90 leading-relaxed">
            <p className="text-xl text-brand-mute">Hi, I'm Georgina — founder of The Travelling Tutor. I've spent over a decade teaching Sociology, leading Sixth Form, and marking exams for AQA. This site exists because I kept seeing students who knew their content but didn't know how to <em>show</em> it on paper. So I built the support I wished they all had.</p>
            <p className="mt-6">My approach is simple: examiner-led, calm, structured and warm. I teach you exactly what mark schemes reward — and I make sure you can do it under exam conditions, not just in your notes.</p>
          </div>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: ClipboardCheck, t: "AQA Sociology Examiner", d: "Marking national exams for AQA — I know exactly what gets the marks." },
              { icon: Award, t: "Director of Sixth Form", d: "Leading academic teams, mentoring teachers and shaping student outcomes at the top end." },
              { icon: BookOpenCheck, t: "Course Creator", d: "Designed structured Sociology programmes used by 1,000s of students across the UK." },
              { icon: Plane, t: "Workshop Leader", d: "Intensive in-person and online workshops focused on essay craft and exam technique." },
              { icon: Heart, t: "Founder, The Travelling Tutor", d: "Building a UK Sociology brand that puts students, parents and teachers at the centre." },
              { icon: Star, t: "Sociology Specialist", d: "Deep expertise in AQA Sociology — Education, Families, Beliefs, Crime, Theory & Methods." },
            ].map((b) => (
              <div key={b.t} className="rounded-3xl p-6 bg-brand-pinkSoft border border-white">
                <b.icon className="w-7 h-7 text-brand-pink" />
                <h4 className="mt-4 font-semibold text-brand-ink">{b.t}</h4>
                <p className="text-sm text-brand-mute mt-1">{b.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <SignatureLogo size="lg" />
            <p className="text-brand-mute mt-3 max-w-xl mx-auto">Wherever you are in your Sociology journey — student, parent or teacher — I'd love to help you take the next step.</p>
          </div>
        </div>
      </section>
    </>
  );
}
