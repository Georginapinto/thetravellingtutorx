import React from "react";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import { Mail, Music2, Plane, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="say hello"
        title="Let's talk about your Sociology journey."
        lede="Whether you're a student, parent or fellow teacher — tell me a little about what you need, and I'll be in touch personally."
        accent="navy"
      />

      <section className="section-y bg-white">
        <div className="container-px max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-6">
            <div className="rounded-3xl p-6 bg-brand-maroonSoft">
              <Mail className="w-7 h-7 text-brand-maroon" />
              <h3 className="mt-3 font-semibold text-brand-ink">Email</h3>
              <a href="mailto:help@thetravellingtutorx.co.uk" className="text-brand-maroon underline-grow text-sm break-all">help@thetravellingtutorx.co.uk</a>
            </div>
            <div className="rounded-3xl p-6 bg-brand-navySoft">
              <Music2 className="w-7 h-7 text-brand-navyDeep" />
              <h3 className="mt-3 font-semibold text-brand-ink">TikTok</h3>
              <a href="https://www.tiktok.com/@thetravellingtutorx" target="_blank" rel="noreferrer" className="text-brand-navyDeep underline-grow text-sm">@thetravellingtutorx</a>
            </div>
            <div className="rounded-3xl p-6 bg-brand-cream border border-border/60">
              <div className="flex gap-3">
                <MapPin className="w-6 h-6 text-brand-maroon" />
                <div>
                  <h3 className="font-semibold text-brand-ink">Based in the UK</h3>
                  <p className="text-sm text-brand-mute">Working with students across the country & internationally — online.</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-brand-mute flex items-center gap-2"><Plane className="w-4 h-4 text-brand-maroon -rotate-12" /> Replies within 24 hours.</p>
          </div>

          <div className="lg:col-span-2 rounded-[2rem] bg-brand-cream border border-border/60 p-8 md:p-10 shadow-soft">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
