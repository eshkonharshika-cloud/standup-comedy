"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const [hash, setHash] = useState<string>(typeof window !== "undefined" ? window.location.hash : "");

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || "");
    window.addEventListener("hashchange", onHash, false);
    window.addEventListener("popstate", onHash, false);
    return () => {
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("popstate", onHash);
    };
  }, []);

  // Helper function to style active links
  const linkStyle = (path: string) => {
    if (path.startsWith("/#")) {
      const anchor = path.slice(1); // '#blog'
      return `transition-colors hover:text-[#FF6B01] ${pathname === "/" && hash === anchor ? "text-[#FF6B01]" : "text-white/90"}`;
    }

    return `transition-colors hover:text-[#FF6B01] ${pathname === path ? "text-[#FF6B01]" : "text-white/90"}`;
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 flex items-center justify-between px-10 py-4 bg-black/30 backdrop-blur-lg border border-white/10 rounded-xl shadow-2xl">
      
      {/* Brand Logo - Links to Home */}
      <Link href="/" className="font-black text-2xl uppercase tracking-tighter text-white">
        MicDrop<span className="text-[#FF6B01]">INDIA</span>
      </Link>

      {/* Navigation Links - Pointing to separate files/routes */}
      <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em]">
        <Link href="/" className={linkStyle("/")}>
          Home
        </Link>
        <Link href="/#comics" className={linkStyle("/#comics")}>
          Comedians
        </Link>
        <Link href="/#history" className={linkStyle("/#history")}>
          History
        </Link>
        <Link href="/#herosection" className={linkStyle("/#herosection")}>
          Herosection
        </Link>
        <Link href="/blog" className={linkStyle("/blog")}>
          Blog
        </Link>
      </div>

      {/* Call to Action - Route to a Search or Contact page */}
      <Link
        href="/search"
        className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-white border border-white rounded-md hover:bg-[#FF6B01] hover:border-[#FF6B01] transition-all duration-300"
      >
        Find Laughter
      </Link>
    </nav>
  );
}

export default Navbar;