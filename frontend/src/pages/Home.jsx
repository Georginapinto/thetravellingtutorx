import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap, BookOpenCheck, ArrowUpRight, CheckCircle2, Star, Award, ClipboardCheck, PenLine,
  Target, Scale, Timer, Brain, Users, Sparkles, MonitorPlay, School, BadgePercent,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeader from "@/components/SectionHeader";
import TestimonialsSection from "@/components/TestimonialsSection";
import NewsletterSignup from "@/components/NewsletterSignup";
import { HOME, BRAND } from "@/constants/testIds";
import { COURSE, TIKTOK_CLIPS } from "@/constants/site";
import TikTokFeature from "@/components/TikTokFeature";

const struggles = [
  { icon: PenLine, title: "Essay writing", problem: "Knowing the content but not how to structure a top-band essay.", fix: "Clear, reusable essay frameworks." },
  { icon: Target, title: "Application", problem: "Losing marks for not applying knowledge to the exact question.", fix: "Practice using items and question wording." },
  { icon: Scale, title: "Evaluation", problem: "Describing theories instead of weighing them up.", fix: "Evaluation phrases examiners reward." },
  { icon: Timer, title: "Exam technique", problem: "Running out of time or misreading what the question demands.", fix: "Timing plans and mark-scheme know-how." },
  { icon: Brain, title: "Revision", problem: "Revising for hours without it sticking on the day.", fix: "Focused, active revision that lasts." },
];

const pathways = [
  {
    icon: GraduationCap,
    title: "Tuition",
    desc: "Examiner-led support that builds skills, confidence and grades.",
    to: "/tuition",
    cta: "Explore tuition",
    items: [["1:1 Tuition", "/tuition#one-to-one"], ["Group Tuition", "/tuition#group"], ["Recorded Group Sessions", "/tuition#recorded"]],
  },
  {
    icon: BookOpenCheck,
    title: "Resources",
    desc: "Examiner-written resources to revise smarter, any time.",
    to: "/resources",
    cta: "Shop resources",
    items: [["Grade Booster Packs", "/resources#grade-booster-packs"], ["Learning Tables", "/resources#learning-tables"], ["Grade Transformation Course", "/resources#grade-transformation-course"]],
  },
  {
    icon: Users,
    title: "For Teachers",
    desc: "Training and mentoring for Psychology teachers and tutors.",
    to: "/teachers",
    cta: "Explore teacher support",
    items: [["Tutor Training Programme", "/tutor-partner"], ["Mentoring", "/teachers#mentoring"]],
  },
];

export default function Home() {
  return (
    <>
      {/* 1. HERO */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-16 md:pb-24">
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border text-sm text-brand-navyDeep font-medium">
                <Award className="w-4 h-4 text-brand-maroon" /> AQA Expert Examiner
              </span>
              <h1 className="mt-6 font-bold tracking-tight uppercase">
                <span className="block text-[2.4rem] sm:text-6xl lg:text-[4rem] leading-[1.02] text-brand-navyDeep">Where Sociology and Psychology grades improve.</span>
                <span className="block mt-3 text-2xl sm:text-4xl lg:text-[2.6rem] leading-[1.1] text-brand-maroon">Gain the examiner's edge.</span>
              </h1>
              <p className="mt-6 text-xl md:text-2xl text-brand-navyDeep font-medium">AQA tuition led by an examiner.</p>
              <ul className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2 text-brand-ink">
                {["Build stronger essays", "Master exam technique", "Improve your grades"].map((t) => (
                  <li key={t} className="flex items-center gap-2 font-medium"><CheckCircle2 className="w-5 h-5 text-brand-maroon" /> {t}</li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button data-testid={HOME.heroExplore} asChild className="h-13 px-8 rounded-full bg-brand-maroon hover:bg-brand-maroonDeep text-white shadow-soft font-semibold text-base">
                  <Link to="/tuition">Explore Tuition <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
                </Button>
                <Button data-testid={HOME.heroBook} asChild variant="outline" className="h-13 px-8 rounded-full border-brand-navyDeep/30 text-brand-navyDeep hover:bg-brand-navySoft font-semibold text-base">
                  <Link to="/resources">Shop Resources</Link>
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 relative max-w-md mx-auto w-full">
              <div className="absolute -inset-4 bg-brand-maroonSoft rounded-[2.5rem] rotate-2" />
              <img
                src={BRAND.heroPhoto}
                alt="Georgina, AQA Psychology Examiner and founder of The Travelling Tutor X"
                className="relative w-full aspect-[4/5] object-cover object-top rounded-[2rem] shadow-medium"
              />
              <div className="absolute -bottom-5 -left-4 sm:-left-8 bg-white rounded-2xl shadow-medium px-4 py-3 border border-border/50">
                <div className="flex text-yellow-500">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}</div>
                <p className="text-sm font-semibold text-brand-ink mt-1">Some students: E → A</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER SIGN-UP — straight after the hero for visibility */}
      <section className="pb-16 md:pb-20">
        <div className="container-px max-w-7xl mx-auto">
          <NewsletterSignup source="homepage" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-brand-navyDeep text-white">
        <div className="container-px max-w-7xl mx-auto py-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[["AQA EXAMINER", "9 years"], ["DIRECTOR OF SIXTH FORM", "Head of Social Sciences"], ["1,000s", "of students taught"], ["GCSE & A-Level", "AQA specialist"]].map(([a, b]) => (
            <div key={a}>
              <p className="font-bold text-lg">{a}</p>
              <p className="text-white/65 text-sm">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 2. EXAMINER INSIGHT */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative max-w-md mx-auto w-full lg:order-2">
            <div className="absolute -inset-4 bg-brand-navySoft rounded-[2.5rem] -rotate-2" />
            <img src={BRAND.photo} alt="Georgina, founder of The Travelling Tutor X" className="relative w-full aspect-square object-cover object-top rounded-[2rem] shadow-medium" />
          </div>
          <div className="lg:order-1">
            <SectionHeader
              eyebrow="examiner insight"
              title="Learn from someone who marks the exams."
              lede="For 9 years I've marked real AQA Psychology scripts. I know exactly what examiners look for — and what costs students marks. That insight goes into every lesson and resource."
            />
            <ul className="mt-7 space-y-4">
              {[
                ["Know what earns marks", "Students learn the language and structure the mark scheme rewards."],
                ["Avoid common mistakes", "I show students the errors I see in scripts every exam season."],
                ["Build real self-belief", "Clear steps to success give students the confidence to perform on the day."],
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
            <Button asChild variant="outline" className="mt-8 rounded-full h-12 px-6 border-brand-maroon/40 text-brand-maroon hover:bg-brand-maroonSoft">
              <Link to="/about#experience">About my experience</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      <TestimonialsSection className="" />

      {/* TIKTOK */}
      <TikTokFeature
        clip={TIKTOK_CLIPS.realists}
        eyebrow="as seen on tiktok"
        title="Thousands of students already learn with me."
        lede="My bite-sized TikTok lessons break down the topics students find hardest. This one on left and right realist theories of crime has been watched over 125,000 times — and saved over 7,000 times for revision."
        reverse
        signupSource="home-tiktok"
      />

      {/* 4. WHY STUDENTS STRUGGLE */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="why students struggle"
            title="Knowing the content isn't enough."
            lede="Most students lose marks in the same five places. As an examiner, I see it in every script — and I teach students exactly how to fix it."
            center
          />
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {struggles.map((s) => (
              <div key={s.title} className="rounded-3xl bg-white border border-border/60 p-6 shadow-soft flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-brand-maroonSoft text-brand-maroon grid place-items-center"><s.icon className="w-6 h-6" /></div>
                <h3 className="mt-5 text-lg font-semibold text-brand-ink">{s.title}</h3>
                <p className="text-brand-mute text-sm mt-1.5 flex-1">{s.problem}</p>
                <p className="mt-4 pt-4 border-t border-border/60 text-sm font-medium text-brand-navyDeep flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-maroon shrink-0 mt-0.5" /> {s.fix}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXPLORE WHAT YOU NEED */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeader eyebrow="explore what you need" title="Find the right support for you." />
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {pathways.map((p) => (
              <div key={p.title} className="rounded-3xl bg-brand-cream border border-border/60 p-8 flex flex-col hover:shadow-hover transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-brand-maroon text-white grid place-items-center"><p.icon className="w-7 h-7" /></div>
                <h3 className="mt-6 text-2xl font-semibold text-brand-ink">{p.title}</h3>
                <p className="text-brand-mute mt-2">{p.desc}</p>
                <ul className="mt-5 space-y-1 flex-1">
                  {p.items.map(([label, to]) => (
                    <li key={label}>
                      <Link to={to} className="flex items-center justify-between py-2 border-b border-border/60 text-brand-ink hover:text-brand-maroon">
                        {label} <ArrowUpRight className="w-4 h-4 opacity-50" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-7 rounded-full h-12 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
                  <Link to={p.to}>{p.cta}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED COURSE */}
      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-brand-navyDeep text-white p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
            <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full bg-brand-maroon/30 blur-3xl" aria-hidden />
            <div className="relative">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Flagship course
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold mt-4 leading-tight">The {COURSE.title}</h2>
              <p className="text-white/80 mt-5 text-lg max-w-lg leading-relaxed">{COURSE.blurb}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full h-12 px-7 bg-white text-brand-maroon hover:bg-brand-cream font-semibold">
                  <a href={COURSE.url} target="_blank" rel="noreferrer">Enrol now <ArrowUpRight className="w-4 h-4 ml-1" /></a>
                </Button>
                <Button asChild variant="outline" className="rounded-full h-12 px-7 bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white">
                  <Link to="/resources#grade-transformation-course">Find out more</Link>
                </Button>
              </div>
            </div>
            <ul className="relative grid sm:grid-cols-2 gap-4">
              {[[MonitorPlay, COURSE.bullets[0]], [Star, COURSE.bullets[1]], [ClipboardCheck, COURSE.bullets[2]], [Award, COURSE.bullets[3]]].map(([Icon, t]) => (
                <li key={t} className="rounded-2xl bg-white/[0.07] border border-white/10 p-5">
                  <Icon className="w-6 h-6 text-brand-maroonPastel" />
                  <p className="font-medium mt-3">{t}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. SCHOOLS */}
      <section className="pb-20 md:pb-28">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-brand-maroon text-white p-8 md:p-12 grid md:grid-cols-[auto_1fr_auto] gap-6 md:gap-10 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/15 grid place-items-center"><School className="w-8 h-8" /></div>
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/75"><BadgePercent className="w-4 h-4" /> For schools</p>
              <h2 className="text-2xl md:text-3xl font-semibold mt-2">Exclusive discounts on resources for schools.</h2>
              <p className="text-white/80 mt-2 max-w-2xl">Give your Psychology department examiner-written resources at exclusive discounted school rates.</p>
            </div>
            <Button asChild className="rounded-full h-12 px-7 bg-white text-brand-maroon hover:bg-brand-cream font-semibold">
              <Link to="/schools">Enquire for your school <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="section-y bg-white">
        <div className="container-px max-w-4xl mx-auto text-center">
          <p className="font-handwritten text-xl md:text-2xl text-brand-maroon">your next steps are waiting</p>
          <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-2">Ready to gain the examiner's edge?</h2>
          <p className="text-brand-mute mt-5 text-lg max-w-2xl mx-auto">
            University, an apprenticeship, your dream career — the right grades open every door. Start with examiner-led tuition or
            pick up a resource today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button data-testid={HOME.ctaFinalBook} asChild className="h-13 px-8 rounded-full bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold text-base">
              <Link to="/tuition">Explore Tuition <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
            </Button>
            <Button data-testid={HOME.ctaFinalResources} asChild variant="outline" className="h-13 px-8 rounded-full border-brand-navyDeep/30 text-brand-navyDeep hover:bg-brand-navySoft font-semibold text-base">
              <Link to="/resources">Shop Resources</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
