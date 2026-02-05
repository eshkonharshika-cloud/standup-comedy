"use client";

import React from 'react';
import {
    Linkedin,
    Youtube,
    Instagram,
    ChevronUp
} from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        "What we offer": [
            "ARGUS Intelligence", "ARGUS Enterprise", "ARGUS EstateMaster",
            "Forbury", "Reonomy", "Finance Active", "View all solutions"
        ],
        "Resources": [
            "Articles", "CRE Exchange podcast", "Webinars", "US CRE This Week"
        ],
        "Company": [
            "About us", "Careers", "Offices", "Contact us"
        ],
        "Customer support": [
            "Access Knowledge Base", "Submit a support ticket", "Live chat with support",
            "Software downloads and guides", "Getting started with ARGUS Intelligence",
            "Getting started with Forbury"
        ]
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-[#000421] text-white pt-16 pb-8 px-6 md:px-12 font-sans relative">
            <div className="max-w-7xl mx-auto">

                {/* Top Section: Logo and Socials */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
                    <div className="flex items-center gap-2">
                        {/* Replace with actual SVG or Image path */}
                        <div className="w-8 h-8 bg-white clip-path-triangle" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                        <span className="text-2xl font-bold tracking-tight">AltusGroup</span>
                    </div>

                    <div className="flex gap-4">
                        {[
                            { Icon: Linkedin, label: "LinkedIn" },
                            { Icon: Youtube, label: "YouTube" },
                            { Icon: "X", label: "X (formerly Twitter)" },
                            { Icon: "f", label: "Facebook" },
                            { Icon: Instagram, label: "Instagram" }
                        ].map(({ Icon, label }, index) => (
                            <a
                                key={index}
                                href="#"
                                aria-label={label}
                                className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#000421] hover:bg-gray-200 transition-colors"
                            >
                                {typeof Icon === 'string' ? <span className="font-bold text-lg">{Icon}</span> : <Icon size={20} />}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h3 className="font-bold text-sm mb-6 uppercase tracking-wider">{title}</h3>
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <hr className="border-gray-700 mb-8" />

                {/* Legal Links Section */}
                <div className="flex flex-wrap gap-6 mb-12">
                    {["Trust Center", "Cookie Policy", "Privacy Policy", "Legal", "Accessibility"].map((item) => (
                        <a key={item} href="#" className="text-sm font-semibold hover:underline">
                            {item}
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="bg-white text-[#000421] py-4 px-6 md:px-12 -mx-6 md:-mx-12 flex justify-between items-center">
                <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
                    <p className="text-sm">Copyright © {currentYear} Altus Group Limited. All rights reserved.</p>

                    <button
                        onClick={scrollToTop}
                        className="bg-[#0022FF] p-3 rounded-full text-white hover:bg-blue-700 transition-all shadow-lg"
                        aria-label="Scroll to top"
                    >
                        <ChevronUp aria-hidden="true" size={24} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;