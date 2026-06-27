import React from "react";
import { Search } from "lucide-react";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="lg:hidden fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[768px] z-40 bg-surface/80 backdrop-blur-md border-b border-surface-variant/20 flex justify-between items-center px-margin-main py-4">
      {/* User Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high border border-outline-variant/30 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="w-full h-full object-cover"
          alt="A close up, professional yet warm headshot portrait of Noah"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5byURM34QLdY6JVsB5G-8nVSWLOmalMrwl1kMZ6w72BP9U8hzNtwJamx6RNjI4JPL7cy1eqyjRiu2GqEsG0Jtyh3xQmCw4v4jKC184Cvxm5999cWicGFz6ISZFK6vDvYITy85JCzwjI6UXNYpi2phh8OXER4RIip0Qq4VQzH47Xe-sbqGR6iHN5U3z1cqGEQomwGH22H06vWU1Fwvc7UJZka6fvytFfCZfEWsSl1iirL_dQIZJq7KHw"
        />
      </div>

      {/* App Logo/Title */}
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold text-primary dark:text-inverse-primary text-center">
        Project Think
      </h1>

      {/* Search Action */}
      <Button variant="icon" aria-label="Search">
        <Search className="w-6 h-6 stroke-[1.5]" />
      </Button>
    </header>
  );
}
