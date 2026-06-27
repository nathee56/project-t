"use client";

import React, { useEffect, useRef } from "react";

interface ReflectionTextAreaProps {
  value: string;
  onChange: (value: string) => void;
}

export function ReflectionTextArea({ value, onChange }: ReflectionTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Delay focus slightly to align with the entrance animation
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex-1 flex flex-col relative bg-surface-warm rounded-xl shadow-[0_4px_40px_rgba(45,75,67,0.03)] border border-outline-variant/30 p-stack-md sm:p-stack-lg transition-shadow duration-500 hover:shadow-[0_8px_50px_rgba(45,75,67,0.06)]"
      style={{
        animation: "fadeInUp 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.1s forwards",
        opacity: 0,
      }}
    >
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Reflection text area"
        className="w-full flex-1 bg-transparent border-none p-0 m-0 font-quote text-quote text-thought-ink placeholder:text-outline-variant/70 resize-none focus:ring-0 leading-relaxed selection:bg-secondary-fixed selection:text-on-secondary-fixed focus:outline-none"
        id="reflection-input"
        placeholder="Start writing..."
        spellCheck="false"
      />

      {/* Subtle gradient overlay at the bottom of textarea to suggest depth */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-surface-warm to-transparent pointer-events-none rounded-b-xl" />
    </div>
  );
}
