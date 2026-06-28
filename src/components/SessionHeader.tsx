import React from "react";
import { AlignLeft } from "lucide-react";

interface SessionHeaderProps {
  step: number;
  totalSteps: number;
  onNotesClick?: () => void;
}

export function SessionHeader({
  step,
  totalSteps,
  onNotesClick,
}: SessionHeaderProps) {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] z-50 bg-surface/80 backdrop-blur-md border-b border-surface-variant/20 flex justify-between items-center px-margin-main py-2.5">
      <button
        onClick={onNotesClick}
        className="text-on-surface-variant dark:text-on-surface-variant hover:bg-surface-container-low dark:hover:bg-primary-container transition-all duration-300 cursor-pointer active:scale-95 p-1.5 rounded-full flex items-center justify-center"
        aria-label="View notes"
      >
        <AlignLeft className="w-5 h-5 stroke-[1.5]" />
      </button>

      <h1 className="text-sm font-semibold text-primary dark:text-primary-fixed-dim">
        Project Think
      </h1>

      <div className="text-on-surface-variant dark:text-on-surface-variant text-xs px-2.5 py-1 rounded-full bg-surface-container-highest">
        {step} of {totalSteps}
      </div>
    </header>
  );
}
