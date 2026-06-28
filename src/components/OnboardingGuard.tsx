"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPreferencesService } from "@/services/userPreferences";

interface OnboardingGuardProps {
  children: React.ReactNode;
}

export function OnboardingGuard({ children }: OnboardingGuardProps) {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!UserPreferencesService.isOnboardingCompleted()) {
      router.replace("/onboarding");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) {
    // Invisible placeholder — prevents flash of home content before redirect
    return (
      <div className="min-h-screen bg-surface-container-low" aria-hidden="true" />
    );
  }

  return <>{children}</>;
}
