import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Instagram, Music2, Plane } from "lucide-react";
import { SignatureLogo } from "./SignatureLogo";
import { FORMS } from "../constants/testIds";
import { api } from "../lib/api";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    try {
      await api.post("/newsletter", { email, source: "footer" });
      toast.success("You're in! Welcome to the community.");
      setEmail("");
    } catch {
      toast.error("Something went wrong — please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="relative mt-24">
      {/* Newsletter card overlapping */}
      <div className="container-px max-w-7xl mx-auto relative z-10">
        <div className="bg-white rounded-[2rem] shadow-medium border border-border/60 p-8 md:p-12 grid md:grid-cols-2 gap-8 items-center -mb-16">
          <div>
            <p className="font-handwritten text-3xl text-brand-sageDeep">Join the community</p>
            <h3 className="text-3xl md:text-4xl font-semibold text-brand-ink mt-1">
              Join The Travelling Tutor X Community
            </h3>
            <p className="text-brand-mute mt-3 max-w-md">
              Receive free Sociology resources, examiner advice, revision tips and exclusive updates straight to your inbox.
            </p>
          </div>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
            <Input
              data-testid={FORMS.newsletterEmail}
              type="email"
              required
              placeholder="Your best email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-full px-6 bg-brand-warmWhite border-border"
            />
            <Button
              data-testid={FORMS.newsletterSubmit}
              type="submit"
              disabled={busy}
              className="h-14 rounded-full bg-brand-pink hover:bg-brand-pinkDeep text-white px-7"
            >
              {busy ? "Joining..." : "Join Free Today"}
            </Button>
          </form>
        </div>
      </div>

      <div className="bg-brand-pinkSoft pt-32 pb-12">
        <div className="container-px max-w-7xl mx-auto grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <SignatureLogo />
            <p className="text-brand-mute mt-4 max-w-sm">
              Expert Sociology education led by an experienced teacher and AQA Sociology Examiner. Helping students,
              parents and teachers achieve more — wherever you are in your journey.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="mailto:aqaexaminergeorginapinto@outlook.com" className="w-11 h-11 rounded-full bg-white grid place-items-center text-brand-pink hover:bg-brand-pink hover:text-white transition-colors" aria-label="Email">
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
              <li><Link to="/tutor-partner" className="hover:text-brand-pink">Tutor Partner</Link></li>
              <li><Link to="/courses" className="hover:text-brand-pink">Courses</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-brand-ink mb-4">More</h4>
            <ul className="space-y-2.5 text-brand-mute">
              <li><Link to="/free-resources" className="hover:text-brand-pink">Free Resources</Link></li>
              <li><Link to="/resource-shop" className="hover:text-brand-pink">Resource Shop</Link></li>
              <li><Link to="/testimonials" className="hover:text-brand-pink">Testimonials</Link></li>
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
