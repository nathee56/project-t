"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import { UserPreferencesService } from "@/services/userPreferences";

// ─── Data ─────────────────────────────────────────────────────────────────────

const INTERESTS = [
  "ตรรกะและเหตุผล",
  "ชีวิตประจำวัน",
  "ประวัติศาสตร์ไทย",
  "ประวัติศาสตร์โลก",
  "วิทยาศาสตร์",
  "เทคโนโลยี",
  "AI",
  "การเงิน",
  "จิตวิทยา",
  "สังคม",
  "สิ่งแวดล้อม",
  "สุขภาพ",
  "ศิลปะและวัฒนธรรม",
  "การสื่อสาร",
  "ภูมิศาสตร์",
  "พลเมืองและประชาธิปไตย",
];

const GOALS = [
  "การคิดวิเคราะห์",
  "การใช้เหตุผล",
  "การแก้ปัญหา",
  "การตัดสินใจ",
  "ความคิดสร้างสรรค์",
  "การสื่อสาร",
  "การมองหลายมุม",
  "การไตร่ตรอง",
];

const MOTIVATIONS = [
  "อยากลดการพึ่งพา AI",
  "อยากฝึกการคิดวิเคราะห์",
  "อยากเรียนรู้สิ่งใหม่ทุกวัน",
  "อยากพัฒนาตัวเอง",
  "อยากตัดสินใจได้ดีขึ้น",
  "อยากฝึกสมองให้คิดมากขึ้น",
  "แค่อยากลองใช้ Project Think",
];

// ─── Types ────────────────────────────────────────────────────────────────────

type StepNumber = 1 | 2 | 3 | 4 | 5;

// ─── Reusable sub-components ─────────────────────────────────────────────────

function ProgressDots({ current }: { current: number }) {
  // Shows dots for steps 2–4 (the "real" content steps)
  return (
    <div className="flex items-center gap-2" aria-label={`Step ${current - 1} of 3`}>
      {[2, 3, 4].map((s) => (
        <div
          key={s}
          className={`rounded-full transition-all duration-300 ${
            s === current
              ? "w-6 h-2 bg-primary"
              : s < current
              ? "w-2 h-2 bg-primary/40"
              : "w-2 h-2 bg-outline-variant"
          }`}
        />
      ))}
    </div>
  );
}

interface InterestChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function InterestChip({ label, selected, onClick }: InterestChipProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-95 cursor-pointer text-left ${
        selected
          ? "bg-primary-container border-primary text-on-primary-container shadow-sm"
          : "bg-surface border-outline-variant/60 text-on-surface-variant hover:border-primary/40 hover:bg-surface-container"
      }`}
    >
      {selected && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-on-primary stroke-[2.5]" />
        </span>
      )}
      {label}
    </button>
  );
}

interface GoalCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

function GoalCard({ label, selected, onClick, disabled }: GoalCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className={`w-full px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer text-left flex items-center gap-3 ${
        selected
          ? "bg-primary-container border-primary text-on-primary-container shadow-sm"
          : disabled
          ? "bg-surface border-outline-variant/30 text-on-surface-variant/40 cursor-not-allowed"
          : "bg-surface border-outline-variant/60 text-on-surface-variant hover:border-primary/40 hover:bg-surface-container"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
          selected ? "border-primary bg-primary" : "border-outline-variant"
        }`}
      >
        {selected && <Check className="w-3 h-3 text-on-primary stroke-[2.5]" />}
      </div>
      {label}
    </button>
  );
}

interface MotivationCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function MotivationCard({ label, selected, onClick }: MotivationCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-3.5 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer text-left flex items-center gap-3 ${
        selected
          ? "bg-primary-container border-primary text-on-primary-container shadow-sm"
          : "bg-surface border-outline-variant/60 text-on-surface-variant hover:border-primary/40 hover:bg-surface-container"
      }`}
    >
      <div
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200 ${
          selected ? "border-primary bg-primary" : "border-outline-variant"
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-on-primary" />}
      </div>
      {label}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<StepNumber>(1);
  const [animKey, setAnimKey] = useState(0);

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedMotivation, setSelectedMotivation] = useState<string>("");

  const goToStep = (next: StepNumber) => {
    setAnimKey((k) => k + 1);
    setTimeout(() => setStep(next), 20);
  };

  const handleSkip = () => {
    UserPreferencesService.completeOnboarding({
      favoriteCategories: [],
      thinkingGoals: [],
      motivation: "",
    });
    router.replace("/");
  };

  const handleFinish = () => {
    UserPreferencesService.completeOnboarding({
      favoriteCategories: selectedInterests,
      thinkingGoals: selectedGoals,
      motivation: selectedMotivation,
    });
    router.replace("/");
  };

  const toggleInterest = (item: string) => {
    setSelectedInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleGoal = (item: string) => {
    setSelectedGoals((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : prev.length < 3
        ? [...prev, item]
        : prev
    );
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Decorative background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary-fixed opacity-20 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-secondary-container opacity-30 rounded-full blur-3xl" />
      </div>

      {/* Header — only on steps 2–4 */}
      {step >= 2 && step <= 4 && (
        <header className="relative z-10 flex items-center justify-between px-5 pt-safe-top pt-5 max-w-lg mx-auto w-full">
          <button
            onClick={() => goToStep((step - 1) as StepNumber)}
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors cursor-pointer active:scale-95"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <ProgressDots current={step} />
          <button
            onClick={handleSkip}
            className="text-xs text-on-surface-variant/60 hover:text-on-surface-variant transition-colors cursor-pointer px-2 py-1"
          >
            ข้าม
          </button>
        </header>
      )}

      {/* Step Content */}
      <main
        key={animKey}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 py-6"
        style={{ animation: "fadeInUp 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards" }}
      >
        <div className="w-full max-w-lg">

          {/* ── Step 1: Welcome ─────────────────────────────────────────── */}
          {step === 1 && (
            <div className="flex flex-col items-center text-center">
              {/* Logo mark */}
              <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center mb-8 shadow-lg">
                <Sparkles className="w-10 h-10 text-on-primary stroke-[1.5]" />
              </div>

              <h1 className="text-2xl font-bold text-on-surface tracking-tight mb-3 leading-tight">
                ยินดีต้อนรับสู่<br />
                <span className="text-primary">Project Think</span>
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-1 max-w-xs">
                เราจะช่วยสร้างประสบการณ์การฝึกคิดที่เหมาะกับคุณ
              </p>
              <p className="text-xs text-on-surface-variant/60 mb-10">
                ใช้เวลาไม่ถึง 1 นาที
              </p>

              {/* Feature highlights */}
              <div className="w-full flex flex-col gap-2.5 mb-10 text-left">
                {[
                  { emoji: "🧠", text: "คำถามที่เลือกจากความสนใจของคุณ" },
                  { emoji: "⚡", text: "ใช้เวลาแค่ 3 นาทีต่อวัน" },
                  { emoji: "📈", text: "ติดตามการเติบโตของคุณทุกวัน" },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="flex items-center gap-3 bg-surface rounded-xl px-4 py-3 border border-outline-variant/30"
                  >
                    <span className="text-lg">{f.emoji}</span>
                    <span className="text-sm text-on-surface-variant">{f.text}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => goToStep(2)}
                className="w-full bg-primary text-on-primary py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer mb-3"
              >
                เริ่มต้น
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
              <button
                onClick={handleSkip}
                className="w-full py-3 rounded-2xl text-sm text-on-surface-variant hover:bg-surface transition-colors cursor-pointer"
              >
                ข้ามไปก่อน
              </button>
            </div>
          )}

          {/* ── Step 2: Interests ────────────────────────────────────────── */}
          {step === 2 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-on-surface mb-1">
                  คุณสนใจเรื่องอะไรบ้าง?
                </h2>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  เลือกได้หลายข้อ{" "}
                  <span className="text-primary font-medium">
                    (อย่างน้อย 3 หัวข้อ)
                  </span>
                </p>
                <p className="text-xs text-on-surface-variant/60 mt-1">
                  เราจะใช้ข้อมูลนี้เพื่อสร้างคำถามที่ใกล้เคียงกับความสนใจของคุณ
                </p>
              </div>

              {/* Selected count chip */}
              {selectedInterests.length > 0 && (
                <div className="mb-4 flex items-center gap-2">
                  <div className="bg-primary-container text-on-primary-container text-xs font-medium px-3 py-1 rounded-full">
                    เลือกแล้ว {selectedInterests.length} หัวข้อ
                  </div>
                  {selectedInterests.length >= 3 && (
                    <div className="bg-surface text-on-surface-variant/60 text-xs px-3 py-1 rounded-full border border-outline-variant/30">
                      ✓ พร้อมดำเนินการต่อ
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {INTERESTS.map((item) => (
                  <InterestChip
                    key={item}
                    label={item}
                    selected={selectedInterests.includes(item)}
                    onClick={() => toggleInterest(item)}
                  />
                ))}
              </div>

              <button
                onClick={() => goToStep(3)}
                disabled={selectedInterests.length < 3}
                className={`w-full py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                  selectedInterests.length >= 3
                    ? "bg-primary text-on-primary active:scale-[0.98] shadow-sm"
                    : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                }`}
              >
                ถัดไป
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          )}

          {/* ── Step 3: Thinking Goals ───────────────────────────────────── */}
          {step === 3 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-on-surface mb-1">
                  คุณอยากพัฒนาทักษะด้านไหน?
                </h2>
                <p className="text-sm text-on-surface-variant">
                  เลือกได้สูงสุด{" "}
                  <span className="text-primary font-medium">3 ข้อ</span>
                </p>
              </div>

              {/* Selected count */}
              <div className="mb-4 h-7">
                {selectedGoals.length > 0 && (
                  <div className="bg-primary-container text-on-primary-container text-xs font-medium px-3 py-1 rounded-full inline-block">
                    เลือกแล้ว {selectedGoals.length}/3
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2.5 mb-8">
                {GOALS.map((item) => (
                  <GoalCard
                    key={item}
                    label={item}
                    selected={selectedGoals.includes(item)}
                    onClick={() => toggleGoal(item)}
                    disabled={selectedGoals.length >= 3}
                  />
                ))}
              </div>

              <button
                onClick={() => goToStep(4)}
                disabled={selectedGoals.length === 0}
                className={`w-full py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                  selectedGoals.length > 0
                    ? "bg-primary text-on-primary active:scale-[0.98] shadow-sm"
                    : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                }`}
              >
                ถัดไป
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          )}

          {/* ── Step 4: Motivation ───────────────────────────────────────── */}
          {step === 4 && (
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold text-on-surface mb-1">
                  อะไรคือเหตุผลที่คุณ<br />อยากเริ่มฝึกคิดในวันนี้?
                </h2>
                <p className="text-sm text-on-surface-variant">
                  เลือก 1 ข้อ
                </p>
              </div>

              <div className="flex flex-col gap-2.5 mb-8">
                {MOTIVATIONS.map((item) => (
                  <MotivationCard
                    key={item}
                    label={item}
                    selected={selectedMotivation === item}
                    onClick={() => setSelectedMotivation(item)}
                  />
                ))}
              </div>

              <button
                onClick={() => goToStep(5)}
                disabled={!selectedMotivation}
                className={`w-full py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                  selectedMotivation
                    ? "bg-primary text-on-primary active:scale-[0.98] shadow-sm"
                    : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                }`}
              >
                ถัดไป
                <ArrowRight className="w-4 h-4 stroke-[2]" />
              </button>
            </div>
          )}

          {/* ── Step 5: Finish ───────────────────────────────────────────── */}
          {step === 5 && (
            <div className="flex flex-col items-center text-center">
              {/* Animated checkmark */}
              <div
                className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mb-8 shadow-lg"
                style={{ animation: "scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
              >
                <Check className="w-12 h-12 text-on-primary stroke-[2]" />
              </div>

              <h2 className="text-2xl font-bold text-on-surface tracking-tight mb-3">
                พร้อมแล้ว! 🎉
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs mb-8">
                จากข้อมูลที่คุณเลือก เราจะสร้างประสบการณ์การฝึกคิดที่เหมาะกับคุณ
                และจะพัฒนาให้ดียิ่งขึ้นเมื่อคุณใช้งานต่อเนื่อง
              </p>

              {/* Summary chips */}
              <div className="w-full bg-surface rounded-2xl border border-outline-variant/30 p-4 mb-8 text-left">
                <p className="text-xs text-on-surface-variant/60 font-medium uppercase tracking-wide mb-3">
                  สรุปโปรไฟล์ของคุณ
                </p>
                <div className="flex flex-col gap-2">
                  <div>
                    <p className="text-xs text-on-surface-variant mb-1.5">ความสนใจ</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedInterests.slice(0, 5).map((i) => (
                        <span
                          key={i}
                          className="text-xs bg-primary-container text-on-primary-container px-2.5 py-1 rounded-full"
                        >
                          {i}
                        </span>
                      ))}
                      {selectedInterests.length > 5 && (
                        <span className="text-xs bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full">
                          +{selectedInterests.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedGoals.length > 0 && (
                    <div className="mt-1">
                      <p className="text-xs text-on-surface-variant mb-1.5">เป้าหมาย</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedGoals.map((g) => (
                          <span
                            key={g}
                            className="text-xs bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-full border border-outline-variant/30"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={handleFinish}
                className="w-full bg-primary text-on-primary py-4 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer"
              >
                เริ่มฝึกคิด
                <Sparkles className="w-4 h-4 stroke-[1.5]" />
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
