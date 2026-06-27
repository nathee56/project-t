import React from "react";
import { Flame } from "lucide-react";
import { Card } from "./Card";
import { StreakInfo } from "../types";

interface StreakCardProps {
  streak: StreakInfo;
}

export function StreakCard({ streak }: StreakCardProps) {
  return (
    <Card className="rounded-xl p-5 flex flex-col justify-between h-[160px]">
      <div className="flex items-center gap-2 text-secondary">
        <Flame className="w-5 h-5 stroke-[1.5]" />
        <span className="font-label-md text-label-md uppercase tracking-wider">
          Streak
        </span>
      </div>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="font-headline-xl text-headline-xl text-on-surface">
            {streak.count}
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant">
            {streak.unit}
          </span>
        </div>
        <p className="font-label-md text-label-md text-on-surface-variant mt-1">
          {streak.message}
        </p>
      </div>
    </Card>
  );
}
