import React from "react";
import { Plane, Heart } from "lucide-react";

// Signature logo: "the travelling tutor X" with airplane + heart trail
export const SignatureLogo = ({ size = "md", className = "" }) => {
  const text = size === "lg" ? "text-4xl md:text-5xl" : size === "sm" ? "text-xl" : "text-xl md:text-2xl";
  return (
    <div className={`inline-flex items-end gap-2 shrink-0 ${className}`}>
      <span className={`font-handwritten ${text} leading-none whitespace-nowrap text-brand-navyDeep`}>
        the travelling tutor
        <span className="text-brand-maroon"> X</span>
      </span>
      <span className="relative inline-block -mb-1">
        <Plane className="w-5 h-5 text-brand-maroon -rotate-12" strokeWidth={1.8} />
        <Heart className="w-2.5 h-2.5 text-brand-maroon absolute -top-1 -right-2 fill-brand-maroon" />
      </span>
    </div>
  );
};

export default SignatureLogo;
