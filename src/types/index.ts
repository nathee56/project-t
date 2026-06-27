export interface StreakInfo {
  count: number;
  unit: string;
  message: string;
}

export interface ActivityDay {
  active: boolean;
  today?: boolean;
  dimmed?: boolean;
}

export interface JourneyMetric {
  label: string;
  value: number;
}

export interface QuoteInfo {
  text: string;
  author: string;
}

export interface SessionChoice {
  id: string;
  text: string;
}

export interface SessionQuestion {
  step: number;
  totalSteps: number;
  prompt: string;
  choices: SessionChoice[];
}

