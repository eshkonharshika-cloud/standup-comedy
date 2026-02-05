"use client";

import React, { useState, useEffect } from "react";

const navItems = [
  { name: "Overview", id: "hero" },
  { name: "Features", id: "bento" },
  { name: "Experience", id: "feature-video" },
  { name: "Discover", id: "discover" },
  { name: "Testimonial", id: "testimonials" },
  { name: "FAQ", id: "faq" },
  { name: "Options", id: "capabilities" }
];

export default function SubNavbar() {
  const [activeTab, setActiveTab] = useState("hero");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const offset = 88;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
    setActiveTab(id);
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 120;
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        if (
          scrollPos >= el.offsetTop &&
          scrollPos < el.offsetTop + el.offsetHeight
        ) {
          setActiveTab(item.id);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="sticky top-0 z-[100] w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar py-3">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`
                  relative whitespace-nowrap pb-2 text-xs md:text-sm font-semibold
                  transition-colors
                  ${isActive
                    ? "text-neutral-900"
                    : "text-neutral-700 hover:text-neutral-900"
                  }
                `}
              >
                {item.name}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-neutral-900" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  );
}
