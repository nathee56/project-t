import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface SessionNavigationProps {
  onBack: () => void;
  onNext: () => void;
  disableNext?: boolean;
}

export function SessionNavigation({
  onBack,
  onNext,
  disableNext = false,
}: SessionNavigationProps) {
  return (
    <nav className="flex justify-between items-center mt-1 py-2 w-full">
      <button
        onClick={onBack}
        className="text-on-surface-variant hover:text-on-surface text-sm flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-surface transition-colors focus:outline-none cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 stroke-[1.5]" />
        Back
      </button>

      <button
        onClick={onNext}
        disabled={disableNext}
        className={`bg-primary text-on-primary text-sm flex items-center gap-1.5 px-5 py-2.5 rounded-full hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-all shadow-sm focus:outline-none cursor-pointer ${
          disableNext ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
        <ArrowRight className="w-4 h-4 stroke-[1.5]" />
      </button>
    </nav>
  );
}
