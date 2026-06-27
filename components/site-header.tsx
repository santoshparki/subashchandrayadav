"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = ["About", "Expertise", "Projects", "Experience", "Education", "Contact"];

export function SiteHeader({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function update() {
      setScrolled(window.scrollY > 16);
    }
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b text-white backdrop-blur-xl transition-all duration-500 ${scrolled ? "border-copper/20 bg-ink/92 shadow-[0_18px_60px_rgba(0,0,0,.22)]" : "border-white/10 bg-ink/82"}`}>
      <div className={`container-shell flex items-center justify-between transition-[height] duration-500 ${scrolled ? "h-16" : "h-20"}`}>
        <a href="#home" className="flex items-center gap-3 font-bold tracking-tight">
          <span className="grid size-10 place-items-center border border-copper/60 bg-white/[.02] text-sm text-copper shadow-[inset_0_0_24px_rgba(180,122,69,.08)]">SC</span>
          <span className="hidden sm:block">{name}</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">{link}</a>)}
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="container-shell animate-fade-up grid gap-5 border-t border-white/10 bg-ink/95 py-6 lg:hidden">{links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-bold uppercase tracking-[.16em] text-white/70" onClick={() => setOpen(false)}>{link}</a>)}</nav>}
    </header>
  );
}
