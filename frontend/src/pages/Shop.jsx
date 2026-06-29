import React from "react";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sparkles, FileText, ClipboardCheck, Star, BookOpenCheck, GraduationCap,
  Globe, BarChart3, Building2, MonitorPlay, ArrowUpRight, ShieldCheck, Award,
  Users, CalendarDays, Video,
} from "lucide-react";

// Each pack uses the same uplifting "what's inside" line you confirmed:
// A* model answer, examiner insights, one-page reference bank, and snapshot essay plan.
const BOOSTER_INCLUDES = [
  { i: Star, t: "A* model answer" },
  { i: Award, t: "Examiner insights" },
  { i: FileText, t: "One-page reference bank" },
  { i: ClipboardCheck, t: "Snapshot essay plan" },
];

const products = [
  {
    id: "globalisation",
    title: "Globalisation",
    paper: "AQA A-Level Sociology · Beliefs / Global Development",
    blurb:
      "Pin down globalisation in Sociology — top sociologists, the key debates, and an A* model answer that examiners actually reward.",
    icon: Globe,
    accent: "bg-brand-pinkSoft",
    price: "£9.99",
    stripe: "https://buy.stripe.com/4gM14n9iN6VJ0ZJ7Njgbm02",
    cta: "Get the Globalisation pack",
  },
  {
    id: "marketisation",
    title: "Marketisation",
    paper: "AQA A-Level Sociology · Education",
    blurb:
      "Marketisation made crystal clear — parentocracy, league tables, formula funding and the policies examiners love. With a worked A* response.",
    icon: BarChart3,
    accent: "bg-brand-sageSoft",
    price: "£9.99",
    stripe: "https://buy.stripe.com/9B600jbqV4NBcIr7Njgbm05",
    cta: "Get the Marketisation pack",
  },
  {
    id: "privatisation",
    title: "Privatisation",
    paper: "AQA A-Level Sociology · Education",
    blurb:
      "Master privatisation of education — endogenous vs exogenous, key thinkers, and an examiner-led essay plan that picks up the top-band marks.",
    icon: Building2,
    accent: "bg-brand-pinkPastel",
    price: "£9.99",
    stripe: "https://buy.stripe.com/aFa9ATfHb2Ft8sbc3zgbm01",
    cta: "Get the Privatisation pack",
  },
];

const course = {
  title: "Sociology Grade Booster Course",
  subtitle: "On-demand · Self-paced · Hosted on Thinkific",
  blurb:
    "The full Grade Booster experience — every topic, every essay framework, examiner walkthroughs and worked A* answers. Watch on any device, any time.",
  url: "https://thetravellingtutor.thinkific.com/courses/take/examinersecrets",
  bullets: [
    "Examiner-led video lessons",
    "A* model answers across every paper",
    "Essay planning frameworks you can re-use",
    "Lifetime access · learn at your pace",
  ],
};

export default function Shop() {
  return (
    <>
      <PageHero
        eyebrow="the shop"
        title="Examiner-led resources, ready to use today."
        lede="Each Grade Booster Pack is built by an AQA Sociology examiner — A* model answer, examiner insights, a one-page reference bank and a snapshot essay plan. Instant download after checkout via secure Stripe."
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <a href="#booster-packs">See Grade Booster Packs <ArrowUpRight className="w-4 h-4 ml-1" /></a>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-pink/40 text-brand-pink hover:bg-brand-pinkSoft">
          <a href="#course">Full course on Thinkific</a>
        </Button>
      </PageHero>

      {/* WHAT'S INSIDE EVERY PACK */}
      <section className="bg-brand-pinkSoft py-10">
        <div className="container-px max-w-7xl mx-auto">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-brand-pink">Inside every Grade Booster Pack</p>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {BOOSTER_INCLUDES.map(({ i: Icon, t }) => (
              <div key={t} className="bg-white rounded-2xl px-4 py-3 flex items-center gap-3 shadow-soft">
                <span className="w-9 h-9 rounded-xl bg-brand-pink text-white grid place-items-center"><Icon className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-brand-ink">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GRADE BOOSTER PACKS */}
      <section id="booster-packs" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <p className="font-handwritten text-3xl text-brand-pink">grade booster packs</p>
              <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1">Topic-by-topic A* essentials.</h2>
            </div>
            <p className="text-sm text-brand-mute max-w-sm">Instant PDF download after secure Stripe checkout. Lifetime access — yours to print, annotate and revise from.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <article key={p.id} className={`rounded-[1.75rem] p-7 ${p.accent} border border-white shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all flex flex-col`}>
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-white grid place-items-center text-brand-pink shadow-sm">
                    <p.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-white text-brand-ink font-semibold">Grade Booster</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-brand-ink">{p.title}</h3>
                <p className="text-xs uppercase tracking-wide font-semibold text-brand-mute mt-1">{p.paper}</p>
                <p className="text-brand-ink/80 mt-4 leading-relaxed">{p.blurb}</p>

                <ul className="mt-5 space-y-1.5">
                  {BOOSTER_INCLUDES.map(({ i: Icon, t }) => (
                    <li key={t} className="flex items-center gap-2 text-sm text-brand-ink"><Icon className="w-4 h-4 text-brand-pink" /> {t}</li>
                  ))}
                </ul>

                <div className="mt-6 pt-5 border-t border-white/70 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-brand-mute">From</p>
                    <p className="text-2xl font-semibold text-brand-ink leading-none mt-0.5">{p.price}</p>
                  </div>
                  <Button
                    asChild
                    data-testid={`shop-buy-${p.id}`}
                    className="rounded-full h-11 bg-brand-pink hover:bg-brand-pinkDeep text-white"
                  >
                    <a href={p.stripe} target="_blank" rel="noreferrer">{p.cta} <ArrowUpRight className="w-4 h-4 ml-1" /></a>
                  </Button>
                </div>
                <p className="text-xs text-brand-mute mt-3 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Secure Stripe checkout · instant download link</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* THINKIFIC COURSE */}
      <section id="course" className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-sageSoft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-sageDeep text-xs font-semibold uppercase tracking-wide">
                <MonitorPlay className="w-3.5 h-3.5" /> Full Course · Self-paced
              </span>
              <p className="font-handwritten text-3xl text-brand-pink mt-4">step inside</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">{course.title}</h2>
              <p className="text-sm text-brand-mute mt-2">{course.subtitle}</p>
              <p className="text-brand-ink/80 mt-5 text-lg max-w-lg leading-relaxed">{course.blurb}</p>
              <ul className="mt-6 space-y-2.5">
                {course.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-brand-ink"><Sparkles className="w-5 h-5 text-brand-pink" /> {b}</li>
                ))}
              </ul>
              <Button
                asChild
                data-testid="shop-course-cta"
                className="mt-7 rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white"
              >
                <a href={course.url} target="_blank" rel="noreferrer">Open the course <ArrowUpRight className="w-4 h-4 ml-1" /></a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { i: GraduationCap, t: "AQA examiner-led" },
                { i: BookOpenCheck, t: "Every paper covered" },
                { i: Star, t: "A* model answers" },
                { i: MonitorPlay, t: "Watch on any device" },
              ].map(({ i: Icon, t }, idx) => (
                <div key={t} className={`rounded-3xl p-6 bg-white border border-white shadow-soft ${idx % 2 ? "mt-6" : ""}`}>
                  <Icon className="w-7 h-7 text-brand-pink" />
                  <p className="font-semibold text-brand-ink mt-3">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TUTOR TRAINING PROGRAMME */}
      <section id="tutor-training" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-14 grid lg:grid-cols-5 gap-10 items-center">
            <div className="lg:col-span-3">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-pink text-xs font-semibold uppercase tracking-wide">
                <Users className="w-3.5 h-3.5" /> For Tutors & Teachers · Cohort starts 20 July
              </span>
              <p className="font-handwritten text-3xl text-brand-pink mt-4">for tutors</p>
              <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1 leading-tight">
                Sociology Tutor Training 6 Week Programme
              </h2>
              <p className="text-brand-ink/80 mt-4 text-lg max-w-lg leading-relaxed">
                A focused 6-week training programme to become a confident, examiner-aware Sociology tutor. One live session per week, every session recorded, private Google Classroom — and the brand-name partnership behind you.
              </p>
              <ul className="mt-6 space-y-2.5">
                {[
                  { i: CalendarDays, t: "Cohort begins week of 20 July · 6 weeks" },
                  { i: Video, t: "1 live session per week · all recorded" },
                  { i: BookOpenCheck, t: "Private Google Classroom + full tutor toolkit" },
                  { i: Award, t: "Led personally by Georgina — AQA examiner" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-2 text-brand-ink"><Icon className="w-5 h-5 text-brand-pink" /> {t}</li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  asChild
                  data-testid="shop-buy-tutor-training"
                  className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white"
                >
                  <a href="https://buy.stripe.com/aFa9AT3Ytcg37o7c3zgbm0j" target="_blank" rel="noreferrer">
                    Pay £248.50 deposit <ArrowUpRight className="w-4 h-4 ml-1" />
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-pink/40 text-brand-pink hover:bg-brand-pinkPastel">
                  <Link to="/tutor-partner">Read the full programme</Link>
                </Button>
              </div>
              <p className="text-xs text-brand-mute mt-4 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Programme total £497 · balance £248.50 due 19 July · place confirmed once deposit clears.</p>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl p-7 shadow-medium border border-white">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-mute">Deposit today</p>
                <span className="text-xs px-2.5 py-1 rounded-full bg-brand-sageSoft text-brand-sageDeep font-semibold">Live cohort</span>
              </div>
              <p className="text-5xl font-semibold text-brand-ink mt-3">£248.50</p>
              <p className="text-sm text-brand-mute mt-1">Programme total £497.00</p>
              <div className="mt-6 space-y-3 text-sm text-brand-ink">
                <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-sageDeep" /> Secure Stripe checkout</p>
                <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-sageDeep" /> No hidden fees</p>
                <p className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-brand-sageDeep" /> Welcome pack within 24h</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-y bg-white">
        <div className="container-px max-w-4xl mx-auto text-center">
          <p className="font-handwritten text-3xl text-brand-pink">need something else?</p>
          <h3 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1">More topics coming every cohort.</h3>
          <p className="text-brand-mute mt-4 max-w-xl mx-auto">Looking for a topic that isn't here yet? Drop me an email and I'll let you know when it lands.</p>
          <Button asChild className="mt-7 rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
            <Link to="/contact">Request a topic</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
