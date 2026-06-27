"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";
import { ThreeAnimation } from "@/components/ThreeAnimation";
import { CompletionStreakCard } from "@/components/CompletionStreakCard";
import { PerspectiveCard } from "@/components/PerspectiveCard";

export default function SessionCompletePage() {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <div className="bg-surface min-h-screen w-full flex flex-col font-body-md text-body-md text-on-surface antialiased overflow-x-hidden">
      <div className="max-w-[768px] mx-auto w-full flex flex-col relative pb-[120px] min-h-screen">
        {/* 3D Animation Header */}
        <div className="w-full h-[397px] relative overflow-hidden bg-surface-container-low">
          <ThreeAnimation />
          {/* Soft gradient fade into content */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-surface to-transparent pointer-events-none"></div>
        </div>

        {/* Main Content Canvas */}
        <main className="px-margin-main flex flex-col gap-stack-lg relative z-10 -mt-12">
          {/* Headline */}
          <header className="text-center px-4">
            <h1 className="font-headline-xl text-headline-xl text-on-surface mb-2">
              ทำ session เสร็จสิ้นสมบูรณ์แล้ว
            </h1>
          </header>

          {/* Encouragement Cards (Bento-style layout) */}
          <section className="flex flex-col gap-gutter-card">
            <CompletionStreakCard days={5} message="รักษาความสม่ำเสมอของคุณต่อไป" />
            <PerspectiveCard questionsCount={67} />
          </section>

          {/* Human Anchor / Sign-off */}
          <div className="text-center mt-4">
            <p className="font-body-lg text-body-lg text-secondary opacity-90">
              แล้วพบกันใหม่พรุ่งนี้เช้านะ
            </p>
          </div>
        </main>

        {/* Fixed Bottom Action Area */}
        <div className="fixed bottom-0 left-0 w-full z-50 pointer-events-none">
          {/* Tonal shift background for the button area */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface to-transparent"></div>
          <div className="relative w-full max-w-[768px] mx-auto px-margin-main pb-8 pt-12 flex justify-center pointer-events-auto">
            <button
              onClick={handleHome}
              className="w-full bg-primary text-on-primary rounded-full py-4 px-8 font-label-md text-label-md flex justify-center items-center gap-2 shadow-[0_4px_20px_rgba(22,52,45,0.15)] hover:bg-primary-container hover:text-on-primary-container active:scale-95 transition-all duration-300 cursor-pointer focus:outline-none"
            >
              <Home className="w-5 h-5 stroke-[1.5]" />
              กลับหน้าแรก (Return Home)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
