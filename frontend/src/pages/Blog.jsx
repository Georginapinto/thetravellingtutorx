import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, ArrowUpRight } from "lucide-react";

const posts = [
  { t: "How AQA Sociology examiners actually mark 30-markers", d: "The mark scheme behind the mark scheme — what gets you into the top band.", tag: "Examiner Insight", date: "Coming soon" },
  { t: "Revising Sociology when you hate revising", d: "Five honest strategies that work for real teenagers (and the parents supporting them).", tag: "Revision", date: "Coming soon" },
  { t: "Why CPD changes Sociology departments more than schemes of work", d: "What I learned leading Sociology CPD across UK schools.", tag: "Teacher CPD", date: "Coming soon" },
];

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="the journal"
        title="Sociology insights, essays & examiner thinking."
        lede="A growing collection of examiner-led articles for students, parents and teachers. New posts launching soon."
      >
        <Button asChild className="rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <Link to="/free-resources">Join the newsletter</Link>
        </Button>
      </PageHero>

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {posts.map((p) => (
            <div key={p.t} className="rounded-3xl p-7 bg-brand-warmWhite border border-border/60 shadow-soft hover:-translate-y-1 hover:shadow-hover transition-all">
              <BookOpen className="w-7 h-7 text-brand-pink" />
              <span className="inline-block mt-4 text-xs px-3 py-1 rounded-full bg-brand-pinkSoft text-brand-pink font-medium">{p.tag}</span>
              <h3 className="mt-3 text-xl font-semibold text-brand-ink leading-snug">{p.t}</h3>
              <p className="text-brand-mute text-sm mt-2">{p.d}</p>
              <p className="text-xs text-brand-mute mt-5 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {p.date}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-brand-pink text-sm font-medium">Read more <ArrowUpRight className="w-4 h-4" /></span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
