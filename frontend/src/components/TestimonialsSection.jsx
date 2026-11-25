import React from "react";
import { Facebook, ExternalLink, Star } from "lucide-react";
import FacebookReviewsCarousel from "@/components/FacebookReviewsCarousel";
import { BRAND } from "@/constants/testIds";

// Genuine Facebook recommendations (see constants/facebookReviews.js) in a
// carousel, with a link to read them all on Facebook.
export default function TestimonialsSection({ id, className = "bg-white" }) {
  return (
    <section id={id} className={`section-y ${className}`}>
      <div className="container-px max-w-7xl mx-auto">
        <div className="rounded-[2rem] bg-brand-cream border border-border/60 p-8 md:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-1 text-yellow-500" aria-label="5 star reviews">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="font-handwritten text-xl md:text-2xl text-brand-maroon mt-4">testimonials</p>
            <h2 className="text-3xl md:text-[2.75rem] md:leading-[1.1] font-semibold text-brand-ink mt-1">
              Don't just take my word for it.
            </h2>
            <p className="text-brand-mute mt-4 text-lg max-w-lg leading-relaxed">
              Real, unedited recommendations from students and parents I've worked with — including students who climbed
              from E grades to A grades. Use the arrows to read more.
            </p>
            <a
              href={BRAND.facebookUrl}
              target="_blank"
              rel="noreferrer"
              data-testid="home-facebook-link"
              className="mt-7 inline-flex items-center gap-2 px-5 h-12 rounded-full bg-[#1877F2] hover:bg-[#155ec5] text-white font-medium transition-colors"
            >
              <Facebook className="w-4 h-4" /> See all reviews on Facebook <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-brand-mute mt-4 max-w-md">
              Some browsers' tracking protection hides Facebook posts. If the reviews don't appear, the button above opens them on Facebook.
            </p>
          </div>
          <FacebookReviewsCarousel />
        </div>
      </div>
    </section>
  );
}
