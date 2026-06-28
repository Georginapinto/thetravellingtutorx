import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "./ui/button";
import { NAV } from "../constants/testIds";
import { SignatureLogo } from "./SignatureLogo";
import BookingDialog from "./BookingDialog";

const links = [
  { to: "/", label: "Home", id: NAV.home },
  { to: "/about", label: "About", id: NAV.about },
  { to: "/students", label: "Students", id: NAV.students },
  { to: "/parents", label: "Parents", id: NAV.parents },
  { to: "/teachers", label: "Teachers", id: NAV.teachers },
  { to: "/tutor-partner", label: "Tutor Partner", id: NAV.partner },
  { to: "/testimonials", label: "Testimonials", id: NAV.testimonials },
  { to: "/free-resources", label: "Free Resources", id: NAV.freeResources },
  { to: "/contact", label: "Contact", id: NAV.contact },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/60">
      <div className="container-px max-w-7xl mx-auto flex items-center justify-between h-20">
        <Link to="/" data-testid={NAV.logo} className="flex items-center gap-2">
          <SignatureLogo size="sm" />
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              data-testid={l.id}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors underline-grow ${
                  isActive ? "text-brand-pink" : "text-brand-ink hover:text-brand-pink"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            data-testid={NAV.bookCta}
            onClick={() => setBookOpen(true)}
            className="hidden md:inline-flex bg-brand-pink hover:bg-brand-pinkDeep text-white rounded-full px-5 h-11 shadow-soft"
          >
            <Plane className="w-4 h-4 mr-2 -rotate-12" /> Book Free Consultation
          </Button>
          <button
            data-testid={NAV.mobileToggle}
            onClick={() => setOpen((s) => !s)}
            className="lg:hidden p-2 rounded-full bg-brand-pinkSoft text-brand-pink"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background">
          <div className="container-px max-w-7xl mx-auto py-6 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-3 px-4 rounded-2xl font-medium ${
                    isActive ? "bg-brand-pinkSoft text-brand-pink" : "text-brand-ink hover:bg-muted"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Button
              onClick={() => { setOpen(false); setBookOpen(true); }}
              className="mt-3 bg-brand-pink hover:bg-brand-pinkDeep text-white rounded-full h-12"
            >
              Book Free Consultation
            </Button>
          </div>
        </div>
      )}

      <BookingDialog open={bookOpen} onOpenChange={setBookOpen} />
    </header>
  );
};

export default Navbar;
