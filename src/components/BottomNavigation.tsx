"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Calendar, LineChart, Settings } from "lucide-react";

interface BottomNavigationProps {
  activeTab?: "today" | "progress" | "settings";
}

export function BottomNavigation({ activeTab = "today" }: BottomNavigationProps) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const diff = currentY - lastScrollY.current;

          // Hide when scrolling down > 8px, show when scrolling up
          if (diff > 8 && currentY > 60) {
            setVisible(false);
          } else if (diff < -4) {
            setVisible(true);
          }

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 shadow-[0_-4px_20px_rgba(45,75,67,0.08)] bg-surface-container-lowest/90 dark:bg-surface-container-low/90 backdrop-blur-md rounded-t-2xl lg:hidden transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* Tab: Today */}
      <Link
        className={`flex flex-col items-center justify-center rounded-full px-6 py-2 transition-all duration-150 ${
          activeTab === "today"
            ? "bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container scale-95"
            : "text-outline dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed hover:opacity-80"
        }`}
        href="/"
      >
        <Calendar className="w-5 h-5 mb-1 stroke-[1.5]" />
        <span className="font-label-md text-label-md">Today</span>
      </Link>

      {/* Tab: Progress */}
      <Link
        className={`flex flex-col items-center justify-center rounded-full px-6 py-2 transition-all duration-150 ${
          activeTab === "progress"
            ? "bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container scale-95"
            : "text-outline dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed hover:opacity-80"
        }`}
        href="/progress"
      >
        <LineChart className="w-5 h-5 mb-1 stroke-[1.5]" />
        <span className="font-label-md text-label-md">Progress</span>
      </Link>

      {/* Tab: Settings */}
      <Link
        className={`flex flex-col items-center justify-center rounded-full px-6 py-2 transition-all duration-150 ${
          activeTab === "settings"
            ? "bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container scale-95"
            : "text-outline dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed hover:opacity-80"
        }`}
        href="/settings"
      >
        <Settings className="w-5 h-5 mb-1 stroke-[1.5]" />
        <span className="font-label-md text-label-md">Settings</span>
      </Link>
    </nav>
  );
}
