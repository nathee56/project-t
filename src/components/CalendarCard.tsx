import React from "react";
import { Calendar } from "lucide-react";
import { Card } from "./Card";
import { ActivityDay } from "../types";

interface CalendarCardProps {
  activity: ActivityDay[];
}

export function CalendarCard({ activity }: CalendarCardProps) {
  return (
    <Card className="rounded-xl p-5 flex flex-col justify-between h-[160px]">
      <div className="flex items-center justify-between text-outline">
        <span className="font-label-md text-label-md uppercase tracking-wider">
          กิจกรรม (Activity)
        </span>
        <Calendar className="w-[18px] h-[18px] stroke-[1.5]" />
      </div>

      <div className="grid grid-cols-7 gap-1.5 mt-2">
        {activity.map((day, idx) => {
          let colorClass = "bg-surface-container-highest";

          if (day.active) {
            if (day.today) {
              colorClass = "bg-primary shadow-[0_0_8px_rgba(22,52,45,0.4)]";
            } else if (day.dimmed) {
              colorClass = "bg-primary-fixed";
            } else {
              colorClass = "bg-primary";
            }
          }

          return (
            <div
              key={idx}
              className={`w-2.5 h-2.5 rounded-full mx-auto ${colorClass}`}
              aria-label={`Day ${idx + 1}: ${day.active ? (day.today ? "Active (Today)" : "Active") : "Inactive"}`}
            />
          );
        })}
      </div>

      <p className="font-label-md text-label-md text-on-surface-variant mt-2 text-right">
        สัปดาห์นี้
      </p>
    </Card>
  );
}
