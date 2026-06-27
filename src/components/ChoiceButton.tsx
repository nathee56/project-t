import React from "react";

interface ChoiceButtonProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

export function ChoiceButton({ text, selected, onClick }: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border active:scale-[0.98] transition-all duration-200 flex items-center gap-4 group cursor-pointer ${
        selected
          ? "border-primary bg-surface-container-high"
          : "border-outline-variant bg-surface hover:bg-surface-container-high"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
          selected
            ? "border-primary"
            : "border-outline group-hover:border-primary"
        }`}
      >
        <span
          className={`w-2 h-2 rounded-full bg-primary transition-opacity duration-200 ${
            selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        />
      </div>

      <span
        className={`font-body-md text-body-md transition-colors ${
          selected
            ? "text-on-surface font-medium"
            : "text-on-surface-variant group-hover:text-on-surface"
        }`}
      >
        {text}
      </span>
    </button>
  );
}
