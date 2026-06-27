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
        <header className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] z-40 bg-surface/80 backdrop-blur-md border-b border-surface-variant/20 flex justify-between items-center px-margin-main py-4">
          <button className="cursor-pointer active:scale-95 transition-transform hover:bg-surface-container-low dark:hover:bg-primary-container transition-colors duration-300 p-2 rounded-full text-on-surface-variant dark:text-on-surface-variant">
            <AlignLeft className="w-6 h-6 stroke-[1.5]" />
          </button>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-semibold text-primary dark:text-primary-fixed-dim">
            Project Think
          </h1>
          <button className="cursor-pointer active:scale-95 transition-transform hover:bg-surface-container-low dark:hover:bg-primary-container transition-colors duration-300 px-3 py-1.5 rounded-full text-on-surface-variant dark:text-on-surface-variant font-label-md text-label-md">
            1 of 4
          </button>
        </header>

        <main className="max-w-[768px] lg:max-w-none mx-auto px-margin-main lg:px-0 pt-20 lg:pt-4 flex flex-col gap-stack-lg">
          {/* Header Section */}
          <section className="flex flex-col gap-stack-sm mt-8">
            <h2 className="font-headline-xl text-headline-xl text-primary text-center">
              เส้นทางการเติบโต (Your Journey)
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant text-center max-w-sm mx-auto">
              มา track growth ของตัวคุณ ผ่านการเขียน reflection ในแต่ละวัน
            </p>
          </section>

          {/* Asymmetric Desktop Responsive Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-stack-md items-start">
            {/* Primary Column (Left) */}
            <div className="flex flex-col gap-stack-lg lg:col-span-7">
              {/* Mini Thinking Calendar */}
              <JourneyCalendar />

              {/* Timeline: Recent Reflections */}
              <JourneyTimeline />
            </div>

            {/* Secondary Column (Right) */}
            <div className="flex flex-col gap-stack-lg lg:col-span-5">
              {/* Asymmetric Metrics Bento Grid */}
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
