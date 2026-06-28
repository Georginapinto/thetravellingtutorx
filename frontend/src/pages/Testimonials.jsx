import React, { useEffect, useState } from "react";
import PageHero from "@/components/PageHero";
import { api } from "@/lib/api";
import { BRAND } from "@/constants/testIds";
import { Star, Quote, Facebook, ExternalLink } from "lucide-react";

const filterTabs = [
  { id: "all", label: "All" },
  { id: "student", label: "Students" },
  { id: "parent", label: "Parents" },
  { id: "teacher", label: "Teachers" },
];

const FB_PAGE = encodeURIComponent(BRAND.facebookUrl);
const FB_PLUGIN_SRC = `https://www.facebook.com/plugins/page.php?href=${FB_PAGE}&tabs=timeline&width=500&height=720&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;

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

      {/* FACEBOOK REVIEWS — Live page plugin */}
      <section className="section-y">
        <div className="container-px max-w-7xl mx-auto">
          <div className="rounded-[2.5rem] bg-brand-pinkSoft p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1877F2] text-xs font-semibold uppercase tracking-wide">
                  <Facebook className="w-3.5 h-3.5" /> Facebook · @thetravellingtutorx
                </span>
                <h2 className="text-3xl md:text-5xl font-semibold text-brand-ink mt-4">Live reviews from our Facebook community.</h2>
                <p className="text-brand-mute mt-4 text-lg max-w-lg">
                  Real recommendations from students, parents and teachers — updated live from our Facebook page. Tap any review to read the full story or leave one of your own.
                </p>
                <a
                  href={BRAND.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="facebook-link"
                  className="mt-6 inline-flex items-center gap-2 px-5 h-12 rounded-full bg-[#1877F2] hover:bg-[#155ec5] text-white font-medium transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  See all reviews on Facebook
                  <ExternalLink className="w-4 h-4" />
                </a>
                <p className="text-xs text-brand-mute mt-4 max-w-md">
                  Facebook embeds may be blocked by some browser tracking-prevention settings. If you don't see the feed, the button above opens the page directly.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-3 shadow-medium overflow-hidden">
                <iframe
                  title="The Travelling Tutor X Facebook feed"
                  src={FB_PLUGIN_SRC}
                  width="100%"
                  height="720"
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
        </div>
      </section>
    </>
  );
}
