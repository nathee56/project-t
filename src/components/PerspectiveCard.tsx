import React from "react";
import { Brain } from "lucide-react";

interface PerspectiveCardProps {
  questionsCount: number;
}

export function PerspectiveCard({ questionsCount }: PerspectiveCardProps) {
  return (
    <article className="bg-surface-container-low rounded-xl p-6 shadow-[0_4px_20px_rgba(45,75,67,0.03)] flex items-start gap-5">
      <div className="bg-primary-fixed rounded-full p-3 flex-shrink-0 flex items-center justify-center">
        <Brain className="w-6 h-6 text-on-primary-fixed stroke-[1.5]" />
      </div>
      <div className="flex flex-col gap-1">
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          <span className="text-on-surface font-medium">
            คุณได้ explore ไปแล้ว {questionsCount} คำถาม
          </span>{" "}
          perspective ของคุณกำลังเติบโตอย่างงดงาม
        </p>
      </div>
    </article>
  );
}
