import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import SectionHeader from "@/components/SectionHeader";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/constants/testIds";
import {
  GraduationCap, Users, MonitorPlay, ArrowUpRight, CheckCircle2, Sparkles, BookOpenCheck,
  CalendarDays, FileDown, ClipboardCheck, FileText, Star, MessageSquareText, Target, TrendingUp,
} from "lucide-react";

// Tuition calls to action lead to the price-list sign-up below.
const PRICES = "#price-list";

const options = [
  { id: "one-to-one", icon: GraduationCap, title: "1:1 Tuition", desc: "Bespoke weekly sessions built entirely around you." },
  { id: "group", icon: Users, title: "Group Tuition", desc: "Small-group bootcamps and intensive revision workshops." },
  { id: "recorded", icon: MonitorPlay, title: "Recorded Group Sessions", desc: "Examiner-led lessons you can watch on demand." },
];

const groupProgrammes = [
  { icon: Sparkles, title: "Sociology Grade Booster Bootcamps", tag: "Flagship", detail: "Small cohorts", desc: "Our flagship group programme — structured, examiner-led sessions that build essay skills topic by topic." },
  { icon: BookOpenCheck, title: "Revision Workshops", tag: "Live", detail: "Half-term intensives", desc: "Half-term intensives focused on essay craft and exam technique, so knowledge turns into top-band marks." },
  { icon: CalendarDays, title: "Year 12 Sociology Glow-Up", tag: "Limited", detail: "Summer cohort", desc: "A skills-led summer programme to get Year 12s ready to hit the ground running in Year 13." },
];

const steps = [
  { icon: MessageSquareText, title: "Get the price list", desc: "Pop your email in below and I'll send you the tuition prices." },
  { icon: Target, title: "Get a clear plan", desc: "We agree the right route, focus topics and target grade." },
  { icon: TrendingUp, title: "Watch your grades rise", desc: "Examiner-led teaching, feedback and progress updates." },
];

function Check({ children }) {
  return (
    <li className="flex items-start gap-2.5 text-brand-ink">
      <CheckCircle2 className="w-5 h-5 text-brand-maroon shrink-0 mt-0.5" /> <span>{children}</span>
    </li>
  );
}

export default function Tuition() {
  return (
    <>
      <PageHero
        eyebrow="tuition"
        title="AQA Sociology tuition, led by an examiner."
        lede="GCSE and A-Level Sociology tuition from an AQA examiner of 9 years and former Head of Sociology. Build stronger essays, master exam technique and gain the examiner's edge."
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
          <a href={PRICES}>Get the price list <ArrowUpRight className="w-4 h-4 ml-1" /></a>
        </Button>
        <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-maroon/40 text-brand-maroon hover:bg-brand-maroonSoft">
          <a href="#options">Compare options</a>
        </Button>
      </PageHero>

      {/* OPTIONS OVERVIEW */}
      <section id="options" className="pb-16 md:pb-20">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-3 gap-5">
          {options.map((o) => (
            <a key={o.id} href={`#${o.id}`} className="group rounded-3xl bg-white border border-border/60 p-7 shadow-soft hover:shadow-hover hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-maroon text-white grid place-items-center"><o.icon className="w-6 h-6" /></div>
              <h3 className="mt-5 text-xl font-semibold text-brand-ink">{o.title}</h3>
              <p className="text-brand-mute mt-1.5">{o.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-maroon">
                Find out more <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* 1:1 */}
      <section id="one-to-one" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="1:1 tuition"
              title="Personal tuition, built around your target grade."
              lede="Every session is tailored to your exam board specification, your weak spots and the grade you need for your next step — whether that's GCSE or A-Level."
            />
            <ul className="mt-7 space-y-3">
              <Check>Weekly online sessions with an AQA Sociology examiner</Check>
              <Check>Essay feedback marked against the real AQA mark scheme</Check>
              <Check>Clear targets, so you always know what to improve next</Check>
              <Check>Honest progress updates for parents</Check>
            </ul>
            <Button asChild className="mt-8 rounded-full h-12 px-7 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
              <a href={PRICES}>Get 1:1 tuition prices <ArrowUpRight className="w-4 h-4 ml-1" /></a>
            </Button>
          </div>
          <div className="rounded-[2rem] bg-brand-navyDeep text-white p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/60">Who it's for</p>
            <ul className="mt-5 space-y-5">
              {[
                ["Students aiming for A/A*", "Polish evaluation and application to reach the top band."],
                ["Students who feel stuck", "Some of my students have climbed from E grades to A grades."],
                ["Exam-year students", "Focused revision and timed practice before the big day."],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <Star className="w-5 h-5 text-white/80 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">{t}</p>
                    <p className="text-white/70 text-sm mt-0.5">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* GROUP */}
      <section id="group" className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex items-end justify-between flex-wrap gap-6">
            <SectionHeader
              eyebrow="group tuition"
              title="Learn with others. Progress faster."
              lede="Examiner-led group programmes that give you structure, momentum and plenty of exam practice — at a lower cost than 1:1."
            />
            <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-maroon/40 text-brand-maroon hover:bg-brand-maroonSoft">
              <a href={PRICES}>Get group prices</a>
            </Button>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {groupProgrammes.map((g) => (
              <div key={g.title} className="rounded-3xl bg-white border border-border/60 p-7 shadow-soft flex flex-col">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-brand-navySoft text-brand-navyDeep grid place-items-center"><g.icon className="w-6 h-6" /></div>
                  <span className="text-xs px-3 py-1 rounded-full bg-brand-maroonSoft text-brand-maroon font-semibold">{g.tag}</span>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-brand-ink">{g.title}</h3>
                <p className="text-brand-mute mt-2 flex-1">{g.desc}</p>
                <div className="mt-6 pt-5 border-t border-border/60 flex items-center justify-between">
                  <p className="font-semibold text-brand-maroon">{g.detail}</p>
                  <a href={PRICES} className="text-sm font-medium text-brand-ink hover:text-brand-maroon inline-flex items-center gap-1">
                    Get prices <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECORDED */}
      <section id="recorded" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-brand-cream border border-border/60 p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHeader
                eyebrow="recorded group sessions"
                title="Examiner-led lessons, whenever you need them."
                lede="Recordings of our examiner-led group sessions, so you can learn at your own pace, catch up on a missed session or revisit a tricky topic before the exam."
              />
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="rounded-full h-12 px-6 bg-brand-maroon hover:bg-brand-maroonDeep text-white font-semibold">
                  <a href={PRICES}>Get access prices <ArrowUpRight className="w-4 h-4 ml-1" /></a>
                </Button>
                <Button asChild variant="outline" className="rounded-full h-12 px-6 border-brand-maroon/40 text-brand-maroon hover:bg-brand-maroonSoft">
                  <Link to="/resources#grade-transformation-course">See the full course</Link>
                </Button>
              </div>
            </div>
            <ul className="grid sm:grid-cols-2 gap-4">
              {[
                [MonitorPlay, "Watch on any device"],
                [CalendarDays, "Learn on your schedule"],
                [ClipboardCheck, "Real exam-style practice"],
                [BookOpenCheck, "Revisit topics any time"],
              ].map(([Icon, t]) => (
                <li key={t} className="rounded-2xl bg-white p-5 shadow-soft">
                  <Icon className="w-6 h-6 text-brand-maroon" />
                  <p className="font-semibold text-brand-ink mt-3">{t}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <SectionHeader eyebrow="how it works" title="Getting started is simple." center />
          <ol className="mt-12 grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-white border border-border/60 p-7 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-brand-maroon text-white grid place-items-center font-semibold">{i + 1}</span>
                  <s.icon className="w-6 h-6 text-brand-navy" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-brand-ink">{s.title}</h3>
                <p className="text-brand-mute mt-1.5">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PRICE LIST SIGN-UP */}
      <section id="price-list" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-brand-navyDeep text-white p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="font-handwritten text-xl md:text-2xl text-brand-maroonPastel">tuition price list</p>
              <h2 className="text-3xl md:text-[2.75rem] md:leading-[1.1] font-semibold mt-1">Get the tuition price list in your inbox.</h2>
              <p className="text-white/75 mt-4 text-lg leading-relaxed max-w-lg">
                Prices for 1:1 tuition, group tuition and recorded group sessions, including any bundle offers. Places are limited,
                so sign up to hear first.
              </p>
              <p className="text-white/60 text-sm mt-6">
                Prefer to talk first? <Link to="/contact?subject=Tuition%20enquiry" className="underline underline-offset-2 hover:text-white">Send me a message</Link>.
              </p>
            </div>
            <div className="bg-white text-brand-ink rounded-3xl p-6 md:p-8 shadow-medium" data-testid="tuition-prices-signup">
              <LeadMagnetForm
                audienceOptions={["student", "parent"]}
                magnet="tuition-prices"
                ctaLabel="Email me the price list"
                doneText="Thank you! I'll email you the tuition price list shortly."
                successToast="Request sent — the price list is on its way to your inbox."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FREE ESSAY GUIDE */}
      <section id="student-resource" className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2rem] bg-brand-maroonSoft p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-maroon text-xs font-semibold tracking-wide uppercase">Free PDF</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-4 leading-tight">
                Not ready yet? Try my Essay Super Structure for free.
              </h2>
              <p className="text-brand-ink/80 mt-4 text-lg max-w-lg">
                My recommended structure with a full worked model answer for the AQA Families &amp; Households 10-mark question.
              </p>
              <ul className="mt-6 space-y-2.5 text-brand-ink">
                {[
                  { i: ClipboardCheck, t: "Step-by-step Super Structure breakdown" },
                  { i: FileText, t: "Full model answer, annotated by an AQA examiner" },
                  { i: Star, t: "Mark-scheme thinking — what gets you the marks" },
                ].map(({ i: Icon, t }) => (
                  <li key={t} className="flex items-center gap-2"><Icon className="w-5 h-5 text-brand-maroon" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-3xl p-7 shadow-medium">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-brand-maroon text-white grid place-items-center"><FileDown className="w-6 h-6" /></div>
                <div>
                  <p className="font-semibold text-brand-ink">Instant download</p>
                  <p className="text-xs text-brand-mute">Pop your details in — opens straight away.</p>
                </div>
              </div>
              <LeadMagnetForm
                audience="student"
                magnet="essay-super-structure-families"
                ctaLabel="Get my free essay guide"
                downloadUrl={BRAND.essayStructurePdf}
                downloadFilename="Essay-Super-Structure-Families-and-Households-10m.pdf"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
