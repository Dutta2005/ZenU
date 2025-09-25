// types.ts
export interface MoodPalette {
  name: string;
  primary: string;
  primaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
  gradient: string;
}

export interface MoodOption {
  emoji: string;
  label: string;
  value: number;
}

export interface DailyTip {
  category: string;
  tip: string;
}

export interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
}

export interface MoodGreeting {
  mood: number;
  text: string;
  icon: string;
}

export type ViewType = 'dashboard' | 'coming-soon' | 'crisis';

export interface EmojiSliderProps {
  value: number;
  onValueChange: (value: number, theme: string) => void;
  palette: MoodPalette;
}

export interface TipCardProps {
  tip: string;
  category: string;
  className?: string;
  palette: MoodPalette;
}

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: 'available' | 'coming-soon';
  onClick: () => void;
  className?: string;
  palette: MoodPalette;
}

export interface CrisisCardProps {
  onEmergencyClick: () => void;
}

export interface CrisisViewProps {
  palette: MoodPalette;
  onBack: () => void;
}

export interface ComingSoonViewProps {
  feature: Feature;
  palette: MoodPalette;
  onBack: () => void;
}

export interface MoodCheckInModalProps {
  isOpen: boolean;
  userMood: number;
  palette: MoodPalette;
  todaysTip: DailyTip;
  onMoodChange: (mood: number, theme: string) => void;
  onComplete: (mood: number, theme: string) => void;
  onSkip: () => void;
}

export interface DashboardProps {
  userMood: number;
  palette: MoodPalette;
  moodGreeting: MoodGreeting | string;
  suggestedActions: string[];
  features: Feature[];
  onFeatureClick: (featureId: string) => void;
  onCrisisClick: () => void;
  onMoodCheckIn: () => void;
}