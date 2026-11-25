import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BRAND } from "@/constants/testIds";
import { Award, BookOpenCheck, ClipboardCheck, Plane, Heart, Star, ArrowUpRight } from "lucide-react";

const credentials = [
  { icon: ClipboardCheck, t: "AQA Sociology Examiner", d: "9 years marking national AQA exams — I know exactly what gets the marks." },
  { icon: BookOpenCheck, t: "Head of Sociology", d: "Led Sociology departments, designing courses and teaching thousands of students." },
  { icon: Award, t: "Director of Sixth Form", d: "Senior leadership: guiding students through exams and on to university, apprenticeships and careers." },
  { icon: Star, t: "Sociology Specialist", d: "Deep expertise in AQA Sociology — Education, Families, Beliefs, Crime, Theory & Methods." },
  { icon: Plane, t: "Workshop Leader", d: "Intensive in-person and online workshops focused on essay craft and exam technique." },
  { icon: Heart, t: "Founder, The Travelling Tutor X", d: "A Sociology brand built around students, parents and teachers." },
];

const faqs = [
  {
    q: "Which courses and exam boards do you teach?",
    a: "I specialise in AQA Sociology at both GCSE and A-Level. As an AQA examiner, I teach exactly what the AQA mark scheme rewards.",
  },
  {
    q: "How do tuition sessions work?",
    a: "Sessions take place online, so I can work with students across the UK and internationally. You can choose 1:1 tuition, group tuition or recorded group sessions — see the Tuition page for the details of each.",
  },
  {
    q: "How do I book tuition?",
    a: "Send an enquiry using the Get Started form. Tell me about your goals and I'll reply personally within 24 hours to recommend the best option.",
  },
  {
    q: "What makes your tuition different?",
    a: "I've been an AQA Sociology examiner for 9 years and held leadership roles including Head of Sociology and Director of Sixth Form. I teach students how examiners think, so they know exactly how to turn their knowledge into marks — and I focus on building the self-belief they need to succeed.",
  },
  {
    q: "How do I receive resources after buying?",
    a: "Resources are paid for through secure Stripe checkout, and you get an instant download link. The Grade Transformation Course is hosted on Thinkific, so you can watch it on any device.",
  },
  {
    q: "Can schools buy resources?",
    a: "Yes — schools can access resources at exclusive discounted rates. Use the Schools enquiry form and I'll send a tailored quote.",
  },
  {
    q: "Do you support teachers and tutors?",
    a: "Yes. I run a 6-week Tutor Training Programme and offer 1:1 mentoring for Sociology teachers and tutors, as well as CPD and department workshops.",
  },
];

export default function About() {
  return (
    <>
      <div id="meet">
        <PageHero
          eyebrow="meet georgina"
          title="The teacher behind The Travelling Tutor X."
          lede="AQA Sociology Examiner, former Head of Sociology and Director of Sixth Form — helping students turn confusion into confidence, and confidence into top-band marks."
          image={BRAND.photo}
        >
          <Button asChild className="rounded-full h-12 px-6 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
            <Link to="/tuition">Explore tuition <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-maroon/40 text-brand-maroon hover:bg-brand-maroonSoft">
            <Link to="/contact">Get in touch</Link>
          </Button>
        </PageHero>
      </div>

      <section className="section-y bg-white">
        <div className="container-px max-w-4xl mx-auto text-lg leading-relaxed text-brand-ink/90 space-y-6">
          <p className="text-xl text-brand-mute">
            Hi, I'm Georgina — founder of The Travelling Tutor X. I've spent 9 years in education in leadership roles, including
            Head of Sociology and Director of Sixth Form, and taught thousands of students. Throughout those 9 years I've also
            marked exams for AQA.
          </p>
          <p>
            This site exists because I kept seeing students who knew their content but didn't know how to <em>show</em> it on
            paper. So I built the support I wished they all had. My approach is simple: examiner-led, structured and warm. I teach
            exactly what mark schemes reward — and I make sure students can do it under exam conditions, not just in their notes.
          </p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="aqa examiner & experience"
            title="9 years inside the exam system."
            lede="Marking real AQA scripts every year means I see exactly what separates a C from an A — and I bring that insight into every lesson and resource."
          />
          <div className="mt-8 grid grid-cols-3 max-w-xl gap-6">
            {[["9 yrs", "AQA examiner"], ["1,000s", "Students taught"], ["E → A", "Some students' grade jumps"]].map(([n, l]) => (
              <div key={l}>
                <p className="text-3xl md:text-4xl font-semibold text-brand-maroon">{n}</p>
                <p className="text-sm text-brand-mute mt-1">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((b) => (
              <div key={b.t} className="rounded-3xl p-6 bg-white border border-border/60 shadow-soft">
                <div className="w-12 h-12 rounded-2xl bg-brand-maroonSoft text-brand-maroon grid place-items-center"><b.icon className="w-6 h-6" /></div>
                <h3 className="mt-4 text-lg font-semibold text-brand-ink">{b.t}</h3>
                <p className="text-sm text-brand-mute mt-1">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection id="testimonials" />

      {/* FAQS */}
      <section id="faqs" className="section-y">
        <div className="container-px max-w-3xl mx-auto">
          <SectionHeader eyebrow="faqs" title="Your questions, answered." center />
          <Accordion type="single" collapsible className="mt-10 rounded-3xl bg-white border border-border/60 shadow-soft px-6 md:px-8">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} className={i === faqs.length - 1 ? "border-b-0" : ""}>
                <AccordionTrigger className="text-base md:text-lg font-semibold text-brand-ink hover:no-underline hover:text-brand-maroon py-5">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-mute text-base leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-center text-brand-mute mt-8">
            Still have a question? <Link to="/contact" className="text-brand-maroon font-medium underline-grow">Ask me directly</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
