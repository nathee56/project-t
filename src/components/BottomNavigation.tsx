import React from "react";
import Link from "next/link";
import { Calendar, LineChart, Settings } from "lucide-react";

interface BottomNavigationProps {
  activeTab?: "today" | "progress" | "settings";
}

export function BottomNavigation({ activeTab = "today" }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 shadow-[0_-4px_20px_rgba(45,75,67,0.05)] bg-surface-container-lowest dark:bg-surface-container-low rounded-t-xl docked full-width lg:hidden">
      {/* Tab: Today */}
      <Link
        className={`flex flex-col items-center justify-center rounded-full px-6 py-2 scale-95 duration-150 ease-in-out ${
          activeTab === "today"
            ? "bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container"
            : "text-outline dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed hover:opacity-80 transition-opacity"
        }`}
        href="/"
      >
        <Calendar className="w-5 h-5 mb-1 stroke-[1.5]" />
        <span className="font-label-md text-label-md">Today</span>
      </Link>

      {/* Tab: Progress */}
      <Link
        className={`flex flex-col items-center justify-center rounded-full px-6 py-2 scale-95 duration-150 ease-in-out ${
          activeTab === "progress"
            ? "bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container"
            : "text-outline dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed hover:opacity-80 transition-opacity"
        }`}
        href="/progress"
      >
        <LineChart className="w-5 h-5 mb-1 stroke-[1.5]" />
        <span className="font-label-md text-label-md">Progress</span>
      </Link>

      {/* Tab: Settings */}
      <Link
        className={`flex flex-col items-center justify-center rounded-full px-6 py-2 scale-95 duration-150 ease-in-out ${
          activeTab === "settings"
            ? "bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container"
            : "text-outline dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed hover:opacity-80 transition-opacity"
        }`}
        href="/settings"
      >
        <Settings className="w-5 h-5 mb-1 stroke-[1.5]" />
        <span className="font-label-md text-label-md">Settings</span>
      </Link>
    </nav>
  );
}
