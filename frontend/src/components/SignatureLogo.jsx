import React from "react";
import { Plane, Heart } from "lucide-react";

// Handwritten signature logo: "the travelling tutor X" with airplane + heart trail
export const SignatureLogo = ({ size = "md", className = "" }) => {
  const text = size === "lg" ? "text-5xl md:text-6xl" : size === "sm" ? "text-2xl" : "text-3xl md:text-4xl";
  return (
    <div className={`inline-flex items-end gap-2 ${className}`}>
      <span className={`font-handwritten ${text} leading-none text-brand-sageDeep`}>
        the travelling tutor
        <span className="text-brand-pink"> X</span>
      </span>
      <span className="relative inline-block -mb-1">
        <Plane className="w-5 h-5 text-brand-pink -rotate-12" strokeWidth={1.8} />
        <Heart className="w-2.5 h-2.5 text-brand-pink absolute -top-1 -right-2 fill-brand-pink" />
      </span>
    </div>
  );
};

export default SignatureLogo;
