"use client";

import { useState } from "react";
import type { Quote } from "@standup/contracts/quote";
import { QuoteIntro } from "@/components/intro/QuoteIntro";

interface HomeClientProps {
  quote: Quote;
}

export function HomeClient({ quote }: HomeClientProps) {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro && (
        <QuoteIntro
          quote={quote}
          onFinish={() => setShowIntro(false)}
        />
      )}

      {!showIntro && (
        <main>
          {/* Rest of your site */}
        </main>
      )}
    </>
  );
}
