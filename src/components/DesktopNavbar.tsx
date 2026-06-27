import React from "react";
import Link from "next/link";
import { Calendar, LineChart, Settings } from "lucide-react";

interface DesktopNavbarProps {
  activeTab?: "today" | "progress" | "settings";
}

export function DesktopNavbar({ activeTab = "today" }: DesktopNavbarProps) {
  return (
    <nav className="hidden lg:flex fixed top-0 left-0 w-full bg-surface/80 backdrop-blur-md border-b border-surface-variant/40 z-50 px-12 py-4 justify-between items-center select-none">
      {/* Brand logo */}
      <div className="flex flex-col">
        <h2 className="font-headline-lg font-bold text-primary dark:text-primary-fixed-dim tracking-tight leading-none">
          Project Think
        </h2>
        <p className="font-label-md text-label-md text-on-surface-variant opacity-60 mt-0.5">
          Crafted for humans
        </p>
      </div>

      {/* Nav Menu items */}
      <div className="flex items-center gap-6">
        {/* Tab: Today */}
        <Link
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-label-md text-label-md ${
            activeTab === "today"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
          }`}
          href="/"
        >
          <Calendar className="w-4 h-4 stroke-[1.5]" />
          <span>Today</span>
        </Link>

        {/* Tab: Progress */}
        <Link
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-label-md text-label-md ${
            activeTab === "progress"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
          }`}
          href="/progress"
        >
          <LineChart className="w-4 h-4 stroke-[1.5]" />
          <span>Progress</span>
        </Link>

        {/* Tab: Settings */}
        <Link
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 font-label-md text-label-md ${
            activeTab === "settings"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
          }`}
          href="/settings"
        >
          <Settings className="w-4 h-4 stroke-[1.5]" />
          <span>Settings</span>
        </Link>
      </div>
    </nav>
  );
}
