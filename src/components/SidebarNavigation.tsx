import React from "react";
import Link from "next/link";
import { Calendar, LineChart, Settings } from "lucide-react";

interface SidebarNavigationProps {
  activeTab?: "today" | "progress" | "settings";
}

export function SidebarNavigation({ activeTab = "today" }: SidebarNavigationProps) {
  return (
    <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-0 h-screen border-r border-surface-variant/40 pt-10 pr-8 select-none">
      {/* Brand logo */}
      <div className="mb-10 px-4">
        <h2 className="font-headline-lg font-bold text-primary dark:text-primary-fixed-dim tracking-tight">
          Project Think
        </h2>
        <p className="font-label-md text-label-md text-on-surface-variant opacity-60">
          Crafted for humans
        </p>
      </div>

      <nav className="flex flex-col gap-2 w-full">
        {/* Tab: Today */}
        <Link
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-label-md text-label-md ${
            activeTab === "today"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
          }`}
          href="/"
        >
          <Calendar className="w-5 h-5 stroke-[1.5]" />
          <span>Today</span>
        </Link>

        {/* Tab: Progress */}
        <Link
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-label-md text-label-md ${
            activeTab === "progress"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
          }`}
          href="/progress"
        >
          <LineChart className="w-5 h-5 stroke-[1.5]" />
          <span>Progress</span>
        </Link>

        {/* Tab: Settings */}
        <Link
          className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-label-md text-label-md ${
            activeTab === "settings"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:bg-surface-container-low hover:text-primary"
          }`}
          href="/settings"
        >
          <Settings className="w-5 h-5 stroke-[1.5]" />
          <span>Settings</span>
        </Link>
      </nav>
    </aside>
  );
}
