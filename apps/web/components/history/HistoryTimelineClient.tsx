"use client";

import dynamic from 'next/dynamic';
import type { History } from "@standup/contracts";

const HistoryTimeline = dynamic(() => import('./history'), {
  ssr: false,
  loading: () => <div id="history" className="w-full py-24 px-6" />,
});

export default function HistoryTimelineClient({ entries }: { entries: History[] }) {
  return <HistoryTimeline entries={entries} />;
}
