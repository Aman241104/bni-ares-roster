"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About Ares" },
  { href: "/members", label: "Members" },
  { href: "/coordinators", label: "Chapter Excellence" },
  { href: "/visitor", label: "Visit Ares" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 glass-dark ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex flex-col">
          <span className="font-heading text-xl font-bold tracking-tight text-white">
            BNI <span className="text-red-400">Ares</span>
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
            Givers Gain®
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-red-400 ${
                pathname === link.href ? "text-red-400" : "text-zinc-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/visitor"
            className="rounded-full bg-brand-500 px-7 py-3.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-brand-600"
          >
            VISIT A MEETING
          </Link>
        </div>

        <button
          className="rounded-full p-2 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <div className="glass-dark border-t border-white/10 lg:hidden">
          <div className="flex flex-col gap-1 px-5 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium ${
                  pathname === link.href ? "bg-white/10 text-red-400" : "text-zinc-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
