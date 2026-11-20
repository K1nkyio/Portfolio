import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { site } from "../data";
import SocialLinks from "./SocialLinks";

const items = [["work", "Work"], ["path", "Path"], ["skills", "Skills"], ["contact", "Contact"]] as const;
const initials = site.name.split(" ").map((w) => w[0]).join("");

function Tape() {
  const [active, setActive] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const tops = () => items.map(([id]) => { const el = document.getElementById(id); return el ? el.getBoundingClientRect().top + window.scrollY : 0; });
    const spy = () => {
      const y = window.scrollY + window.innerHeight * 0.35;
      let a = -1; tops().forEach((t, i) => { if (t <= y) a = i; });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) a = items.length - 1;
      setActive(a);
    };
    spy();
    const ro = new ResizeObserver(spy);
    ro.observe(document.body);
    window.addEventListener("scroll", spy, { passive: true });
    return () => { ro.disconnect(); window.removeEventListener("scroll", spy); };
  }, []);

  return (
    <nav aria-label="Main" className="flex flex-col gap-2 rounded-2xl border-2 border-ink bg-paper/95 p-2 shadow-[5px_5px_0_var(--color-ink)] backdrop-blur lg:flex-row lg:items-center lg:gap-3 lg:p-2.5">
      <div className="flex items-center justify-between gap-2 sm:shrink-0">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className="rounded-xl bg-ink px-4 py-2 font-display text-base text-ground sm:text-lg">
          <span className="hidden lg:inline">{site.name}</span><span className="lg:hidden">{initials}</span>
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <a href={site.cv} className="flex min-h-11 shrink-0 items-center rounded-xl bg-pink px-4 font-bold text-white hover:brightness-110">CV</a>
          <button type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)} className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border-2 border-ink bg-ground" aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>
      <div id="mobile-navigation" className={`${menuOpen ? "flex" : "hidden"} w-full min-w-0 flex-col gap-1 border-t-2 border-ink/15 pt-2 lg:flex lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-1 lg:border-0 lg:pt-0`}>
        {items.map(([id, label], i) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} aria-current={active === i ? "location" : undefined}
            className={`flex min-h-11 w-full items-center rounded-xl px-4 text-sm font-bold transition-colors lg:min-h-12 lg:w-auto lg:flex-none lg:justify-center lg:px-3 lg:text-sm xl:px-4 xl:text-base ${active === i ? "bg-pink text-white" : "hover:bg-ground"}`}>{label}</a>
        ))}
      </div>
      <a href={site.cv} className="hidden shrink-0 items-center rounded-xl bg-pink px-5 py-3 font-bold text-white hover:brightness-110 lg:flex">Download CV</a>
    </nav>
  );
}

export default function Layout() {
  return (
    <>
      {/* the page is one printed cloth: a border on every edge */}
      <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-40 h-3 pindo" />
      <div aria-hidden className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-3 pindo" />
      <div aria-hidden className="pointer-events-none fixed inset-y-0 left-0 z-40 w-3 pindo" />
      <div aria-hidden className="pointer-events-none fixed inset-y-0 right-0 z-40 w-3 pindo" />
      <header className="sticky top-0 z-30 mx-auto w-full max-w-6xl px-4 pb-3 pt-4 sm:px-6"><Tape /></header>
      <main><Outlet /></main>
      <footer className="mx-auto mt-24 max-w-6xl px-6 pb-12 text-[16px]">
        <div className="pindo h-3" />
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} {site.name}. Made in {site.location} with React, Vite, Tailwind and Framer Motion.</p>
          <div className="flex items-center gap-4">
            <SocialLinks />
            <a href={`mailto:${site.email}`} aria-label="Email Nicholas" title="Email" className="rounded-full border border-ink p-2 hover:bg-paper"><svg aria-hidden="true" viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a>
          </div>
        </div>
      </footer>
    </>
  );
}
