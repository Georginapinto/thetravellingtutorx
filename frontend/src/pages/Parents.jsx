import React from "react";
import PageHero from "@/components/PageHero";
import LeadMagnetForm from "@/components/LeadMagnetForm";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, ShieldCheck, BarChart3, MessageCircleHeart, BookOpenCheck, Calendar, Sparkles, GraduationCap } from "lucide-react";

const helps = [
  { i: ShieldCheck, t: "Calm, structured support", d: "Weekly sessions, clear targets, no last-minute panic." },
  { i: BarChart3, t: "Honest progress reports", d: "You'll always know exactly where your child stands." },
  { i: MessageCircleHeart, t: "Direct communication", d: "I talk to you, not just your child. We work together." },
  { i: Heart, t: "Confidence first", d: "Results follow when teenagers feel believed in. That's the whole job." },
];

export default function Parents() {
  return (
    <>
      <PageHero
        eyebrow="for parents"
        title="Calm, expert support — for them, and for you."
        lede="Helping your teenager through GCSE or A-Level Sociology shouldn't feel like guesswork. I provide structured, examiner-led tutoring, regular updates, and the kind of warm professionalism that makes parents finally exhale."
        accent="sage"
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <Link to="/contact">Book a parent consultation</Link>
        </Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-ink">How I help families</h2>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helps.map((h) => (
              <div key={h.t} className="rounded-3xl p-6 bg-brand-sageSoft border border-white shadow-soft">
                <div className="w-12 h-12 rounded-xl bg-white grid place-items-center text-brand-sageDeep"><h.i className="w-6 h-6" /></div>
                <h3 className="mt-4 font-semibold text-brand-ink text-lg">{h.t}</h3>
                <p className="text-brand-mute text-sm mt-1.5">{h.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-handwritten text-3xl text-brand-pink">popular routes</p>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-1">GCSE & A-Level Sociology support</h2>
            <p className="text-brand-mute mt-4 text-lg">Whether your child is just starting GCSE or sitting A-Level mocks, we'll find the right path together.</p>
            <ul className="mt-6 space-y-3">
              {[
                { i: GraduationCap, t: "1:1 weekly tutoring (GCSE & A-Level)" },
                { i: BookOpenCheck, t: "Essay coaching & exam-technique workshops" },
                { i: Sparkles, t: "Sociology Success Academy group programme" },
                { i: Calendar, t: "Half-term intensive revision sessions" },
              ].map(({ i: Icon, t }) => (
                <li key={t} className="flex items-center gap-3 text-brand-ink"><span className="w-9 h-9 rounded-xl bg-brand-pinkSoft text-brand-pink grid place-items-center"><Icon className="w-5 h-5" /></span> {t}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-12">
            <p className="font-handwritten text-3xl text-brand-pink">free for parents</p>
            <h3 className="text-3xl font-semibold text-brand-ink mt-1">Parent Guide to Sociology Success</h3>
            <p className="text-brand-mute mt-3">Revision advice, how to support without nagging, study planning and motivation tips — all in one short, practical guide.</p>
            <div className="mt-6 bg-white rounded-2xl p-6">
              <LeadMagnetForm audience="parent" magnet="parent-guide" ctaLabel="Send Me the Parent Guide" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
