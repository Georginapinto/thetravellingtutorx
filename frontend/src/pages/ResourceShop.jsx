import React from "react";
import { Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { ShoppingBag, FileText, ClipboardCheck, BookOpenCheck } from "lucide-react";

const items = [
  { i: FileText, t: "AQA Essay Planner Bundle", d: "Plan top-band essays for every Sociology topic.", price: "£12" },
  { i: ClipboardCheck, t: "Model Answers Pack", d: "Examiner-written 30-marker model answers, annotated.", price: "£18" },
  { i: BookOpenCheck, t: "Theory & Methods Workbook", d: "Practice questions, retrieval quizzes and full mark schemes.", price: "£15" },
  { i: ShoppingBag, t: "Complete Revision Bundle", d: "Everything above — plus flashcards, posters and audio.", price: "£35" },
];

export default function ResourceShop() {
  return (
    <>
      <PageHero
        eyebrow="resource shop"
        title="Premium Sociology resources, built by an examiner."
        lede="Essay planners, model answers and retrieval workbooks designed to get students into the top mark band. Full shop launching soon — pre-orders open via enquiry."
      />

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.t} className="rounded-3xl p-6 bg-brand-warmWhite border border-border/60 shadow-soft hover:-translate-y-1 hover:shadow-hover transition-all">
              <div className="w-12 h-12 rounded-2xl bg-brand-sageSoft text-brand-sageDeep grid place-items-center"><it.i className="w-6 h-6" /></div>
              <h3 className="mt-4 text-lg font-semibold text-brand-ink">{it.t}</h3>
              <p className="text-brand-mute text-sm mt-2">{it.d}</p>
              <div className="mt-5 flex items-center justify-between">
                <p className="font-semibold text-brand-pink">{it.price}</p>
                <Button asChild className="rounded-full h-10 bg-brand-pink hover:bg-brand-pinkDeep text-white">
                  <Link to="/contact">Pre-order</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
