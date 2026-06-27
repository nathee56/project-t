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
    <nav className="flex justify-between items-center mt-auto py-stack-md w-full">
      <button
        onClick={onBack}
        className="text-on-surface-variant hover:text-on-surface font-label-md text-label-md flex items-center gap-2 px-4 py-2 rounded-full hover:bg-surface transition-colors focus:outline-none cursor-pointer"
      >
        <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
        Back
      </button>

      <button
        onClick={onNext}
        disabled={disableNext}
        className={`bg-primary text-on-primary font-label-md text-label-md flex items-center gap-2 px-6 py-3 rounded-full hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-all shadow-sm focus:outline-none cursor-pointer ${
          disableNext ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next
        <ArrowRight className="w-5 h-5 stroke-[1.5]" />
      </button>
    </nav>
  );
}
