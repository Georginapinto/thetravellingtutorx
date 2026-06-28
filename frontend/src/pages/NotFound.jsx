import React from "react";
import { Link } from "react-router-dom";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="min-h-[60vh] grid place-items-center container-px py-32">
      <div className="text-center max-w-md">
        <Plane className="w-12 h-12 mx-auto text-brand-pink -rotate-12" />
        <p className="font-handwritten text-3xl text-brand-pink mt-4">oops, wrong stop</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-brand-ink mt-2">Page not found.</h1>
        <p className="text-brand-mute mt-3">Looks like that page didn't make it onto the map. Let's get you back on track.</p>
        <Button asChild className="mt-7 rounded-full h-12 px-6 bg-brand-pink hover:bg-brand-pinkDeep text-white">
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </section>
  );
}
