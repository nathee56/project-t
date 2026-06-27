import React from "react";
import Link from "next/link";
import { Timer, Brain, ArrowRight } from "lucide-react";
import { Card } from "./Card";
import { Button } from "./Button";

export function SessionCard() {
  return (
    <Card className="rounded-[24px] p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container opacity-10 rounded-full blur-3xl -mr-10 -mt-10"></div>

      <div className="flex flex-col gap-stack-lg relative z-10">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 font-label-md text-label-md text-primary bg-primary-fixed/30 px-3 py-1 rounded-full mb-3">
              <Timer className="w-4 h-4 stroke-[1.5]" />
              3 min
            </span>
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
              Thinking Session ของวันนี้
            </h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
            <Brain className="w-6 h-6 stroke-[1.5]" />
          </div>
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant max-w-[85%]">
          มา explore prompt ที่ออกแบบมาเพื่อช่วย clarify priorities ในแต่ละวันของคุณกัน
        </p>

        <Link href="/session" className="w-full">
          <Button variant="primary" className="group-hover:shadow-lg">
            เริ่ม Session
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 stroke-[1.5]" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
