import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { BOOSTER_PACKS, COURSE } from "@/constants/site";
import {
  Sparkles, FileText, ClipboardCheck, Star, BookOpenCheck, GraduationCap, Globe, BarChart3,
  Building2, MonitorPlay, ArrowUpRight, ShieldCheck, Award, Table2, School, Gift, Mail,
} from "lucide-react";

// Every Grade Booster Pack includes the same four things.
const BOOSTER_INCLUDES = [
  { i: Star, t: "A* model answer" },
  { i: Award, t: "Examiner insights" },
  { i: FileText, t: "One-page reference bank" },
  { i: ClipboardCheck, t: "Snapshot essay plan" },
];

const PACK_ICONS = { globalisation: Globe, marketisation: BarChart3, privatisation: Building2 };

export default function Resources() {
  return (
    <>
      <PageHero
        eyebrow="resources"
        title="Examiner-written resources that raise grades."
        lede="Built by an AQA Sociology examiner of 9 years — the model answers, essay plans and frameworks that show you exactly what top-band answers look like. Instant access after secure checkout."
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
          <a href="#grade-booster-packs">Shop Grade Booster Packs <ArrowUpRight className="w-4 h-4 ml-1" /></a>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-maroon/40 text-brand-maroon hover:bg-brand-maroonSoft">
          <a href="#grade-transformation-course">Grade Transformation Course</a>
        </Button>
      </PageHero>

      {/* GRADE BOOSTER PACKS */}
      <section id="grade-booster-packs" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionHeader
              eyebrow="grade booster packs"
              title="Topic-by-topic A* essentials."
              lede="Each pack gives you everything you need to write a top-band answer on one topic. Instant PDF download — yours to print, annotate and revise from."
            />
          </div>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
            {BOOSTER_INCLUDES.map(({ i: Icon, t }) => (
              <div key={t} className="rounded-2xl bg-brand-cream px-4 py-3 flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-brand-maroon text-white grid place-items-center shrink-0"><Icon className="w-4 h-4" /></span>
                <span className="text-sm font-medium text-brand-ink">{t}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BOOSTER_PACKS.map((p) => {
              const Icon = PACK_ICONS[p.id] || BookOpenCheck;
              return (
                <article key={p.id} className="rounded-3xl p-7 bg-white border border-border/70 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all flex flex-col">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-brand-maroonSoft grid place-items-center text-brand-maroon">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-brand-navySoft text-brand-navyDeep font-semibold">Grade Booster</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-brand-ink">{p.title}</h3>
                  <p className="text-xs uppercase tracking-wide font-semibold text-brand-mute mt-1">{p.paper}</p>
                  <p className="text-brand-ink/80 mt-4 leading-relaxed flex-1">{p.blurb}</p>
                  <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between gap-3">
                    <p className="text-2xl font-semibold text-brand-ink">{p.price}</p>
                    <Button asChild data-testid={`shop-buy-${p.id}`} className="rounded-full h-11 px-5 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
                      <a href={p.stripe} target="_blank" rel="noreferrer">Buy now <ArrowUpRight className="w-4 h-4 ml-1" /></a>
                    </Button>
                  </div>
                  <p className="text-xs text-brand-mute mt-3 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> Secure Stripe checkout · instant download link</p>
                </article>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-brand-mute">
            Need a topic that isn't here yet? <Link to="/contact?subject=Resource%20topic%20request" className="text-brand-maroon font-medium underline-grow">Request a topic</Link> and I'll let you know when it lands.
          </p>
        </div>
      </section>

      {/* LEARNING TABLES — price list by email */}
      <section id="learning-tables" className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-white border border-border/60 shadow-soft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeader
                eyebrow="learning tables"
                title="Every topic, on a single page."
                lede="Learning Tables condense each AQA Sociology topic into one clear page of key concepts, sociologists and evaluation points — perfect for fast, focused revision."
              />
              <ul className="mt-6 space-y-2.5">
                {["Topic-by-topic tables for fast revision", "Money-saving bundles available", "Price list sent straight to your inbox"].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-brand-ink"><Table2 className="w-5 h-5 text-brand-maroon" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-brand-cream p-6 md:p-8" data-testid="learning-tables-signup">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-brand-maroon text-white grid place-items-center"><Mail className="w-6 h-6" /></div>
                <div>
                  <p className="font-semibold text-brand-ink">Get the price list & bundles</p>
                  <p className="text-xs text-brand-mute">Pop your details in and I'll email you the latest prices.</p>
                </div>
              </div>
              <LeadMagnetForm
                audienceOptions={["student", "parent"]}
                magnet="learning-tables-prices"
                ctaLabel="Email me the price list"
                doneText="Thank you! I'll email you the Learning Tables price list and bundle offers shortly."
                successToast="Request sent — the price list is on its way to your inbox."
              />
            </div>
          </div>
        </div>
      </section>

      {/* GRADE TRANSFORMATION COURSE */}
      <section id="grade-transformation-course" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-brand-navyDeep text-white p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" /> Flagship course
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold mt-4 leading-tight">{COURSE.title}</h2>
              <p className="text-sm text-white/60 mt-2">{COURSE.subtitle}</p>
              <p className="text-white/80 mt-5 text-lg max-w-lg leading-relaxed">{COURSE.blurb}</p>
              <ul className="mt-6 space-y-2.5">
                {COURSE.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2"><Sparkles className="w-5 h-5 text-brand-maroonPastel" /> {b}</li>
                ))}
              </ul>
              <Button asChild data-testid="shop-course-cta" className="mt-8 rounded-full h-12 px-7 bg-white text-brand-maroon hover:bg-brand-cream font-semibold">
                <a href={COURSE.url} target="_blank" rel="noreferrer">Enrol in the course <ArrowUpRight className="w-4 h-4 ml-1" /></a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { i: GraduationCap, t: "AQA examiner-led" },
                { i: BookOpenCheck, t: "Every paper covered" },
                { i: Star, t: "A* model answers" },
                { i: MonitorPlay, t: "Watch on any device" },
              ].map(({ i: Icon, t }, idx) => (
                <div key={t} className={`rounded-3xl p-6 bg-white/[0.07] border border-white/10 ${idx % 2 ? "mt-6" : ""}`}>
                  <Icon className="w-7 h-7 text-brand-maroonPastel" />
                  <p className="font-semibold mt-3">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREE + SCHOOLS */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          <Link to="/free-resources" className="group rounded-3xl bg-white border border-border/60 p-8 shadow-soft hover:shadow-hover transition-all">
            <Gift className="w-8 h-8 text-brand-maroon" />
            <h3 className="mt-4 text-2xl font-semibold text-brand-ink">Free resources</h3>
            <p className="text-brand-mute mt-2">Try before you buy — download a free examiner-written guide.</p>
            <span className="mt-4 inline-flex items-center gap-1 text-brand-maroon font-medium">Get free resources <ArrowUpRight className="w-4 h-4" /></span>
          </Link>
          <Link to="/schools" className="group rounded-3xl bg-brand-maroon text-white p-8 shadow-soft hover:shadow-hover transition-all">
            <School className="w-8 h-8" />
            <h3 className="mt-4 text-2xl font-semibold">Buying for a school?</h3>
            <p className="text-white/80 mt-2">Schools can access these resources at exclusive discounted rates.</p>
            <span className="mt-4 inline-flex items-center gap-1 font-medium">Enquire for your school <ArrowUpRight className="w-4 h-4" /></span>
          </Link>
        </div>
      </section>
    </>
  );
}
