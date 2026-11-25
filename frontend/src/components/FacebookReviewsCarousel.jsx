import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { FACEBOOK_REVIEWS } from "@/constants/facebookReviews";

// One embedded Facebook recommendation per slide, with arrows and dots.
// Swiping over an embed goes to Facebook's iframe, so the arrows/dots are the
// main way to move between slides.
export default function FacebookReviewsCarousel() {
  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  if (FACEBOOK_REVIEWS.length === 0) return null;

  const arrow =
    "w-11 h-11 rounded-full bg-white border border-brand-maroon/30 text-brand-maroon grid place-items-center hover:bg-brand-maroonPastel transition-colors";

  return (
    <div data-testid="home-facebook-carousel" className="min-w-0 w-full">
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }}>
        <CarouselContent className="items-start">
          {FACEBOOK_REVIEWS.map((r, i) => (
            <CarouselItem key={r.url}>
              <div className="rounded-3xl bg-white p-3 shadow-medium overflow-hidden">
                <iframe
                  title={`Facebook recommendation ${i + 1}`}
                  src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(r.url)}&show_text=true&width=500`}
                  width="100%"
                  height={r.height || 260}
                  style={{ border: "none", overflow: "hidden", width: "100%" }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {FACEBOOK_REVIEWS.length > 1 && (
        <div className="mt-5 flex items-center justify-center gap-4">
          <button type="button" onClick={() => api?.scrollPrev()} aria-label="Previous review" className={arrow}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {FACEBOOK_REVIEWS.map((r, i) => (
              <button
                key={r.url}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === current}
                className={`h-2.5 rounded-full transition-all ${i === current ? "w-6 bg-brand-maroon" : "w-2.5 bg-brand-maroon/30"}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => api?.scrollNext()} aria-label="Next review" className={arrow}>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
