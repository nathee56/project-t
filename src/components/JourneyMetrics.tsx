import React from "react";
import { Flame, Sprout, FileText } from "lucide-react";

interface JourneyMetricsProps {
  streakDays: number;
  sessionsCompleted: number;
  reflectionsWritten: number;
}

export function JourneyMetrics({
  streakDays,
  sessionsCompleted,
  reflectionsWritten,
}: JourneyMetricsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter-card auto-rows-[minmax(120px,auto)]">
      {/* Streak Card */}
      <div className="bg-secondary-fixed rounded-xl soft-shadow p-6 flex flex-col justify-between border border-secondary-fixed-dim/20">
        <Flame className="w-6 h-6 text-secondary opacity-70 mb-2 stroke-[1.5]" />
        <div>
          <h4 className="font-headline-xl text-headline-xl text-on-secondary-fixed">
            {streakDays} Days สะสม
          </h4>
          <p className="font-label-md text-label-md text-on-secondary-fixed-variant opacity-80">
            Current Streak ของคุณ
          </p>
        </div>
      </div>

      {/* Activity Card */}
      <div className="bg-surface rounded-xl soft-shadow p-6 flex flex-col justify-between border border-surface-variant md:row-span-2">
        <Sprout className="w-6 h-6 text-primary mb-4 stroke-[1.5]" />
        <div className="flex-grow flex flex-col justify-end">
          <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-primary mb-1">
            Completed ไปแล้ว {sessionsCompleted} Sessions
          </h4>
          <p className="font-body-md text-body-md text-on-surface-variant">
            ความพยายามที่ consistent จะช่วย build foundation ที่ดีให้แก่ mental clarity ของคุณ
          </p>
        </div>
      </div>

      {/* Reflections Card */}
      <div className="bg-primary-fixed rounded-xl soft-shadow p-6 flex flex-col justify-between border border-primary-fixed-dim/30">
        <FileText className="w-6 h-6 text-on-primary-fixed opacity-70 mb-2 stroke-[1.5]" />
        <div>
          <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary-fixed">
            เขียนไปแล้ว {reflectionsWritten} Reflections
          </h4>
          <p className="font-label-md text-label-md text-on-primary-fixed-variant opacity-80">
            Total entries ทั้งหมด
          </p>
        </div>
      </div>
    </section>
  );
}
