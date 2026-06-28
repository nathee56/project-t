import React from "react";
import { Header } from "@/components/Header";
import { SessionCard } from "@/components/SessionCard";
import { StreakCard } from "@/components/StreakCard";
import { CalendarCard } from "@/components/CalendarCard";
import { JourneyCard } from "@/components/JourneyCard";
import { QuoteCard } from "@/components/QuoteCard";
import { BottomNavigation } from "@/components/BottomNavigation";
import { DesktopNavbar } from "@/components/DesktopNavbar";
import { StreakInfo, ActivityDay, JourneyMetric, QuoteInfo } from "@/types";

// Mock Data matching the Google Stitch source HTML exactly
const streakData: StreakInfo = {
  count: 5,
  unit: "วัน",
  message: "สู้ต่อไปนะ!",
};

const activityData: ActivityDay[] = [
  { active: true, dimmed: true },
  { active: true },
  { active: true },
  { active: false },
  { active: true },
  { active: true },
  { active: true, today: true },
];

const journeyMetrics: JourneyMetric[] = [
  { label: "จำนวน session ทั้งหมดที่คิดมา", value: 24 },
  { label: "จำนวนคำถามที่ได้ตอบไป", value: 67 },
  { label: "จำนวนบันทึก reflection ที่เขียน", value: 12 },
];

const dailyQuote: QuoteInfo = {
  text: "จิตใจไม่ใช่ภาชนะที่ต้องเติมให้เต็ม แต่เป็นกองไฟที่ต้องจุดให้ลุกโชน",
  author: "Plutarch",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-container-low antialiased">
      {/* Top Navbar on Desktop */}
      <DesktopNavbar activeTab="today" />

      {/* Main Content Container with top offset for fixed desktop bar */}
      <div className="lg:max-w-[1024px] lg:mx-auto lg:px-6 lg:pt-24">
        {/* Mobile/Tablet Header */}
        <Header />

        <main className="max-w-[768px] lg:max-w-none mx-auto px-4 lg:px-0 flex flex-col gap-3 pt-16 lg:pt-4 pb-8">
          {/* Greeting Section */}
          <section className="pt-1 pb-2">
            <h2 className="text-lg font-semibold text-primary tracking-tight">
              สวัสดีตอนเช้า Noah.
            </h2>
            <p className="text-sm text-on-surface-variant mt-0.5">
              วันนี้พร้อมสำหรับ session การคิดหรือยัง?
            </p>
          </section>

          {/* Asymmetric Desktop Responsive Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-stack-md items-start">
            {/* Primary Column (Left) */}
            <div className="flex flex-col gap-3 lg:gap-stack-md lg:col-span-7">
              <SessionCard />
              <QuoteCard quote={dailyQuote} />
            </div>

            {/* Secondary Column (Right) */}
            <div className="flex flex-col gap-3 lg:gap-stack-md lg:col-span-5">
              <section className="grid grid-cols-2 gap-3">
                <StreakCard streak={streakData} />
                <CalendarCard activity={activityData} />
              </section>
              <JourneyCard metrics={journeyMetrics} />
            </div>
          </div>
        </main>
      </div>

      {/* Mobile/Tablet Bottom Navigation */}
      <BottomNavigation activeTab="today" />
    </div>
  );
}
