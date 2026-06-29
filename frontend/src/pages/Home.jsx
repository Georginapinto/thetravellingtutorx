import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, Users, BookOpenCheck, ArrowUpRight, Compass, Sparkles, Heart,
  CheckCircle2, Star, Plane, MapPin, ClipboardCheck, Award, ShoppingBag, MonitorPlay, Facebook, ExternalLink,
  CalendarDays, Clock, Sun, Flame
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

      {/* YEAR 12 SUMMER BOOTCAMP */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-14 grid lg:grid-cols-5 gap-10 items-center relative overflow-hidden">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-pink text-xs font-semibold uppercase tracking-wide">
                <Sun className="w-3.5 h-3.5" /> Year 12 · Summer Cohort
              </span>
              <p className="font-handwritten text-3xl text-brand-pink mt-4">walk into year 13 ahead</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1 leading-tight">
                Year 12 Sociology Summer Bootcamp
              </h2>
              <p className="text-brand-ink/80 mt-4 text-lg max-w-lg leading-relaxed">
                Six focused weeks of live, examiner-led Sociology — designed to turn Year 12 confusion into Year 13 confidence. Build essay craft, master evaluation and start Year 13 ahead.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-2.5">
                {[
                  { i: CalendarDays, t: "Starts Tuesday 21st July" },
                  { i: Clock, t: "Tuesdays · 9–10am" },
                  { i: Flame, t: "6 weeks of live sessions" },
                  { i: MonitorPlay, t: "All sessions recorded" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-2 text-brand-ink"><span className="w-9 h-9 rounded-xl bg-white text-brand-pink grid place-items-center"><Icon className="w-4 h-4" /></span> {t}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  data-testid="home-bootcamp-cta"
                  className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white"
                >
                  <a href="https://buy.stripe.com/9B69ATdz3eobbEn1oVgbm0k" target="_blank" rel="noreferrer">
                    Secure my Year 12 place <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-pink/40 text-brand-pink hover:bg-brand-pinkPastel">
                  <Link to="/contact">Ask a question</Link>
                </Button>
              </div>
              <p className="text-xs text-brand-mute mt-4">Secure Stripe checkout · instant confirmation email · live + recorded.</p>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl p-7 shadow-medium border border-white">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-mute">Cohort dates</p>
              <p className="text-3xl font-semibold text-brand-ink mt-2 leading-tight">
                21 July → end of August
              </p>
              <p className="text-sm text-brand-mute mt-1">6 weekly Tuesday sessions, 9–10am UK time.</p>
              <div className="mt-6 space-y-2.5">
                {[
                  "Essay structure that examiners reward",
                  "Master Sociology evaluation",
                  "Theory & Methods made simple",
                  "Confidence going into Year 13",
                ].map((t) => (
                  <p key={t} className="flex items-center gap-2 text-sm text-brand-ink"><CheckCircle2 className="w-4 h-4 text-brand-sageDeep" /> {t}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FACEBOOK REVIEWS — live feed from @thetravellingtutorx */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1877F2] text-xs font-semibold uppercase tracking-wide">
                <Facebook className="w-3.5 h-3.5" /> Live · @thetravellingtutorx
              </span>
              <p className="font-handwritten text-3xl text-brand-pink mt-4">real words, real students</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1 leading-tight">
                Reviews from our Facebook community.
              </h2>
              <p className="text-brand-mute mt-4 text-lg max-w-lg">
                Honest recommendations from students, parents and teachers — pulled live from our Facebook page. Tap any post to read the full story or leave one of your own.
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
                <Link to="/testimonials" className="inline-flex items-center gap-2 px-5 h-12 rounded-full border border-brand-pink/40 text-brand-pink hover:bg-brand-pinkPastel transition-colors font-medium">
                  More stories <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-xs text-brand-mute mt-4 max-w-md">
                Facebook embeds may be blocked by some browser tracking-prevention settings. If the feed is hidden, the blue button above opens the page directly.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-3 shadow-medium overflow-hidden">
              <iframe
                title="The Travelling Tutor X Facebook feed"
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(BRAND.facebookUrl)}&tabs=timeline&width=500&height=640&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                width="100%"
                height="640"
                style={{ border: "none", overflow: "hidden", borderRadius: "1.25rem", width: "100%" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                loading="lazy"
              />
            </div>
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
