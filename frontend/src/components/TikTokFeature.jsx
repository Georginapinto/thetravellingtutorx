import React from "react";
import { ArrowUpRight, Play } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { TIKTOK_URL } from "@/constants/site";

// A TikTok screenshot in a phone frame with its view/like counts, beside a
// short pitch and a link to the channel. `reverse` puts the phone on the left.
export default function TikTokFeature({ clip, eyebrow = "learn with me on tiktok", title, lede, reverse = false, className = "bg-white", id }) {
  return (
    <section id={id} className={`section-y ${className}`}>
      <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className={reverse ? "lg:order-2" : ""}>
          <SectionHeader eyebrow={eyebrow} title={title} lede={lede} />
          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg">
            {clip.stats.map(([value, label]) => (
              <div key={label} className="rounded-2xl bg-brand-cream border border-border/60 px-4 py-3">
                <dt className="sr-only">{label}</dt>
                <dd className="text-2xl font-bold text-brand-navyDeep leading-none">{value}</dd>
                <p className="text-xs uppercase tracking-wider text-brand-mute mt-1.5">{label}</p>
              </div>
            ))}
          </dl>
          <a
            href={TIKTOK_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-6 h-12 rounded-full bg-brand-ink hover:bg-black text-white font-medium transition-colors"
          >
            <Play className="w-4 h-4 fill-current" /> Watch on TikTok <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
        <figure className={`relative mx-auto w-full max-w-[300px] ${reverse ? "lg:order-1" : ""}`}>
          <div className="absolute -inset-5 bg-brand-maroonSoft rounded-[3rem] rotate-3" aria-hidden />
          <div className="relative rounded-[2.5rem] bg-brand-ink p-2.5 shadow-medium">
            <img src={clip.image} alt={clip.alt} loading="lazy" className="w-full rounded-[2rem] block" />
          </div>
          <figcaption className="relative mt-4 text-center text-sm font-medium text-brand-navyDeep">
            @thetravellingtutorx · {clip.topic}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
