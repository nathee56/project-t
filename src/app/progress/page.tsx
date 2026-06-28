"use client";

import React from "react";
import { AlignLeft } from "lucide-react";
import { JourneyCalendar } from "@/components/JourneyCalendar";
import { JourneyMetrics } from "@/components/JourneyMetrics";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { BottomNavigation } from "@/components/BottomNavigation";
import { DesktopNavbar } from "@/components/DesktopNavbar";

export default function ProgressPage() {
  return (
    <div className="bg-surface-container-low min-h-screen text-on-surface antialiased pb-32">
      {/* Top Navbar on Desktop */}
      <DesktopNavbar activeTab="progress" />

      {/* Main Content Container with top offset for fixed desktop bar */}
      <div className="lg:max-w-[1024px] lg:mx-auto lg:px-6 lg:pt-24">
        {/* Mobile/Tablet Header */}
        <header className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] z-40 bg-surface/80 backdrop-blur-md border-b border-surface-variant/20 flex justify-between items-center px-4 py-2.5">
          <button className="cursor-pointer active:scale-95 transition-colors duration-300 p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container">
            <AlignLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <h1 className="text-sm font-semibold text-primary">
            Project Think
          </h1>
          <div className="text-xs px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant">
            Progress
          </div>
        </header>

        <main className="max-w-[768px] lg:max-w-none mx-auto px-4 lg:px-0 pt-14 lg:pt-4 flex flex-col gap-3 lg:gap-stack-lg">
          {/* Header Section */}
          <section className="flex flex-col gap-1 mt-3">
            <h2 className="text-lg font-semibold text-primary text-center">
              เส้นทางการเติบโต (Your Journey)
            </h2>
            <p className="text-sm text-on-surface-variant text-center max-w-sm mx-auto">
              มา track growth ของตัวคุณ ผ่านการเขียน reflection ในแต่ละวัน
            </p>
          </section>

          {/* Asymmetric Desktop Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-stack-md items-start">
            <div className="flex flex-col gap-3 lg:gap-stack-lg lg:col-span-7">
              <JourneyCalendar />
              <JourneyTimeline />
            </div>
            <div className="flex flex-col gap-3 lg:gap-stack-lg lg:col-span-5">
              <JourneyMetrics
                streakDays={5}
                sessionsCompleted={24}
                reflectionsWritten={12}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Nav Bar */}
      <BottomNavigation activeTab="progress" />
    </div>
  );
}
