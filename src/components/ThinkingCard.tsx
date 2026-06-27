import React from "react";

interface ThinkingCardProps {
  prompt: string;
}

export function ThinkingCard({ prompt }: ThinkingCardProps) {
  return (
    <article className="bg-surface rounded-3xl p-stack-md shadow-[0_4px_20px_rgba(45,75,67,0.05)] border border-outline-variant/30 mb-stack-lg relative overflow-hidden flex flex-col justify-center min-h-[280px]">
      {/* Decorative blurred background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-fixed opacity-20 rounded-bl-full blur-2xl pointer-events-none" />

      <h2 className="font-quote text-quote text-on-surface relative z-10 leading-relaxed max-w-sm mx-auto text-center">
        {prompt}
      </h2>
    </article>
  );
}
