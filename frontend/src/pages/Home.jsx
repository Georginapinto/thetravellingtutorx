import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, Users, BookOpenCheck, ArrowUpRight, Sparkles, Heart,
  CheckCircle2, Star, Plane, MapPin, ClipboardCheck, Award, ShoppingBag, MonitorPlay, Facebook, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOME, BRAND } from "@/constants/testIds";
import { SignatureLogo } from "@/components/SignatureLogo";
import FacebookReviewsCarousel from "@/components/FacebookReviewsCarousel";
import NewsletterSignup from "@/components/NewsletterSignup";

const audiences = [
  {
    id: HOME.cardStudent,
    icon: GraduationCap,
    title: "I'm a Student",
    desc: "Learn exactly what examiners reward — and start believing you can hit the top grades.",
    color: "bg-brand-pinkSoft",
    iconBg: "bg-brand-pink text-white",
    href: "/students",
    links: ["One-to-One Tutoring", "Sociology Grade Booster Bootcamps", "Online Course", "Revision Workshops", "Resources"],
  },
  {
    id: HOME.cardParent,
    icon: Users,
    title: "I'm a Parent",
    desc: "Trusted, experienced support for your child — with honest progress updates for you.",
    color: "bg-brand-sageSoft",
    iconBg: "bg-brand-sageDeep text-white",
    href: "/parents",
    links: ["GCSE Support", "A-Level Support", "Results", "Get in Touch"],
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
  { icon: ClipboardCheck, title: "8 Years as an AQA Examiner", desc: "I've marked thousands of real exam scripts. I know precisely what separates a C from an A — and I teach students exactly that." },
  { icon: Award, title: "Director of Sixth Form", desc: "Senior school leadership means I understand the pressure students face, and how to guide them through it to results." },
  { icon: Heart, title: "Confidence That Lasts", desc: "Self-belief comes first. Students who arrive saying “I'm just not good at essays” leave knowing they can write top-band answers." },
  { icon: Star, title: "Proven Grade Jumps", desc: "The reviews speak for themselves: students moving from E grades to A grades, and from C to A*." },
];

const services = [
  { icon: GraduationCap, title: "One-to-One Tutoring", desc: "Bespoke 1:1 GCSE & A-Level Sociology tuition tailored to you.", href: "/students" },
  { icon: Sparkles, title: "Sociology Grade Booster Bootcamps", desc: "Our flagship group programme — structured, examiner-led, results-driven.", href: "/courses" },
  { icon: MonitorPlay, title: "Online Course", desc: "Self-paced Sociology mastery. Watch, revise, repeat — any time.", href: "/courses" },
  { icon: BookOpenCheck, title: "Revision Workshops", desc: "Intensive sessions that turn knowledge into top-band marks.", href: "/courses" },
  { icon: ShoppingBag, title: "Resource Shop", desc: "Examiner-written essay plans, model answers and quizzes — trusted by 6,000+ students.", href: "/resource-shop" },
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
                Trusted by 6,000+ students and their parents across the UK
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[64px] leading-[1.05] font-semibold text-brand-ink tracking-tight">
                From E grades to <span className="relative">A grades
                <svg viewBox="0 0 200 14" className="absolute -bottom-2 left-0 w-full h-3" preserveAspectRatio="none"><path d="M2 8 C 50 2, 150 14, 198 6" stroke="#E11D67" strokeWidth="4" fill="none" strokeLinecap="round"/></svg>
                </span> — with an AQA Sociology Examiner on your side
              </h1>
              <p className="mt-6 text-lg text-brand-mute max-w-xl leading-relaxed">
                I've spent 8 years marking AQA Sociology exams and leading a Sixth Form as Director. I know exactly what examiners reward — and I teach students how to deliver it. The result? Students who stop doubting themselves, start believing they can succeed, and walk into the exam hall ready to achieve their best grades.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button data-testid={HOME.heroExplore} asChild className="h-13 px-7 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white shadow-soft">
                  <Link to="/contact">Book Your Tutoring <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <Button data-testid={HOME.heroBook} asChild variant="outline" className="h-13 px-7 rounded-full border-brand-pink/40 text-brand-pink hover:bg-brand-pinkSoft">
                  <Link to="/free-resources">Try a Free Resource</Link>
                </Button>
              </div>

              <div className="mt-10 grid grid-cols-3 max-w-md gap-6">
                <div><p className="text-3xl font-semibold text-brand-ink">E → A</p><p className="text-sm text-brand-mute">Grade jumps in reviews</p></div>
                <div><p className="text-3xl font-semibold text-brand-ink">8 yrs</p><p className="text-sm text-brand-mute">AQA examiner</p></div>
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

      {/* FACEBOOK REVIEWS — carousel of embedded recommendations */}
      <section className="pt-16 md:pt-24 pb-10 bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1877F2] text-xs font-semibold uppercase tracking-wide">
                <Facebook className="w-3.5 h-3.5" /> Facebook · @thetravellingtutorx
              </span>
              <p className="font-handwritten text-3xl text-brand-pink mt-4">don't just take my word for it</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1 leading-tight">
                “From an E to an A.” Hear it from parents and students.
              </h2>
              <p className="text-brand-mute mt-4 text-lg max-w-lg">
                Real, unedited recommendations from families I've worked with — students who turned their grades around and parents who watched their child's confidence grow. Tap any review to read the full story.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={BRAND.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="home-facebook-link"
                  className="inline-flex items-center gap-2 px-5 h-12 rounded-full bg-[#1877F2] hover:bg-[#155ec5] text-white font-medium transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  See all reviews on Facebook
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <p className="text-xs text-brand-mute mt-4 max-w-md">
                Facebook embeds may be blocked by some browser tracking-prevention settings. If the reviews are hidden, the blue button above opens the page directly.
              </p>
            </div>

            <FacebookReviewsCarousel />
          </div>
        </div>
      </section>

      {/* NEWSLETTER — high on the page for visibility */}
      <section className="pb-16 md:pb-24 bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <NewsletterSignup source="homepage" />
        </div>
      </section>

      {/* AUDIENCE CARDS */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <p className="font-handwritten text-3xl text-brand-pink">where to begin?</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Tell me who you are.</h2>
            <p className="text-brand-mute mt-4 text-lg">Pick the path that fits you. Every one leads to support from someone who actually marks the exams.</p>
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
              <p className="text-sm text-brand-mute mt-2">8 years an AQA examiner & Director of Sixth Form. I believe in every student I teach.</p>
            </div>
          </div>

          <div>
            <p className="font-handwritten text-3xl text-brand-pink">meet the teacher</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Meet the Teacher Behind The Travelling Tutor X</h2>
            <p className="text-brand-mute mt-5 text-lg leading-relaxed">
              I'm a Sociology teacher, a Director of Sixth Form, and I've spent 8 years as an AQA Sociology Examiner marking real exam papers. That means I don't teach Sociology in theory — I teach it in exactly the language examiners look for when they award the top marks.
            </p>
            <p className="text-brand-mute mt-4 leading-relaxed">
              But grades are only half the story. So many students come to me convinced they're “just not clever enough”. My job is to prove them wrong — building the self-belief and exam technique that turns E grades into A grades. Parents tell me the change in their child's confidence is as remarkable as the results.
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
            <p className="font-handwritten text-3xl text-brand-pink">why parents & students trust me</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">Why families choose The Travelling Tutor X</h2>
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

      {/* FINAL CTA */}
      <section className="section-y">
        <div className="container-px max-w-5xl mx-auto text-center">
          <p className="font-handwritten text-3xl text-brand-pink">your best grade starts here</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-2">Ready to see what you can really achieve?</h2>
          <p className="text-brand-mute mt-5 text-lg max-w-2xl mx-auto">Send a quick message to talk through goals and book tutoring, or download a free resource and see the examiner difference for yourself.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button data-testid={HOME.ctaFinalBook} asChild className="h-13 px-7 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white">
              <Link to="/contact">Book Your Tutoring</Link>
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
