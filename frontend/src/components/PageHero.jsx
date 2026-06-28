import React from "react";

export const PageHero = ({ eyebrow, title, lede, accent = "pink", children, image }) => {
  const accentBg = accent === "sage" ? "bg-brand-sageSoft" : "bg-brand-pinkSoft";
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-16 md:pb-20">
      <div className={`blob ${accentBg} w-[420px] h-[420px] -top-32 -left-32`} />
      <div className="blob bg-brand-sageSoft w-[360px] h-[360px] -bottom-24 right-0 opacity-50" />
      <div className="container-px max-w-7xl mx-auto relative">
        <div className={`grid ${image ? "lg:grid-cols-2" : "lg:grid-cols-1 max-w-3xl"} gap-12 items-center`}>
          <div>
            {eyebrow && (
              <span className="inline-block font-handwritten text-2xl text-brand-pink mb-2">{eyebrow}</span>
            )}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-brand-ink">
              {title}
            </h1>
            {lede && <p className="text-lg text-brand-mute mt-5 leading-relaxed max-w-xl">{lede}</p>}
            {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
          </div>
          {image && (
            <div className="relative">
              <div className="absolute -inset-4 bg-brand-pinkSoft rounded-[2.5rem] -rotate-2" />
              <img src={image} alt="" className="relative rounded-[2.5rem] shadow-medium w-full object-cover aspect-[5/6]" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
