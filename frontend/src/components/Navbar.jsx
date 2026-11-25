import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { NAV } from "../constants/testIds";
import { NAV_ITEMS, GET_STARTED } from "../constants/site";
import { SignatureLogo } from "./SignatureLogo";

const slug = (label) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");

// A top-level item is "active" when the current page is its page or one of its children's.
const isActiveItem = (item, pathname) =>
  item.to === "/"
    ? pathname === "/"
    : pathname.startsWith(item.to) || (item.children || []).some((c) => pathname === c.to.split("#")[0]);

function Dropdown({ item, active, open, onOpen, onClose }) {
  const closeTimer = useRef(null);
  const enter = () => {
    clearTimeout(closeTimer.current);
    onOpen();
  };
  const leave = () => {
    closeTimer.current = setTimeout(onClose, 120);
  };
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        type="button"
        data-testid={`nav-${slug(item.label)}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap py-2 ${
          active || open ? "text-brand-maroon" : "text-brand-ink hover:text-brand-maroon"
        }`}
      >
        {item.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
          <div className="w-72 rounded-2xl bg-white border border-border/70 shadow-medium p-2 animate-fade-up [animation-duration:150ms]">
            {item.children.map((c) => (
              <Link
                key={c.to}
                to={c.to}
                onClick={onClose}
                className="block rounded-xl px-4 py-3 hover:bg-brand-cream transition-colors"
              >
                <span className="block text-sm font-semibold text-brand-ink">{c.label}</span>
                {c.desc && <span className="block text-xs text-brand-mute mt-0.5">{c.desc}</span>}
              </Link>
            ))}
            <Link
              to={item.to}
              onClick={onClose}
              className="mt-1 flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-brand-maroon border-t border-border/60 hover:bg-brand-maroonSoft"
            >
              View all {item.label.toLowerCase()} <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown label
  const [mobileSection, setMobileSection] = useState(null); // expanded mobile group
  const { pathname, hash } = useLocation();
  const navRef = useRef(null);

  // Close everything when the page (or section) changes.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname, hash]);

  // Close the desktop dropdown on Escape or a click outside the menu.
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e) => e.key === "Escape" && setOpenMenu(null);
    const onClick = (e) => navRef.current && !navRef.current.contains(e.target) && setOpenMenu(null);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu]);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/60">
      <div className="container-px max-w-7xl mx-auto flex items-center justify-between gap-6 h-20">
        <Link to="/" data-testid={NAV.logo} className="flex items-center gap-2" aria-label="The Travelling Tutor X — home">
          <SignatureLogo size="sm" />
        </Link>

        <nav ref={navRef} className="hidden xl:flex items-center gap-7" aria-label="Main">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <Dropdown
                key={item.label}
                item={item}
                active={isActiveItem(item, pathname)}
                open={openMenu === item.label}
                onOpen={() => setOpenMenu(item.label)}
                onClose={() => setOpenMenu((m) => (m === item.label ? null : m))}
              />
            ) : (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === "/"}
                data-testid={`nav-${slug(item.label)}`}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors whitespace-nowrap py-2 ${
                    isActive ? "text-brand-maroon" : "text-brand-ink hover:text-brand-maroon"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            data-testid={NAV.bookCta}
            asChild
            className="hidden sm:inline-flex bg-brand-maroon hover:bg-brand-maroonDeep text-white rounded-full px-6 h-11 shadow-soft font-semibold"
          >
            <Link to={GET_STARTED.to}>{GET_STARTED.label} <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
          </Button>
          <button
            data-testid={NAV.mobileToggle}
            onClick={() => setMobileOpen((s) => !s)}
            className="xl:hidden p-2.5 rounded-full bg-brand-maroonSoft text-brand-maroon"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden border-t border-border/60 bg-background max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container-px max-w-7xl mx-auto py-4 flex flex-col" aria-label="Mobile">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-border/50">
                  <button
                    type="button"
                    onClick={() => setMobileSection((s) => (s === item.label ? null : item.label))}
                    aria-expanded={mobileSection === item.label}
                    className="w-full flex items-center justify-between py-4 px-2 font-semibold text-brand-ink"
                  >
                    {item.label}
                    <ChevronDown className={`w-5 h-5 text-brand-maroon transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`} />
                  </button>
                  {mobileSection === item.label && (
                    <div className="pb-3 pl-2 flex flex-col">
                      {item.children.map((c) => (
                        <Link key={c.to} to={c.to} className="py-2.5 px-3 rounded-xl text-brand-ink/85 hover:bg-brand-cream">
                          {c.label}
                        </Link>
                      ))}
                      <Link to={item.to} className="py-2.5 px-3 rounded-xl text-brand-maroon font-medium">
                        View all {item.label.toLowerCase()} →
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `py-4 px-2 font-semibold border-b border-border/50 ${isActive ? "text-brand-maroon" : "text-brand-ink"}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <Button asChild className="mt-5 bg-brand-maroon hover:bg-brand-maroonDeep text-white rounded-full h-12 font-semibold">
              <Link to={GET_STARTED.to}>{GET_STARTED.label}</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
