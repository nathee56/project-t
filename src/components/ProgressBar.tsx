import React from "react";

interface ProgressBarProps {
  progress: number; // Percentage (0 to 100)
}

export function ProgressBar({ progress }: ProgressBarProps) {
  // Ensure progress is bounded between 0 and 100
  const widthPercentage = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className="fixed top-[72px] left-1/2 -translate-x-1/2 w-full h-1 bg-surface-container-highest max-w-[768px] z-50"
      role="progressbar"
      aria-valuenow={widthPercentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full bg-primary rounded-r-full transition-all duration-500 ease-out"
        style={{ width: `${widthPercentage}%` }}
      />
    </div>
  );
}
