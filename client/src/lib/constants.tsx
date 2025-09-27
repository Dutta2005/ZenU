import { MessageCircle, ClipboardList, BookOpen, Phone, Users, Music } from "lucide-react";
import type { MoodPalette, MoodOption, DailyTip, Feature, MoodGreeting } from './types';

// Mood-based color palettes
export const moodPalettes: Record<number, MoodPalette> = {
  0: { // Very Sad
    name: 'very-sad',
    primary: '#A78BFA', // Soft lavender
    primaryForeground: '#FFFFFF',
    background: '#FDF2F8', // Very light rose
    foreground: '#7C2D92',
    card: '#FFFFFF',
    cardForeground: '#7C2D92',
    popover: '#FFFFFF',
    popoverForeground: '#7C2D92',
    muted: '#F3E8FF', // Light purple
    mutedForeground: '#A855F7',
    accent: '#DDD6FE', // Very light purple
    accentForeground: '#7C2D92',
    border: '#E9D5FF',
    input: '#FAF5FF',
    ring: '#A78BFA',
    gradient: 'linear-gradient(135deg, #FDF2F8 0%, #F3E8FF 50%, #DDD6FE 100%)'
  },
  1: { // Sad
    name: 'sad',
    primary: '#94A3B8', // Soft blue-gray
    primaryForeground: '#FFFFFF',
    background: '#F8FAFC', // Very light blue-gray
    foreground: '#475569',
    card: '#FFFFFF',
    cardForeground: '#475569',
    popover: '#FFFFFF',
    popoverForeground: '#475569',
    muted: '#F1F5F9', // Light gray-blue
    mutedForeground: '#64748B',
    accent: '#E2E8F0', // Very light gray
    accentForeground: '#475569',
    border: '#E2E8F0',
    input: '#F8FAFC',
    ring: '#94A3B8',
    gradient: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 50%, #E2E8F0 100%)'
  },
  2: { // Anxious
    name: 'anxious',
    primary: '#F59E0B', // Warm amber
    primaryForeground: '#FFFFFF',
    background: '#FFFBEB', // Very light amber
    foreground: '#92400E',
    card: '#FFFFFF',
    cardForeground: '#92400E',
    popover: '#FFFFFF',
    popoverForeground: '#92400E',
    muted: '#FEF3C7', // Light amber
    mutedForeground: '#D97706',
    accent: '#FBBF24', // Medium amber
    accentForeground: '#92400E',
    border: '#FDE68A',
    input: '#FFFBEB',
    ring: '#F59E0B',
    gradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FBBF24 100%)'
  },
  3: { // Okay
    name: 'okay',
    primary: '#FF6B6B', // Coral like in the image
    primaryForeground: '#FFFFFF',
    background: '#FFF5F5', // Very light coral
    foreground: '#B91C1C',
    card: '#FFFFFF',
    cardForeground: '#B91C1C',
    popover: '#FFFFFF',
    popoverForeground: '#B91C1C',
    muted: '#FED7D7', // Light coral
    mutedForeground: '#DC2626',
    accent: '#FEB2B2', // Medium coral
    accentForeground: '#B91C1C',
    border: '#FECACA',
    input: '#FFF5F5',
    ring: '#FF6B6B',
    gradient: 'linear-gradient(135deg, #FFF5F5 0%, #FED7D7 50%, #FEB2B2 100%)'
  },
  4: { // Good
    name: 'good',
    primary: '#10B981', // Emerald green
    primaryForeground: '#FFFFFF',
    background: '#ECFDF5', // Very light green
    foreground: '#047857',
    card: '#FFFFFF',
    cardForeground: '#047857',
    popover: '#FFFFFF',
    popoverForeground: '#047857',
    muted: '#D1FAE5', // Light green
    mutedForeground: '#059669',
    accent: '#6EE7B7', // Medium green
    accentForeground: '#047857',
    border: '#A7F3D0',
    input: '#ECFDF5',
    ring: '#10B981',
    gradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #6EE7B7 100%)'
  },
  5: { // Great
    name: 'great',
    primary: '#3B82F6', // Bright blue
    primaryForeground: '#FFFFFF',
    background: '#EFF6FF', // Very light blue
    foreground: '#1E40AF',
    card: '#FFFFFF',
    cardForeground: '#1E40AF',
    popover: '#FFFFFF',
    popoverForeground: '#1E40AF',
    muted: '#DBEAFE', // Light blue
    mutedForeground: '#2563EB',
    accent: '#93C5FD', // Medium blue
    accentForeground: '#1E40AF',
    border: '#BFDBFE',
    input: '#EFF6FF',
    ring: '#3B82F6',
    gradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #93C5FD 100%)'
  }
};

export const moods: MoodOption[] = [
  { emoji: "😢", label: "Very Sad", value: 0 },
  { emoji: "😔", label: "Sad", value: 1 },
  { emoji: "😰", label: "Anxious", value: 2 },
  { emoji: "🕊️", label: "Okay", value: 3 },
  { emoji: "🌞", label: "Good", value: 4 },
  { emoji: "🚀", label: "Great", value: 5 }
];

export const dailyTips: DailyTip[] = [
  {
    category: "Mindfulness",
    tip: "Take 5 deep breaths. Focus on the sensation of air entering and leaving your body. This simple practice can help center you in the present moment."
  },
  {
    category: "Self-Care",
    tip: "Remember that it's okay to take breaks. Your mental health is just as important as your physical health. Be kind to yourself today."
  },
  {
    category: "Connection",
    tip: "Reach out to someone you care about today. A simple text or call can strengthen bonds and remind both of you that you're not alone."
  },
  {
    category: "Gratitude",
    tip: "Write down three things you're grateful for today. They can be small moments or big achievements - both matter equally."
  },
  {
    category: "Movement",
    tip: "Even 10 minutes of gentle movement can boost your mood. Try stretching, walking, or dancing to your favorite song."
  },
  {
    category: "Boundaries",
    tip: "It's perfectly okay to say 'no' to things that drain your energy. Setting healthy boundaries is an act of self-respect."
  }
];

export const features: Feature[] = [
  {
    id: "ai-chatbot",
    icon: <MessageCircle className="h-5 w-5" />,
    title: "AI Chatbot",
    description: "24/7 empathetic support in your language",
    status: "coming-soon"
  },
  {
    id: "self-assessment",
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Self-Assessment",
    description: "Understand your mental health with clinical tools",
    status: "available"
  },
  {
    id: "daily-journaling",
    icon: <BookOpen className="h-5 w-5" />,
    title: "Daily Journal",
    description: "Private space for thoughts and reflection",
    status: "available"
  },
  {
    id: "crisis-support",
    icon: <Phone className="h-5 w-5" />,
    title: "Crisis Support",
    description: "Immediate help when you need it most",
    status: "available"
  },
  {
    id: "peer-support",
    icon: <Users className="h-5 w-5" />,
    title: "Peer Support",
    description: "Connect safely with other students",
    status: "available"
  },
  {
    id: "resource-hub",
    icon: <Music className="h-5 w-5" />,
    title: "Resource Hub",
    description: "Helpful content and wellness resources",
    status: "coming-soon"
  }
];

export const moodGreetings: MoodGreeting[] = [
  { mood: 0, text: "We're here for you", icon: "🤗" },
  { mood: 1, text: "Take it one step at a time", icon: "🌱" },
  { mood: 2, text: "You're doing great", icon: "💙" },
  { mood: 3, text: "Good to see you", icon: "👋" },
  { mood: 4, text: "Looking bright today!", icon: "🌟" },
  { mood: 5, text: "Wonderful energy!", icon: "✨" }
];

export const actionsByMood: Record<number, string[]> = {
  0: ["Crisis Support", "Self-Assessment", "Daily Journaling"],
  1: ["Daily Journaling", "Self-Assessment", "Crisis Support"],
  2: ["Self-Assessment", "AI Chatbot", "Daily Journaling"],
  3: ["Daily Journaling", "Resource Hub", "AI Chatbot"],
  4: ["Peer Support", "Resource Hub", "Daily Journaling"],
  5: ["Peer Support", "Resource Hub", "AI Chatbot"]
};