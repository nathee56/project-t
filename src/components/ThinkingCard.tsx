import React from "react";

interface ThinkingCardProps {
  prompt: string;
}

export function ThinkingCard({ prompt }: ThinkingCardProps) {
  return (
    <article className="bg-surface rounded-2xl p-4 shadow-[0_4px_20px_rgba(45,75,67,0.05)] border border-outline-variant/30 mb-3 relative overflow-hidden flex flex-col justify-center min-h-[160px]">
      {/* Decorative blurred background accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary-fixed opacity-20 rounded-bl-full blur-2xl pointer-events-none" />

      <h2 className="text-base font-medium text-on-surface relative z-10 leading-relaxed max-w-sm mx-auto text-center">
        {prompt}
      </h2>
    </article>
  );
}
