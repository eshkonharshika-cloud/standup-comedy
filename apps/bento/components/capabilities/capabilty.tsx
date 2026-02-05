import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CapabilityCardProps {
  item: {
    id: string;
    title: string;
    description: string;
    cta: {
      label: string;
      href: string;
    };
  };
}

export function CapabilityCard({ item }: CapabilityCardProps) {
  return (
    <div
      className="
        relative flex-shrink-0 w-[360px] h-[220px]
        bg-[#111A2E] rounded-[32px] p-8
        border border-white/10
        overflow-hidden group
      "
    >
      {/* glow */}
      <div
        className="
          absolute -top-24 -right-24 w-72 h-72
          bg-[#5B4BFF]/10 blur-[120px]
          group-hover:bg-[#5B4BFF]/20
          transition-all
        "
      />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-4">
            {item.title}
          </h3>

          <p className="text-white/70 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        {item.cta && (
          <Link
            href={item.cta.href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#5B4BFF]"
          >
            {item.cta.label}
            <ArrowUpRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
