"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SessionHeader } from "@/components/SessionHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { ThinkingCard } from "@/components/ThinkingCard";
import { ChoiceButton } from "@/components/ChoiceButton";
import { SessionNavigation } from "@/components/SessionNavigation";
import { SessionQuestion } from "@/types";

const mockQuestions: SessionQuestion[] = [
  {
    step: 1,
    totalSteps: 4,
    prompt: "Perspective ของคุณในเรื่อง productivity เปลี่ยนไปอย่างไรตั้งแต่เริ่มใช้ AI?",
    choices: [
      { id: "choice-1-1", text: "รู้สึกเหมือนได้มี superpowers เลย" },
      { id: "choice-1-2", text: "มีประโยชน์นะ แต่ฉันยังต้องคอยปรับตัวและเรียนรู้อยู่" },
      { id: "choice-1-3", text: "ยอมรับตามตรงนะ ว่ายังชอบทำงานในแบบของตัวเองมากกว่า" },
    ],
  },
  {
    step: 2,
    totalSteps: 4,
    prompt: "เมื่อเจอ complex problem ตัวแรกสุด instinct ของคุณคิดจะทำอะไร?",
    choices: [
      { id: "choice-2-1", text: "รีบถาม AI ทันทีเพื่อให้ได้คำตอบอย่างรวดเร็ว" },
      { id: "choice-2-2", text: "ขอคิดทบทวนด้วยตัวเองก่อนสักครู่" },
      { id: "choice-2-3", text: "ลองค้นหาข้อมูลหรือไปปรึกษาเพื่อนร่วมงานดูก่อน" },
    ],
  },
  {
    step: 3,
    totalSteps: 4,
    prompt: "คุณคิดยังไงกับเรื่อง balance ระหว่างการ thinking กับการ generating?",
    choices: [
      { id: "choice-3-1", text: "อยากเน้น thinking มากขึ้น ให้ AI ช่วย generate น้อยลง" },
      { id: "choice-3-2", text: "อยากให้ AI ช่วย generate มากขึ้น จะได้ไม่ต้องเหนื่อยเขียนเอง" },
      { id: "choice-3-3", text: "อยาก co-create คู่ไปกับ AI ในฐานะ thinking partner" },
    ],
  },
];

export default function SessionPage() {
  const router = useRouter();
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  
  // Track selections by step index (0, 1, 2)
  const [selections, setSelections] = useState<Record<number, string>>({});

  const currentQuestion = mockQuestions[currentStepIdx];
  const selectedChoiceId = selections[currentStepIdx] || null;

  const handleChoiceSelect = (choiceId: string) => {
    setSelections((prev) => ({
      ...prev,
      [currentStepIdx]: choiceId,
    }));
  };

  const handleBack = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    } else {
      router.push("/");
    }
  };

  const handleNext = () => {
    if (!selectedChoiceId) return;

    if (currentStepIdx < mockQuestions.length - 1) {
      setCurrentStepIdx(currentStepIdx + 1);
    } else {
      // Step 4 is the Reflection page
      router.push("/session/reflection");
    }
  };

  const progressPercentage = (currentQuestion.step / currentQuestion.totalSteps) * 100;

  return (
    <div className="bg-surface-container-low min-h-screen text-on-surface antialiased flex flex-col selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Session Top Bar Header */}
      <SessionHeader
        step={currentQuestion.step}
        totalSteps={currentQuestion.totalSteps}
        onNotesClick={() => alert("Notes drawer opened")}
      />

      {/* Progress Bar */}
      <ProgressBar progress={progressPercentage} />

      {/* Main Content Area */}
      <main className="flex-grow px-4 pt-20 pb-4 max-w-[768px] mx-auto w-full flex flex-col">
        {/* Thinking Card */}
        <ThinkingCard prompt={currentQuestion.prompt} />

        {/* Conversational Choices */}
        <div className="flex flex-col gap-2 w-full mt-3 mb-2">
          {currentQuestion.choices.map((choice) => (
            <ChoiceButton
              key={choice.id}
              text={choice.text}
              selected={selectedChoiceId === choice.id}
              onClick={() => handleChoiceSelect(choice.id)}
            />
          ))}
        </div>

        {/* Navigation Actions */}
        <SessionNavigation
          onBack={handleBack}
          onNext={handleNext}
          disableNext={!selectedChoiceId}
        />
      </main>
    </div>
  );
}
