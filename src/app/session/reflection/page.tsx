"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { SessionHeader } from "@/components/SessionHeader";
import { ReflectionTextArea } from "@/components/ReflectionTextArea";

export default function SessionReflectionPage() {
  const router = useRouter();
  const [reflectionText, setReflectionText] = useState("");

  const handleNotesClick = () => {
    alert("Notes drawer opened");
  };

  const handleFinish = () => {
    alert(`Reflection complete! Text: "${reflectionText}"`);
    // Redirect to complete page
    router.push("/session/complete");
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed antialiased">
      {/* Session Top Bar Header */}
      <SessionHeader
        step={4}
        totalSteps={4}
        onNotesClick={handleNotesClick}
      />

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col w-full max-w-[768px] mx-auto px-margin-main pt-24 pb-stack-lg relative z-10">
        {/* Header Section with entrance animation */}
        <div
          className="mb-stack-lg animate-fade-in-up"
          style={{
            animation: "fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards",
          }}
        >
          <h2 className="font-headline-xl text-headline-xl text-primary mb-stack-sm tracking-tight">
            สะท้อนความคิด (Reflect)
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg leading-relaxed">
            มี decision ไหนบ้างที่คุณตัดสินใจด้วยตัวเองในวันนี้ แบบ purely your own?
          </p>
        </div>

        {/* Dynamic Writing Area */}
        <ReflectionTextArea
          value={reflectionText}
          onChange={setReflectionText}
        />

        {/* Footer Actions Section with delayed entrance animation */}
        <div
          className="mt-stack-lg flex flex-col items-center gap-stack-md animate-fade-in-up"
          style={{
            animation: "fadeInUp 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s forwards",
            opacity: 0,
          }}
        >
          <p className="font-body-md text-body-md text-on-surface-variant text-center opacity-70 italic tracking-wide">
            ไม่มีคำตอบที่ผิดหรอกนะ มีเพียงแค่ความคิดของคุณเท่านั้น
          </p>

          <button
            onClick={handleFinish}
            className="w-full sm:w-auto min-w-[240px] bg-primary hover:bg-primary-container text-on-primary hover:text-on-primary-container py-4 px-8 rounded-full font-label-md text-label-md cursor-pointer active:scale-95 transition-all duration-300 shadow-[0_4px_20px_rgba(45,75,67,0.15)] hover:shadow-[0_8px_25px_rgba(45,75,67,0.25)] flex items-center justify-center gap-2 group focus:outline-none"
          >
            เสร็จสิ้น Session
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 stroke-[1.5]" />
          </button>
        </div>
      </main>
    </div>
  );
}
