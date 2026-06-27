import React from "react";
import { LineChart } from "lucide-react";
import { Card } from "./Card";
import { JourneyMetric } from "../types";

interface JourneyCardProps {
  metrics: JourneyMetric[];
}

export function JourneyCard({ metrics }: JourneyCardProps) {
  return (
    <Card className="rounded-xl p-6">
      <div className="flex items-center gap-2 text-on-surface mb-6">
        <LineChart className="w-5 h-5 stroke-[1.5]" />
        <h3 className="font-label-md text-label-md uppercase tracking-wider">
          เส้นทางการเติบโต (Your Journey)
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {metrics.map((metric, idx) => {
          const isLast = idx === metrics.length - 1;
          return (
            <div
              key={idx}
              className={`flex justify-between items-center ${
                isLast ? "" : "border-b border-surface-container pb-4"
              }`}
            >
              <span className="font-body-md text-body-md text-on-surface-variant">
                {metric.label}
              </span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                {metric.value}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
