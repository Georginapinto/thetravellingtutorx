import React from "react";
import { Link } from "react-router-dom";
import { Mail, Instagram, Music2, Plane } from "lucide-react";
import { SignatureLogo } from "./SignatureLogo";
import { NewsletterSignup } from "./NewsletterSignup";

export const Footer = () => {
  return (
    <footer className="relative mt-24">
      <div className="container-px max-w-7xl mx-auto relative z-10">
        <NewsletterSignup source="footer" className="-mb-16" />
      </div>

      <div className="bg-brand-pinkSoft pt-32 pb-12">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <SignatureLogo />
            <p className="text-brand-mute mt-4 max-w-sm">
              Examiner-led Sociology tutoring and resources from an AQA Sociology Examiner, Head of Sociology and
              Director of Sixth Form. Building self-belief and helping students achieve their best grades.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="mailto:help@thetravellingtutorx.co.uk" className="w-11 h-11 rounded-full bg-white grid place-items-center text-brand-pink hover:bg-brand-pink hover:text-white transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://www.tiktok.com/@thetravellingtutorx" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white grid place-items-center text-brand-pink hover:bg-brand-pink hover:text-white transition-colors" aria-label="TikTok">
                <Music2 className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white grid place-items-center text-brand-pink hover:bg-brand-pink hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-brand-ink mb-4">Explore</h4>
            <ul className="space-y-2.5 text-brand-mute">
              <li><Link to="/students" className="hover:text-brand-pink">Students</Link></li>
              <li><Link to="/parents" className="hover:text-brand-pink">Parents</Link></li>
              <li><Link to="/teachers" className="hover:text-brand-pink">Teachers</Link></li>
              <li><Link to="/tutor-partner" className="hover:text-brand-pink">Tutor Training</Link></li>
              <li><Link to="/courses" className="hover:text-brand-pink">Courses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-ink mb-4">More</h4>
            <ul className="space-y-2.5 text-brand-mute">
              <li><Link to="/free-resources" className="hover:text-brand-pink">Free Resources</Link></li>
              <li><Link to="/shop" className="hover:text-brand-pink">Shop</Link></li>
              <li><Link to="/blog" className="hover:text-brand-pink">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-brand-pink">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="container-px max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-pinkPastel flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-brand-mute">
          <p>© {new Date().getFullYear()} The Travelling Tutor X. All rights reserved.</p>
          <p className="flex items-center gap-2"><Plane className="w-4 h-4 -rotate-12 text-brand-pink" /> Designed with care in the UK.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
