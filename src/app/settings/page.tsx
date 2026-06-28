"use client";

import React, { useState, useEffect } from "react";
import {
  AlignLeft,
  User,
  ChevronRight,
  ChevronDown,
  Palette,
  Clock,
  Globe,
  Heart,
  Shield,
  ExternalLink,
  RotateCcw,
  Tag,
  Check,
  Target,
  Lightbulb,
  Save,
} from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { UserPreferencesService, UserPreferences } from "@/services/userPreferences";
import { DesktopNavbar } from "@/components/DesktopNavbar";

// ─── Data (shared with onboarding) ───────────────────────────────────────────
const INTERESTS = [
  "ตรรกะและเหตุผล", "ชีวิตประจำวัน", "ประวัติศาสตร์ไทย",
  "ประวัติศาสตร์โลก", "วิทยาศาสตร์", "เทคโนโลยี",
  "AI", "การเงิน", "จิตวิทยา", "สังคม",
  "สิ่งแวดล้อม", "สุขภาพ", "ศิลปะและวัฒนธรรม",
  "การสื่อสาร", "ภูมิศาสตร์", "พลเมืองและประชาธิปไตย",
];

const GOALS = [
  "การคิดวิเคราะห์", "การใช้เหตุผล", "การแก้ปัญหา",
  "การตัดสินใจ", "ความคิดสร้างสรรค์", "การสื่อสาร",
  "การมองหลายมุม", "การไตร่ตรอง",
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

// ─── Sub-components ──────────────────────────────────────────────────────────
function InterestChip({
  label, selected, onClick,
}: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-95 cursor-pointer text-left ${
        selected
          ? "bg-primary-container border-primary text-on-primary-container shadow-sm"
          : "bg-surface-container-low border-outline-variant/60 text-on-surface-variant hover:border-primary/40 hover:bg-surface-container"
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

function GoalChip({
  label, selected, onClick, disabled,
}: { label: string; selected: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled && !selected}
      className={`px-3 py-2 rounded-xl border text-sm font-medium transition-all duration-200 active:scale-95 cursor-pointer text-left flex items-center gap-2 ${
        selected
          ? "bg-primary-container border-primary text-on-primary-container shadow-sm"
          : disabled
          ? "bg-surface border-outline-variant/20 text-on-surface-variant/30 cursor-not-allowed"
          : "bg-surface-container-low border-outline-variant/60 text-on-surface-variant hover:border-primary/40 hover:bg-surface-container"
      }`}
    >
      {selected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
      {label}
    </button>
  );
}

// ─── Section wrapper ─────────────────────────────────────────────────────────
function PreferenceSection({
  icon: Icon,
  title,
  subtitle,
  expanded,
  onToggle,
  saved,
  children,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  expanded: boolean;
  onToggle: () => void;
  saved?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface rounded-xl border border-surface-variant overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors cursor-pointer active:scale-[0.99] focus:outline-none"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-primary stroke-[1.5] shrink-0" />
          <div className="text-left">
            <div className="text-sm font-semibold text-on-surface flex items-center gap-2">
              {title}
              {saved && (
                <span className="text-[10px] bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-medium">
                  บันทึกแล้ว
                </span>
              )}
            </div>
            <div className="text-xs text-on-surface-variant mt-0.5">{subtitle}</div>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-outline-variant shrink-0 transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {expanded && (
        <div
          className="border-t border-surface-variant px-4 pb-4 pt-3"
          style={{ animation: "fadeInUp 0.25s ease forwards" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [appearance, setAppearance] = useState<"Light" | "Dark">("Light");

  // Preference editing state
  const [prefs, setPrefs] = useState<UserPreferences | null>(null);
  const [localInterests, setLocalInterests] = useState<string[]>([]);
  const [localGoals, setLocalGoals] = useState<string[]>([]);
  const [localMotivation, setLocalMotivation] = useState<string>("");

  // Expand/collapse panels
  const [openPanel, setOpenPanel] = useState<"interests" | "goals" | "motivation" | null>(null);
  const [savedPanel, setSavedPanel] = useState<Set<string>>(new Set());

  useEffect(() => {
    const p = UserPreferencesService.get();
    setPrefs(p);
    setLocalInterests(p.favoriteCategories);
    setLocalGoals(p.thinkingGoals);
    setLocalMotivation(p.motivation);
  }, []);

  const toggleAppearance = () =>
    setAppearance((prev) => (prev === "Light" ? "Dark" : "Light"));

  const togglePanel = (panel: typeof openPanel) =>
    setOpenPanel((prev) => (prev === panel ? null : panel));

  const saveInterests = () => {
    UserPreferencesService.save({ favoriteCategories: localInterests });
    setSavedPanel((prev) => new Set(prev).add("interests"));
    setOpenPanel(null);
  };

  const saveGoals = () => {
    UserPreferencesService.save({ thinkingGoals: localGoals });
    setSavedPanel((prev) => new Set(prev).add("goals"));
    setOpenPanel(null);
  };

  const saveMotivation = () => {
    UserPreferencesService.save({ motivation: localMotivation });
    setSavedPanel((prev) => new Set(prev).add("motivation"));
    setOpenPanel(null);
  };

  const toggleInterest = (item: string) =>
    setLocalInterests((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );

  const toggleGoal = (item: string) =>
    setLocalGoals((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : prev.length < 3
        ? [...prev, item]
        : prev
    );

  return (
    <div className="bg-surface-container-low min-h-screen text-on-surface antialiased pb-32">
      <DesktopNavbar activeTab="settings" />

      <div className="lg:max-w-[1024px] lg:mx-auto lg:px-6 lg:pt-24">
        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] z-40 bg-surface/80 backdrop-blur-md border-b border-surface-variant/20 flex justify-between items-center px-4 py-2.5">
          <button
            aria-label="Menu"
            className="flex items-center justify-center p-1.5 text-on-surface-variant hover:bg-surface-container transition-colors duration-300 rounded-full cursor-pointer active:scale-95"
          >
            <AlignLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <h1 className="text-sm font-semibold text-primary">Project Think</h1>
          <div className="text-xs px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant">
            Settings
          </div>
        </header>

        <main className="max-w-[768px] lg:max-w-none mx-auto px-4 lg:px-0 pb-24 pt-14 lg:pt-4 flex flex-col gap-3 lg:gap-6 relative">
          {/* Page Header */}
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg font-semibold text-on-surface">การตั้งค่า (Settings)</h2>
            <p className="text-sm text-on-surface-variant">จัดการความต้องการและข้อมูลบัญชีของคุณ</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 items-start">

            {/* ── Left Column ──────────────────────────────────────────── */}
            <div className="flex flex-col gap-3">

              {/* General Preferences Card */}
              <div className="bg-surface rounded-xl border border-surface-variant overflow-hidden">
                {/* Profile */}
                <button className="w-full flex items-center justify-between p-4 border-b border-surface-variant hover:bg-surface-container-lowest transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                    <span className="text-sm text-on-surface">โปรไฟล์ (Profile)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-outline-variant stroke-[1.5]" />
                </button>

                {/* Appearance */}
                <div className="w-full flex items-center justify-between p-4 border-b border-surface-variant bg-surface">
                  <div className="flex items-center gap-3">
                    <Palette className="w-5 h-5 text-outline stroke-[1.5]" />
                    <span className="text-sm text-on-surface">รูปลักษณ์ (Appearance)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-on-surface-variant">{appearance}</span>
                    <div
                      onClick={toggleAppearance}
                      className={`w-10 h-5 rounded-full p-0.5 flex items-center cursor-pointer transition-colors duration-300 shadow-inner ${
                        appearance === "Dark" ? "bg-primary justify-end" : "bg-primary-fixed justify-start"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full shadow-sm transition-all duration-300 ${
                          appearance === "Dark" ? "bg-on-primary" : "bg-primary"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Daily Reminders */}
                <button className="w-full flex items-center justify-between p-4 border-b border-surface-variant hover:bg-surface-container-lowest transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                    <span className="text-sm text-on-surface">เตือนความจำรายวัน</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-primary bg-primary-fixed/20 px-2.5 py-1 rounded-full">08:00 AM</span>
                    <ChevronRight className="w-4 h-4 text-outline-variant stroke-[1.5]" />
                  </div>
                </button>

                {/* Language */}
                <button className="w-full flex items-center justify-between p-4 hover:bg-surface-container-lowest transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none">
                  <div className="flex items-center gap-3">
                    <Globe className="w-5 h-5 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                    <span className="text-sm text-on-surface">ภาษา (Language)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-on-surface-variant">English</span>
                    <ChevronRight className="w-4 h-4 text-outline-variant stroke-[1.5]" />
                  </div>
                </button>
              </div>

              {/* ── My Preferences (editable) ─────────────────────────── */}
              <div className="flex flex-col gap-2">
                <p className="text-xs text-on-surface-variant font-medium px-1">ความสนใจและเป้าหมายของฉัน</p>

                {/* Interests */}
                <PreferenceSection
                  icon={Tag}
                  title="ความสนใจ"
                  subtitle={
                    localInterests.length > 0
                      ? `เลือกไว้ ${localInterests.length} หัวข้อ`
                      : "ยังไม่ได้เลือก"
                  }
                  expanded={openPanel === "interests"}
                  onToggle={() => togglePanel("interests")}
                  saved={savedPanel.has("interests")}
                >
                  {/* Selected count */}
                  {localInterests.length > 0 && (
                    <p className="text-xs text-primary font-medium mb-3">
                      เลือกแล้ว {localInterests.length} หัวข้อ
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {INTERESTS.map((item) => (
                      <InterestChip
                        key={item}
                        label={item}
                        selected={localInterests.includes(item)}
                        onClick={() => toggleInterest(item)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={saveInterests}
                    disabled={localInterests.length < 3}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      localInterests.length >= 3
                        ? "bg-primary text-on-primary active:scale-[0.98]"
                        : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                    }`}
                  >
                    <Save className="w-4 h-4 stroke-[1.5]" />
                    บันทึก {localInterests.length < 3 ? `(เลือกอีก ${3 - localInterests.length})` : ""}
                  </button>
                </PreferenceSection>

                {/* Goals */}
                <PreferenceSection
                  icon={Target}
                  title="เป้าหมายการคิด"
                  subtitle={
                    localGoals.length > 0
                      ? localGoals.slice(0, 2).join(", ") + (localGoals.length > 2 ? "..." : "")
                      : "ยังไม่ได้เลือก"
                  }
                  expanded={openPanel === "goals"}
                  onToggle={() => togglePanel("goals")}
                  saved={savedPanel.has("goals")}
                >
                  <p className="text-xs text-on-surface-variant mb-3">เลือกได้สูงสุด 3 ข้อ</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {GOALS.map((item) => (
                      <GoalChip
                        key={item}
                        label={item}
                        selected={localGoals.includes(item)}
                        onClick={() => toggleGoal(item)}
                        disabled={localGoals.length >= 3}
                      />
                    ))}
                  </div>
                  <button
                    onClick={saveGoals}
                    disabled={localGoals.length === 0}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      localGoals.length > 0
                        ? "bg-primary text-on-primary active:scale-[0.98]"
                        : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                    }`}
                  >
                    <Save className="w-4 h-4 stroke-[1.5]" />
                    บันทึก
                  </button>
                </PreferenceSection>

                {/* Motivation */}
                <PreferenceSection
                  icon={Lightbulb}
                  title="แรงจูงใจ"
                  subtitle={localMotivation || "ยังไม่ได้เลือก"}
                  expanded={openPanel === "motivation"}
                  onToggle={() => togglePanel("motivation")}
                  saved={savedPanel.has("motivation")}
                >
                  <div className="flex flex-col gap-2 mb-4">
                    {MOTIVATIONS.map((item) => (
                      <button
                        key={item}
                        onClick={() => setLocalMotivation(item)}
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-left flex items-center gap-3 transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                          localMotivation === item
                            ? "bg-primary-container border-primary text-on-primary-container"
                            : "bg-surface-container-low border-outline-variant/60 text-on-surface-variant hover:border-primary/40"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            localMotivation === item ? "border-primary bg-primary" : "border-outline-variant"
                          }`}
                        >
                          {localMotivation === item && (
                            <div className="w-1.5 h-1.5 rounded-full bg-on-primary" />
                          )}
                        </div>
                        {item}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={saveMotivation}
                    disabled={!localMotivation}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                      localMotivation
                        ? "bg-primary text-on-primary active:scale-[0.98]"
                        : "bg-surface-container text-on-surface-variant/40 cursor-not-allowed"
                    }`}
                  >
                    <Save className="w-4 h-4 stroke-[1.5]" />
                    บันทึก
                  </button>
                </PreferenceSection>
              </div>
            </div>

            {/* ── Right Column ─────────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              {/* About Card */}
              <div className="bg-surface-warm rounded-xl border border-surface-variant p-5 shadow-[0_4px_20px_rgba(45,75,67,0.03)] flex flex-col items-center justify-center text-center gap-3 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none" />
                <div className="w-12 h-12 bg-surface rounded-full flex items-center justify-center shadow-sm border border-surface-variant z-10 text-primary">
                  <Heart className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div className="flex flex-col gap-1 z-10">
                  <h3 className="text-base font-semibold text-on-surface">เกี่ยวกับ Project Think</h3>
                  <p className="text-sm text-on-surface-variant italic">
                    &quot;สร้างสรรค์โดยมนุษย์ เพื่อมนุษย์&quot;
                  </p>
                  <p className="text-xs text-outline mt-1">Version 1.0.4</p>
                </div>
              </div>

              {/* Reset Onboarding */}
              <button
                onClick={() => {
                  if (window.confirm("รีเซ็ต onboarding และเริ่มต้นใหม่?")) {
                    UserPreferencesService.resetOnboarding();
                    window.location.href = "/onboarding";
                  }
                }}
                className="w-full flex items-center justify-between p-4 bg-surface rounded-xl border border-surface-variant hover:bg-surface-container-low transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <RotateCcw className="w-5 h-5 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                  <span className="text-sm text-on-surface">รีเซ็ต Onboarding</span>
                </div>
                <ChevronRight className="w-4 h-4 text-outline-variant stroke-[1.5]" />
              </button>

              {/* Privacy Policy */}
              <button className="w-full flex items-center justify-between p-4 bg-surface rounded-xl border border-surface-variant hover:bg-surface-container-low transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                  <span className="text-sm text-on-surface">นโยบายความเป็นส่วนตัว</span>
                </div>
                <ExternalLink className="w-4 h-4 text-outline-variant stroke-[1.5]" />
              </button>

              {/* Profile summary */}
              {prefs?.onboardingCompleted && (
                <div className="bg-surface rounded-xl border border-surface-variant p-4">
                  <p className="text-xs text-on-surface-variant/60 font-medium uppercase tracking-wide mb-3">
                    โปรไฟล์ปัจจุบัน
                  </p>
                  {prefs.favoriteCategories.length > 0 && (
                    <div className="mb-2">
                      <p className="text-xs text-on-surface-variant mb-1.5">ความสนใจ</p>
                      <div className="flex flex-wrap gap-1.5">
                        {prefs.favoriteCategories.slice(0, 6).map((c) => (
                          <span key={c} className="text-xs bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full">
                            {c}
                          </span>
                        ))}
                        {prefs.favoriteCategories.length > 6 && (
                          <span className="text-xs bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full">
                            +{prefs.favoriteCategories.length - 6}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  {prefs.motivation && (
                    <div>
                      <p className="text-xs text-on-surface-variant mb-1">แรงจูงใจ</p>
                      <p className="text-xs text-primary font-medium">{prefs.motivation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <BottomNavigation activeTab="settings" />
    </div>
  );
}
