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
          if (diff > 8 && currentY > 60) setVisible(false);
          else if (diff < -4) setVisible(true);
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tabs = [
    { id: "today", label: "Today", Icon: Calendar, href: "/" },
    { id: "progress", label: "Progress", Icon: LineChart, href: "/progress" },
    { id: "settings", label: "Settings", Icon: Settings, href: "/settings" },
  ] as const;

  return (
    <nav
      className={`fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 pb-4 pt-1.5 shadow-[0_-4px_20px_rgba(45,75,67,0.08)] bg-surface-container-lowest/90 dark:bg-surface-container-low/90 backdrop-blur-md rounded-t-xl lg:hidden transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {tabs.map(({ id, label, Icon, href }) => {
        const isActive = activeTab === id;
        return (
          <Link
            key={id}
            href={href}
            className={`flex flex-col items-center justify-center rounded-full px-5 py-1.5 transition-all duration-150 ${
              isActive
                ? "bg-secondary-container dark:bg-primary-container text-on-secondary-container dark:text-on-primary-container scale-95"
                : "text-outline dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed hover:opacity-80"
            }`}
          >
            <Icon className="w-[18px] h-[18px] stroke-[1.5]" />
            <span className="text-[10px] font-medium mt-0.5 leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
