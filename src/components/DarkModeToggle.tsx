"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "./DarkModeProvider";

export function DarkModeToggle() {
  const { theme, toggleTheme } = useDarkMode();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-9 h-9 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container transition-all duration-200 cursor-pointer active:scale-90"
    >
      <Sun
        className={`absolute w-5 h-5 stroke-[1.5] transition-all duration-300 ${
          theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-50"
        }`}
      />
      <Moon
        className={`absolute w-5 h-5 stroke-[1.5] transition-all duration-300 ${
          theme === "light" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
        }`}
      />
    </button>
  );
}
