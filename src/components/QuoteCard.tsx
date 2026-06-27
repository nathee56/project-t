import React from "react";
import { QuoteInfo } from "../types";

interface QuoteCardProps {
  quote: QuoteInfo;
}

export function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <section className="mt-8 mb-4 px-4 py-8 border-l-2 border-primary/20 pl-6 ml-2">
      <blockquote className="font-quote text-quote text-thought-ink italic">
        &quot;{quote.text}&quot;
      </blockquote>
      <p className="font-label-md text-label-md text-on-surface-variant mt-4 uppercase tracking-widest">
        — {quote.author}
      </p>
    </section>
  );
}
