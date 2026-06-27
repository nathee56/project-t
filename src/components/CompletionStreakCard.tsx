import React from "react";
import { Flame } from "lucide-react";
import { Card } from "./Card";

interface CompletionStreakCardProps {
  days: number;
  message: string;
}

export function CompletionStreakCard({ days, message }: CompletionStreakCardProps) {
  return (
    <Card className="rounded-xl p-6 flex items-start gap-5 transform transition-all hover:-translate-y-1 duration-300">
      <div className="bg-secondary-fixed rounded-full p-3 flex-shrink-0 flex items-center justify-center">
        <Flame className="w-6 h-6 text-on-secondary-fixed stroke-[1.5]" />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
          {days} Day Streak
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          {message}
        </p>
      </div>
    </Card>
  );
}
