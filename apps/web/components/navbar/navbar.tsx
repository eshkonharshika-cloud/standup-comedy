"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState<string>(
    typeof window !== "undefined" ? window.location.hash : ""
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash);
    window.addEventListener("popstate", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  const linkStyle = (path: string) => {
    if (path.startsWith("/#")) {
      const anchor = path.slice(1);
      return `block py-3 transition-colors hover:text-[#FF6B01] ${
        pathname === "/" && hash === anchor
          ? "text-[#FF6B01]"
          : "text-white/90"
      }`;
    }

    return `block py-3 transition-colors hover:text-[#FF6B01] ${
      pathname === path ? "text-[#FF6B01]" : "text-white/90"
    }`;
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 px-6 py-4 bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-black text-2xl uppercase tracking-tighter text-white"
        >
          MicDrop<span className="text-[#FF6B01]">INDIA</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em]">
          <Link href="/" className={linkStyle("/")}>Home</Link>
          <Link href="/comedians" className={linkStyle("/comedians")}>Comedians</Link>
          <Link href="/#history" className={linkStyle("/#history")}>History</Link>
          <Link href="/#herosection" className={linkStyle("/#herosection")}>Hero</Link>
          <Link href="/blog" className={linkStyle("/blog")}>Blog</Link>
        </div>

        {/* CTA (desktop) */}
        <Link
          href="/search"
          className="hidden md:inline-block px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white border border-white rounded-md hover:bg-[#FF6B01] hover:border-[#FF6B01] transition-all"
        >
          Find Laughter
        </Link>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-6 border-t border-white/10 pt-4 text-sm font-bold uppercase tracking-widest">
          <Link href="/" onClick={() => setOpen(false)} className={linkStyle("/")}>Home</Link>
          <Link href="/#comic" onClick={() => setOpen(false)} className={linkStyle("/#comic")}>Comedians</Link>
          <Link href="/#history" onClick={() => setOpen(false)} className={linkStyle("/#history")}>History</Link>
          <Link href="/#herosection" onClick={() => setOpen(false)} className={linkStyle("/#herosection")}>Hero</Link>
          <Link href="/blog" onClick={() => setOpen(false)} className={linkStyle("/blog")}>Blog</Link>

          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block w-full text-center px-6 py-3 text-xs font-black uppercase tracking-widest text-white border border-white rounded-md hover:bg-[#FF6B01] hover:border-[#FF6B01]"
          >
            Find Laughter
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
