"use client";

import React from "react";
import { Search, Globe, HelpCircle, UserCircle2 } from "lucide-react";

export default function TopNavbar() {
  return (
    <div className="w-full bg-[#000421] text-white border-b border-white/10">
      <div className="max-w-[1440px] mx-auto flex items-center justify-end h-12 px-6 gap-9">

        {/* Search Icon */}
        <button className="hover:text-blue-400 transition-colors" aria-label="Search">
          <Search size={18} strokeWidth={2.5} />
        </button>

        {/* Language Selector */}
        <button className="flex items-center gap-2.5 hover:text-blue-400 transition-colors group">
          <Globe size={18} strokeWidth={2} />
          <span className="text-[15px] font-bold tracking-tight">EN</span>
        </button>

        {/* Contact Support */}
        <button className="flex items-center gap-2.5 hover:text-blue-400 transition-colors group">
          <HelpCircle size={18} strokeWidth={2} />
          <span className="text-[15px] font-bold tracking-tight">Contact Support</span>
        </button>

        {/* Login */}
        <button className="flex items-center gap-2.5 hover:text-blue-400 transition-colors group">
          <UserCircle2 size={18} strokeWidth={2} />
          <span className="text-[15px] font-bold tracking-tight">Login</span>
        </button>

      </div>
    </div>
  );
}