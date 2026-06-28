import React from "react";
import { DarkModeToggle } from "./DarkModeToggle";

export function Header() {
  return (
    <header className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] z-40 bg-surface/80 backdrop-blur-md border-b border-surface-variant/20 flex justify-between items-center px-4 py-2.5">
      {/* User Avatar */}
      <div className="w-8 h-8 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/30 flex items-center justify-center shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover"
          alt="Noah"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5byURM34QLdY6JVsB5G-8nVSWLOmalMrwl1kMZ6w72BP9U8hzNtwJamx6RNjI4JPL7cy1eqyjRiu2GqEsG0Jtyh3xQmCw4v4jKC184Cvxm5999cWicGFz6ISZFK6vDvYITy85JCzwjI6UXNYpi2phh8OXER4RIip0Qq4VQzH47Xe-sbqGR6iHN5U3z1cqGEQomwGH22H06vWU1Fwvc7UJZka6fvytFfCZfEWsSl1iirL_dQIZJq7KHw"
        />
      </div>

      {/* App Logo/Title */}
      <h1 className="text-sm font-semibold text-primary dark:text-primary">
        Project Think
      </h1>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </header>
  );
}
