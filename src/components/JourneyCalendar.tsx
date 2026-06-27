import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./Card";

interface CalendarDay {
  dayNumber: number;
  status: "normal" | "active" | "active-dot" | "current" | "future";
}

const mockOctDays: CalendarDay[] = [
  { dayNumber: 1, status: "normal" },
  { dayNumber: 2, status: "active" },
  { dayNumber: 3, status: "active" },
  { dayNumber: 4, status: "normal" },
  { dayNumber: 5, status: "normal" },
  { dayNumber: 6, status: "active-dot" },
  { dayNumber: 7, status: "active" },
  { dayNumber: 8, status: "active" },
  { dayNumber: 9, status: "active" },
  { dayNumber: 10, status: "current" },
  { dayNumber: 11, status: "normal" },
  { dayNumber: 12, status: "normal" },
  { dayNumber: 13, status: "future" },
  { dayNumber: 14, status: "future" },
  { dayNumber: 15, status: "future" },
];

export function JourneyCalendar() {
  return (
    <Card className="rounded-xl p-6 relative overflow-hidden flex flex-col gap-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-semibold">
          October
        </h3>
        <div className="flex gap-2">
          <ChevronLeft className="w-5 h-5 text-outline cursor-pointer hover:text-primary transition-colors stroke-[1.5]" />
          <ChevronRight className="w-5 h-5 text-outline cursor-pointer hover:text-primary transition-colors stroke-[1.5]" />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Days of week */}
        {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
          <div key={idx} className="font-label-md text-label-md text-on-surface-variant opacity-70">
            {day}
          </div>
        ))}

        {/* Empty slots for October alignment */}
        <div />
        <div />

        {/* Days cells */}
        {mockOctDays.map((day) => {
          let styleClass = "";

          if (day.status === "normal") {
            styleClass = "text-on-surface-variant";
          } else if (day.status === "active") {
            styleClass = "bg-success-soft text-primary";
          } else if (day.status === "active-dot") {
            styleClass = "bg-success-soft text-primary relative";
          } else if (day.status === "current") {
            styleClass = "bg-primary text-on-primary shadow-sm font-semibold";
          } else if (day.status === "future") {
            styleClass = "text-on-surface-variant opacity-40";
          }

          return (
            <div
              key={day.dayNumber}
              className={`h-10 w-10 flex items-center justify-center rounded-full font-body-md text-body-md mx-auto ${styleClass}`}
            >
              {day.dayNumber}
              {day.status === "active-dot" && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-secondary rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* Decorative atmospheric background blur */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary-fixed-dim rounded-full blur-[50px] opacity-20 pointer-events-none" />
    </Card>
  );
}
