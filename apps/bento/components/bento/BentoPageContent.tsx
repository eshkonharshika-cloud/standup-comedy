"use client";

import { useEffect, useState } from "react";
import type { BentoSection as BentoSectionType } from "@standup/contracts/bento";
import BentoSection from "@/components/bento/bento";

interface Props {
    cmsData: BentoSectionType;
}

export default function BentoPageContent({ cmsData }: Props) {
    const [data, setData] = useState<BentoSectionType>(cmsData);

    useEffect(() => {
        const saved = localStorage.getItem("bento-data");
        if (saved) {
            try {
                setData(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse local bento data", e);
            }
        }
    }, []);

    return (
        <>
            <BentoSection data={data} />

            {/* Floating Edit Button */}
            <a
                href="/editor"
                className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold shadow-2xl flex items-center gap-2 transition-all hover:scale-105 active:scale-95 border border-white/10"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
                Editor
            </a>
        </>
    );
}
