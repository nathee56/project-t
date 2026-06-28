// UserPreferencesService
// Abstracted storage layer — currently uses localStorage.
// To migrate to cloud: replace the get/save methods only. UI stays unchanged.

export interface UserPreferences {
  onboardingCompleted: boolean;
  favoriteCategories: string[];
  thinkingGoals: string[];
  motivation: string;
  createdAt: string;
  version: number;
}

const STORAGE_KEY = "project_think_preferences";

const defaultPreferences: UserPreferences = {
  onboardingCompleted: false,
  favoriteCategories: [],
  thinkingGoals: [],
  motivation: "",
  createdAt: "",
  version: 1,
};

export const UserPreferencesService = {
  get(): UserPreferences {
    if (typeof window === "undefined") return { ...defaultPreferences };
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return { ...defaultPreferences };
      return { ...defaultPreferences, ...JSON.parse(stored) };
    } catch {
      return { ...defaultPreferences };
    }
  },

  save(prefs: Partial<UserPreferences>): void {
    if (typeof window === "undefined") return;
    const current = this.get();
    const updated = { ...current, ...prefs };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  completeOnboarding(data: {
    favoriteCategories: string[];
    thinkingGoals: string[];
    motivation: string;
  }): void {
    this.save({
      ...data,
      onboardingCompleted: true,
      createdAt: new Date().toISOString(),
      version: 1,
    });
  },

  isOnboardingCompleted(): boolean {
    return this.get().onboardingCompleted;
  },

  resetOnboarding(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
