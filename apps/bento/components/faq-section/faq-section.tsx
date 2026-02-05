"use client";

import { useState } from "react";
import type { FaqSectionAggregate } from "@standup/contracts/argus/faq";
import { Plus, Minus } from "lucide-react";

interface Props {
  data: FaqSectionAggregate;
}

export function FaqStatsSection({ data }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-24 text-gray-900">
      <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

        {/* LEFT — STATS */}
        <div className="flex flex-col gap-6">
          {data.stats.map((stat, index) => (
            <div
              key={stat.id}
              className={`
                rounded-2xl p-8 border
                ${index === data.stats.length - 1
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "bg-gray-50 border-gray-200"}
              `}
            >
              <div className="text-3xl font-bold mb-3">
                {stat.value}
              </div>

              <p
                className={`text-sm leading-relaxed ${index === data.stats.length - 1
                    ? "text-white/90"
                    : "text-gray-600"
                  }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT — FAQ */}
        <div>
          <h2 className="text-4xl font-extrabold mb-10 leading-tight text-gray-900">
            {data.title}
          </h2>

          <div className="space-y-6">
            {data.faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.id}
                  className="border-b border-gray-200 pb-6"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </span>

                    {isOpen ? (
                      <Minus className="shrink-0 text-gray-700" />
                    ) : (
                      <Plus className="shrink-0 text-gray-700" />
                    )}
                  </button>

                  {isOpen && (
                    <p
                      id={`faq-answer-${index}`}
                      className="mt-4 text-gray-600 leading-relaxed"
                    >
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

export default FaqStatsSection;
