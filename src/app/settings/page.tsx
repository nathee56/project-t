"use client";

import React, { useState } from "react";
import {
  AlignLeft,
  User,
  ChevronRight,
  Palette,
  Clock,
  Globe,
  Heart,
  Shield,
  ExternalLink,
} from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { DesktopNavbar } from "@/components/DesktopNavbar";

export default function SettingsPage() {
  const [appearance, setAppearance] = useState<"Light" | "Dark">("Light");

  const toggleAppearance = () => {
    setAppearance((prev) => (prev === "Light" ? "Dark" : "Light"));
  };

  return (
    <div className="bg-surface-container-low min-h-screen text-on-surface antialiased pb-32">
      {/* Top Navbar on Desktop */}
      <DesktopNavbar activeTab="settings" />

      {/* Main Content Container with top offset for fixed desktop bar */}
      <div className="lg:max-w-[1024px] lg:mx-auto lg:px-6 lg:pt-24">
        {/* Mobile/Tablet Header */}
        <header className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] z-40 bg-surface/80 backdrop-blur-md border-b border-surface-variant/20 flex justify-between items-center px-4 py-2.5">
          <button
            aria-label="Menu"
            className="flex items-center justify-center p-1.5 text-on-surface-variant hover:bg-surface-container transition-colors duration-300 rounded-full cursor-pointer active:scale-95"
          >
            <AlignLeft className="w-5 h-5 stroke-[1.5]" />
          </button>
          <h1 className="text-sm font-semibold text-primary">
            Project Think
          </h1>
          <div className="text-xs px-2.5 py-1 rounded-full bg-surface-container-highest text-on-surface-variant">
            Settings
          </div>
        </header>

        <main className="max-w-[768px] lg:max-w-none mx-auto px-4 lg:px-0 pb-24 pt-14 lg:pt-4 flex flex-col gap-3 lg:gap-stack-lg relative">
          {/* Page Header */}
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg font-semibold text-on-surface">การตั้งค่า (Settings)</h2>
            <p className="text-sm text-on-surface-variant">
              จัดการความต้องการและข้อมูลบัญชีของคุณ
            </p>
          </div>

          {/* Asymmetric Desktop Responsive Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-stack-lg items-start">
            {/* Left Column: Preferences */}
            <div className="bg-surface rounded-xl border border-surface-variant shadow-[0_4px_20px_rgba(45,75,67,0.05)] overflow-hidden flex flex-col">
              {/* Profile */}
              <button className="w-full flex items-center justify-between p-4 border-b border-surface-variant last:border-b-0 hover:bg-surface-container-lowest transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none">
                <div className="flex items-center gap-4">
                  <User className="w-6 h-6 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                  <span className="font-body-lg text-body-lg text-on-surface">โปรไฟล์ (Profile)</span>
                </div>
                <ChevronRight className="w-6 h-6 text-outline-variant stroke-[1.5]" />
              </button>

              {/* Appearance */}
              <div className="w-full flex items-center justify-between p-4 border-b border-surface-variant last:border-b-0 bg-surface">
                <div className="flex items-center gap-4">
                  <Palette className="w-6 h-6 text-outline stroke-[1.5]" />
                  <span className="font-body-lg text-body-lg text-on-surface">รูปลักษณ์ (Appearance)</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {appearance}
                  </span>
                  {/* Custom Toggle UI */}
                  <div
                    onClick={toggleAppearance}
                    className={`w-12 h-6 rounded-full p-1 flex items-center cursor-pointer transition-colors duration-300 shadow-inner ${
                      appearance === "Dark"
                        ? "bg-primary justify-end"
                        : "bg-primary-fixed justify-start"
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
              <button className="w-full flex items-center justify-between p-4 border-b border-surface-variant last:border-b-0 hover:bg-surface-container-lowest transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none">
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                  <span className="font-body-lg text-body-lg text-on-surface">เตือนความจำรายวัน (Daily Reminders)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-md text-label-md text-primary bg-primary-fixed-dim/20 px-3 py-1 rounded-full">
                    08:00 AM
                  </span>
                  <ChevronRight className="w-6 h-6 text-outline-variant stroke-[1.5]" />
                </div>
              </button>

              {/* Language */}
              <button className="w-full flex items-center justify-between p-4 border-b border-surface-variant last:border-b-0 hover:bg-surface-container-lowest transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none">
                <div className="flex items-center gap-4">
                  <Globe className="w-6 h-6 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                  <span className="font-body-lg text-body-lg text-on-surface">ภาษา (Language)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-body-md text-body-md text-on-surface-variant">English</span>
                  <ChevronRight className="w-6 h-6 text-outline-variant stroke-[1.5]" />
                </div>
              </button>
            </div>

            {/* Right Column: About & Legal */}
            <div className="flex flex-col gap-4">
              {/* About Card */}
              <div className="bg-surface-warm rounded-xl border border-surface-variant p-6 shadow-[0_4px_20px_rgba(45,75,67,0.03)] flex flex-col items-center justify-center text-center gap-4 relative overflow-hidden">
                {/* Decorative subtle background shape */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>
                <div className="w-14 h-14 bg-surface rounded-full flex items-center justify-center shadow-sm border border-surface-variant z-10 text-primary">
                  <Heart className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="flex flex-col gap-1 z-10">
                  <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">
                    เกี่ยวกับ Project Think
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant italic">
                    &quot;สร้างสรรค์โดยมนุษย์ เพื่อมนุษย์&quot;
                  </p>
                  <p className="font-label-md text-label-md text-outline mt-2">Version 1.0.4</p>
                </div>
              </div>

              {/* Privacy Policy */}
              <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-surface transition-colors group cursor-pointer active:scale-[0.99] focus:outline-none">
                <div className="flex items-center gap-4">
                  <Shield className="w-6 h-6 text-outline group-hover:text-primary transition-colors stroke-[1.5]" />
                  <span className="font-body-lg text-body-lg text-on-surface">นโยบายความเป็นส่วนตัว (Privacy Policy)</span>
                </div>
                <ExternalLink className="w-5 h-5 text-outline-variant stroke-[1.5]" />
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Bottom Nav Bar */}
      <BottomNavigation activeTab="settings" />
    </div>
  );
}
