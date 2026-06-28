import React, { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { api } from "@/lib/api";
import { Star, Quote } from "lucide-react";

const filterTabs = [
  { id: "all", label: "All" },
  { id: "student", label: "Students" },
  { id: "parent", label: "Parents" },
  { id: "teacher", label: "Teachers" },
];

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    api.get("/testimonials").then((r) => setItems(r.data.items || [])).catch(() => {});
  }, []);

  const filtered = tab === "all" ? items : items.filter((t) => t.audience === tab);

  return (
    <>
      <PageHero
        eyebrow="real results, real people"
        title="Stories from students, parents and teachers."
        lede="Sociology grades change lives. Here's what families, students and educators say about working with The Travelling Tutor X."
      />

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-10">
            {filterTabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                data-testid={`testimonial-tab-${t.id}`}
                className={`px-5 h-11 rounded-full text-sm font-medium transition-all ${
                  tab === t.id ? "bg-brand-pink text-white shadow-soft" : "bg-brand-pinkSoft text-brand-ink hover:bg-brand-pinkPastel"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <div key={t.id} className="rounded-3xl p-7 bg-brand-warmWhite border border-border/60 shadow-soft hover:-translate-y-1 hover:shadow-hover transition-all relative">
                <Quote className="absolute top-5 right-5 w-10 h-10 text-brand-pinkPastel" />
                <div className="flex gap-0.5 mb-3">{[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}</div>
                <p className="text-brand-ink text-lg leading-relaxed">"{t.quote}"</p>
                <div className="mt-6 pt-5 border-t border-border/60">
                  <p className="font-semibold text-brand-ink">{t.name}</p>
                  <p className="text-sm text-brand-mute">{t.role}</p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-brand-mute py-12">Loading stories...</p>
          )}
        </div>
      </section>
    </>
  );
}
