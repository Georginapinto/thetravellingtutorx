import React from "react";

// Consistent section intro: small italic eyebrow, heading and optional lede.
export default function SectionHeader({ eyebrow, title, lede, center = false, className = "" }) {
  return (
    <div className={`${center ? "text-center mx-auto" : ""} max-w-2xl ${className}`}>
      {eyebrow && <p className="font-handwritten text-xl md:text-2xl text-brand-maroon">{eyebrow}</p>}
      <h2 className="text-3xl md:text-[2.75rem] md:leading-[1.1] font-semibold text-brand-ink mt-1">{title}</h2>
      {lede && <p className="text-brand-mute mt-4 text-lg leading-relaxed">{lede}</p>}
    </div>
  );
}
