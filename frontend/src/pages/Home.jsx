import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, Users, BookOpenCheck, ArrowUpRight, Compass, Sparkles, Heart,
  CheckCircle2, Star, Plane, MapPin, ClipboardCheck, Award, ShoppingBag, MonitorPlay
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME, BRAND } from "@/constants/testIds";
import { SignatureLogo } from "@/components/SignatureLogo";

const audiences = [
  {
    id: HOME.cardStudent,
    icon: GraduationCap,
    title: "I'm a Student",
    desc: "Top grades, exam confidence, examiner-led teaching that actually works.",
    color: "bg-brand-pinkSoft",
    iconBg: "bg-brand-pink text-white",
    href: "/students",
    links: ["One-to-One Tutoring", "Sociology Grade Booster Bootcamps", "Online Course", "Revision Workshops", "Resources"],
  },
  {
    id: HOME.cardParent,
    icon: Users,
    title: "I'm a Parent",
    desc: "Calm, structured support for your child — and clear updates for you.",
    color: "bg-brand-sageSoft",
    iconBg: "bg-brand-sageDeep text-white",
    href: "/parents",
    links: ["GCSE Support", "A-Level Support", "Results", "Testimonials", "Get in Touch"],
  },
  {
    id: HOME.cardTeacher,
    icon: BookOpenCheck,
    title: "I'm a Teacher / Tutor",
    desc: "Examiner-led CPD, classroom-ready resources, and a tutor partner pathway.",
    color: "bg-brand-pinkPastel",
    iconBg: "bg-brand-pink text-white",
    href: "/teachers",
    links: ["Tutor Partner Programme", "CPD", "Teaching Resources", "Workshops"],
  },
];

const pillars = [
  { icon: ClipboardCheck, title: "Examiner Insight", desc: "Created by an experienced AQA Sociology Examiner. You learn exactly what mark-schemes reward." },
  { icon: Award, title: "Expert Teaching", desc: "Years of classroom leadership as a Director of Sixth Form — not just theory, real results." },
  { icon: Compass, title: "Flexible Learning", desc: "Choose tutoring, self-paced courses, workshops, or membership. Learn the way you learn best." },
  { icon: Heart, title: "Beyond the Classroom", desc: "Join a warm Sociology learning community that keeps growing every week." },
];

const services = [
  { icon: GraduationCap, title: "One-to-One Tutoring", desc: "Bespoke 1:1 GCSE & A-Level Sociology tuition tailored to you.", href: "/students" },
  { icon: Sparkles, title: "Sociology Grade Booster Bootcamps", desc: "Our flagship group programme — structured, examiner-led, results-driven.", href: "/courses" },
  { icon: MonitorPlay, title: "Online Course", desc: "Self-paced Sociology mastery. Watch, revise, repeat — any time.", href: "/courses" },
  { icon: BookOpenCheck, title: "Revision Workshops", desc: "Intensive sessions that turn knowledge into top-band marks.", href: "/courses" },
  { icon: ShoppingBag, title: "Resource Shop", desc: "Essay plans, model answers, retrieval quizzes — used by 6,000+ students.", href: "/resource-shop" },
  { icon: Users, title: "Tutor Partner Programme", desc: "Build a flexible, rewarding tutoring business with leads, training & community.", href: "/tutor-partner" },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16">
        <div className="blob bg-brand-pinkSoft w-[520px] h-[520px] -top-40 -left-40" />
        <div className="blob bg-brand-sageSoft w-[420px] h-[420px] top-20 -right-32 opacity-60" />

        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand-pinkPastel text-sm text-brand-pink font-medium shadow-soft">
                <Plane className="w-4 h-4 -rotate-12" />
                Trusted by 6,000+ Sociology learners across the UK
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] font-semibold text-brand-ink tracking-tight">
                Expert <span className="relative">Sociology
                <svg viewBox="0 0 200 14" className="absolute -bottom-2 left-0 w-full h-3" preserveAspectRatio="none"><path d="M2 8 C 50 2, 150 14, 198 6" stroke="#E11D67" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
                </span> Support for Students, Parents and Teachers
              </h1>
              <p className="mt-6 text-lg text-brand-mute max-w-xl leading-relaxed">
                Whether you're aiming for top grades in GCSE or A-Level Sociology, looking for expert one-to-one tuition, or seeking high-quality support as a teacher — The Travelling Tutor X provides practical, examiner-led education that builds confidence and delivers results.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button data-testid={HOME.heroExplore} asChild className="h-13 px-7 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white shadow-soft">
                  <Link to="/students">Explore How I Can Help <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <Button data-testid={HOME.heroBook} asChild variant="outline" className="h-13 px-7 rounded-full border-brand-pink/40 text-brand-pink hover:bg-brand-pinkSoft">
                  <Link to="/contact">Get in Touch</Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 max-w-md gap-6">
                <div><p className="text-3xl font-semibold text-brand-ink">C → A*</p><p className="text-sm text-brand-mute">Some have achieved</p></div>
                <div><p className="text-3xl font-semibold text-brand-ink">D → B</p><p className="text-sm text-brand-mute">Common turnaround</p></div>
                <div><p className="text-3xl font-semibold text-brand-ink">6,000+</p><p className="text-sm text-brand-mute">Students supported</p></div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-6 bg-brand-pinkSoft rounded-[2.5rem] rotate-3" />
              <div className="absolute -inset-6 bg-brand-sageSoft rounded-[2.5rem] -rotate-3 opacity-60" />
              <div className="relative bg-white rounded-[2.5rem] p-6 shadow-medium border border-border/50">
                <img src={BRAND.avatar} alt="The Travelling Tutor X — Georgina" className="w-full aspect-square object-contain rounded-[2rem] bg-brand-pinkSoft" />
                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-soft px-4 py-3 flex items-center gap-2 border border-border/50">
                  <Award className="w-5 h-5 text-brand-pink" />
                  <p className="text-sm font-medium text-brand-ink">AQA Sociology Examiner</p>
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-soft px-4 py-3 flex items-center gap-2 border border-border/50">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <p className="text-sm font-medium text-brand-ink">5.0 · 200+ reviews</p>
                </div>
              </div>
              <SignatureLogo className="mt-6 justify-self-end" size="md" />
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE CARDS */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="font-handwritten text-3xl text-brand-pink">where to begin?</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Tell me who you are.</h2>
            <p className="text-brand-mute mt-4 text-lg">A few quick paths — pick the one that fits. Every door leads to expert, examiner-led support.</p>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {audiences.map((a) => (
              <Link key={a.title} to={a.href} data-testid={a.id}
                className={`group relative rounded-[2rem] p-8 ${a.color} border border-white/60 shadow-soft hover:-translate-y-1.5 hover:shadow-hover transition-all duration-300`}>
                <div className={`w-14 h-14 rounded-2xl ${a.iconBg} grid place-items-center shadow-soft`}>
                  <a.icon className="w-7 h-7" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-brand-ink">{a.title}</h3>
                <p className="text-brand-mute mt-2">{a.desc}</p>
                <ul className="mt-5 space-y-1.5">
                  {a.links.map((l) => (
                    <li key={l} className="flex items-center gap-2 text-sm text-brand-ink/85"><CheckCircle2 className="w-4 h-4 text-brand-sageDeep" /> {l}</li>
                  ))}
                </ul>
                <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white grid place-items-center text-brand-pink group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT FOUNDER */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-sageSoft rounded-[2.5rem] -rotate-2" />
            <img src={BRAND.avatar} alt="Georgina, founder of The Travelling Tutor X" className="relative w-full bg-brand-pinkSoft rounded-[2.5rem] aspect-square object-contain shadow-medium" />
            <div className="absolute -bottom-6 right-6 bg-white rounded-3xl shadow-medium p-5 max-w-[260px] border border-border/50">
              <p className="font-handwritten text-2xl text-brand-pink leading-none">Hi, I'm Georgina —</p>
              <p className="text-sm text-brand-mute mt-2">Experienced teacher, AQA examiner & Director of Sixth Form. I built this for you.</p>
            </div>
          </div>

          <div>
            <p className="font-handwritten text-3xl text-brand-pink">meet the teacher</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Meet the Teacher Behind The Travelling Tutor X</h2>
            <p className="text-brand-mute mt-5 text-lg leading-relaxed">
              I'm an experienced Sociology teacher, AQA Sociology Examiner and Director of Sixth Form. Over a decade in the classroom and marking national exams means I don't teach Sociology in theory — I teach it in exactly the language examiners want to see.
            </p>
            <p className="text-brand-mute mt-4 leading-relaxed">
              My students aren't just learning content. They're learning how to think like top-band candidates: how to plan, evaluate, structure and write essays that consistently land in the A/A* range.
            </p>
            <ul className="grid sm:grid-cols-2 gap-2.5 mt-6">
              {["AQA Sociology Examiner","Director of Sixth Form","Course Creator","Workshop Leader","Sociology Specialist","Founder, The Travelling Tutor X"].map((t)=>(
                <li key={t} className="flex items-center gap-2 text-brand-ink"><MapPin className="w-4 h-4 text-brand-pink" /> {t}</li>
              ))}
            </ul>
            <Button asChild className="mt-8 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white h-12 px-6">
              <Link to="/about">Read my full story</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-handwritten text-3xl text-brand-pink">why parents & students choose us</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Why The Travelling Tutor X</h2>
          </div>
          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-[1.75rem] p-7 bg-white border border-border/50 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-brand-pinkSoft grid place-items-center text-brand-pink">
                  <p.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-brand-ink">{p.title}</h3>
                <p className="text-brand-mute mt-2 leading-relaxed text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-y bg-brand-warmWhite">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="font-handwritten text-3xl text-brand-pink">ways to learn</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Services built around results</h2>
            </div>
            <Link to="/courses" className="hidden md:inline-flex items-center gap-1 text-brand-pink font-medium underline-grow">View all <ArrowUpRight className="w-4 h-4" /></Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.title} to={s.href} className="group rounded-[1.75rem] bg-white p-7 border border-border/50 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-brand-sageSoft grid place-items-center text-brand-sageDeep">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-brand-ink">{s.title}</h3>
                <p className="text-brand-mute mt-2 text-sm leading-relaxed">{s.desc}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-brand-pink text-sm font-medium">
                  Learn more <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TUTOR PARTNER HIGHLIGHT */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-sageSoft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center overflow-hidden relative">
            <div>
              <p className="font-handwritten text-3xl text-brand-pink">teach. inspire. earn.</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Become a Sociology Tutor Partner</h2>
              <p className="text-brand-ink/80 mt-5 text-lg leading-relaxed max-w-lg">
                Join a growing Sociology education brand. Receive training, mentoring, resources, marketing and student leads while building a flexible and rewarding career on your terms.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 mt-6">
                {["Flexible income","Remote working","Marketing support","Warm student leads","Mentoring & training","Meaningful work"].map((t)=>(
                  <li key={t} className="flex items-center gap-2 text-brand-ink"><CheckCircle2 className="w-4 h-4 text-brand-pink" /> {t}</li>
                ))}
              </ul>
              <Button asChild className="mt-7 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white h-12 px-7">
                <Link to="/tutor-partner">Explore the Programme <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl p-6 bg-white border border-white shadow-soft">
                  <p className="font-handwritten text-2xl text-brand-pink">teach</p>
                  <p className="font-semibold text-brand-ink mt-1">1-1 & group Sociology sessions</p>
                  <p className="text-sm text-brand-mute mt-2">£40-80/hour 1-1 · £100-200/hour group</p>
                </div>
                <div className="rounded-3xl p-6 bg-white border border-white shadow-soft mt-8">
                  <p className="font-handwritten text-2xl text-brand-pink">create</p>
                  <p className="font-semibold text-brand-ink mt-1">Resources, TikToks & essay plans</p>
                  <p className="text-sm text-brand-mute mt-2">Build a name and a real portfolio</p>
                </div>
                <div className="rounded-3xl p-6 bg-white border border-white shadow-soft -mt-4">
                  <p className="font-handwritten text-2xl text-brand-pink">grow</p>
                  <p className="font-semibold text-brand-ink mt-1">Training, mentoring & community</p>
                  <p className="text-sm text-brand-mute mt-2">We invest in you from day one</p>
                </div>
                <div className="rounded-3xl p-6 bg-white border border-white shadow-soft mt-4">
                  <p className="font-handwritten text-2xl text-brand-pink">earn</p>
                  <p className="font-semibold text-brand-ink mt-1">Flexible, rewarding income</p>
                  <p className="text-sm text-brand-mute mt-2">On your terms · remote-first</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL TEASER */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Amelia R.", role: "A-Level Student", quote: "Went from a predicted C to an A*. Georgina actually teaches you how examiners think." },
              { name: "Sarah M.", role: "Parent", quote: "The difference with The Travelling Tutor X was night and day — structured, calm, results-focused." },
              { name: "Priya K.", role: "Head of Sociology", quote: "The CPD session reset our whole department. Practical, examiner-led, immediately usable." },
            ].map((t) => (
              <div key={t.name} className="rounded-[1.75rem] p-7 bg-brand-pinkSoft border border-white shadow-soft">
                <div className="flex gap-0.5">{[...Array(5)].map((_,i)=><Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}</div>
                <p className="mt-4 text-brand-ink text-lg leading-relaxed">"{t.quote}"</p>
                <p className="mt-5 font-semibold text-brand-ink">{t.name}</p>
                <p className="text-sm text-brand-mute">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/testimonials" className="text-brand-pink font-medium underline-grow inline-flex items-center gap-1">Read more stories <ArrowUpRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-y">
        <div className="container-px max-w-5xl mx-auto text-center">
          <p className="font-handwritten text-3xl text-brand-pink">wherever you are in your journey</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-2">There's a place for you here.</h2>
          <p className="text-brand-mute mt-5 text-lg max-w-2xl mx-auto">Send a quick message or grab a free resource to see exactly what examiner-led Sociology teaching looks like.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button data-testid={HOME.ctaFinalBook} asChild className="h-13 px-7 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button data-testid={HOME.ctaFinalResources} asChild variant="outline" className="h-13 px-7 rounded-full border-brand-pink/40 text-brand-pink hover:bg-brand-pinkSoft">
              <Link to="/free-resources">Explore Free Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
