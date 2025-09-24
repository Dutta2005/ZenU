"use client"

import * as React from "react"
import { FeatureCard, CrisisCard } from "@/components/ui/mh-card"
import { 
  MessageCircle, 
  ClipboardList, 
  BookOpen, 
  Phone, 
  Users, 
  Music,
  Heart,
  Sparkles 
} from "lucide-react"

const features = [
  {
    id: "ai-chatbot",
    icon: <MessageCircle className="h-5 w-5" />,
    title: "AI Chatbot",
    description: "24/7 empathetic support in your language",
    status: "coming-soon" as const
  },
  {
    id: "self-assessment",
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Self-Assessment",
    description: "Understand your mental health with clinical tools",
    status: "coming-soon" as const
  },
  {
    id: "daily-journaling",
    icon: <BookOpen className="h-5 w-5" />,
    title: "Daily Journaling",
    description: "Private space for thoughts and reflection",
    status: "coming-soon" as const
  },
  {
    id: "crisis-support",
    icon: <Phone className="h-5 w-5" />,
    title: "Crisis Support",
    description: "Immediate help when you need it most",
    status: "available" as const
  },
  {
    id: "peer-support",
    icon: <Users className="h-5 w-5" />,
    title: "Peer Support",
    description: "Connect safely with other students",
    status: "coming-soon" as const
  },
  {
    id: "resource-hub",
    icon: <Music className="h-5 w-5" />,
    title: "Resource Hub",
    description: "Helpful content and wellness resources",
    status: "coming-soon" as const
  }
]

interface DashboardProps {
  userMood?: number
  onFeatureClick: (featureId: string) => void
  onCrisisClick: () => void
}

export function Dashboard({ userMood = 3, onFeatureClick, onCrisisClick }: DashboardProps) {
  const moodGreeting = React.useMemo(() => {
    const greetings = [
      { mood: 0, text: "We're here for you", icon: "🤗" },
      { mood: 1, text: "Take it one step at a time", icon: "🌱" },
      { mood: 2, text: "You're doing great", icon: "💙" },
      { mood: 3, text: "Good to see you", icon: "👋" },
      { mood: 4, text: "Looking bright today!", icon: "🌟" },
      { mood: 5, text: "Wonderful energy!", icon: "✨" }
    ]
    
    return greetings[userMood] || greetings[3]
  }, [userMood])

  const suggestedActions = React.useMemo(() => {
    const actionsByMood = {
      0: ["Crisis Support", "Self-Assessment", "Daily Journaling"],
      1: ["Daily Journaling", "Self-Assessment", "Crisis Support"],
      2: ["Self-Assessment", "AI Chatbot", "Daily Journaling"],
      3: ["Daily Journaling", "Resource Hub", "AI Chatbot"],
      4: ["Peer Support Forum", "Resource Hub", "Daily Journaling"],
      5: ["Peer Support Forum", "Resource Hub", "AI Chatbot"]
    }
    
    return actionsByMood[userMood as keyof typeof actionsByMood] || actionsByMood[3]
  }, [userMood])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 py-6 max-w-md mx-auto">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-3xl">{moodGreeting.icon}</span>
            <h1 className="text-3xl sm:text-4xl font-semibold">ZenU</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">
            {moodGreeting.text}
          </p>
        </div>
      </header>

      {/* Quick Actions based on mood */}
      {userMood <= 2 && (
        <section className="px-4 pb-6 max-w-md mx-auto">
          <CrisisCard onEmergencyClick={onCrisisClick} />
        </section>
      )}

      {/* Suggested for you */}
      <section className="px-4 pb-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-medium">Suggested for you</h2>
          </div>
          <div className="space-y-3">
            {features
              .filter(feature => suggestedActions.includes(feature.title))
              .slice(0, 2)
              .map((feature) => (
                <FeatureCard
                  key={feature.id}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  status={feature.status}
                  onClick={() => onFeatureClick(feature.id)}
                  className="transition-all duration-200"
                />
              ))}
          </div>
        </div>
      </section>

      {/* All Features */}
      <section className="px-4 pb-8 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-medium">All Features</h2>
          </div>
          <div className="space-y-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                status={feature.status}
                onClick={() => onFeatureClick(feature.id)}
                className="transition-all duration-200"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Support message */}
      <footer className="px-4 pb-8 max-w-md mx-auto">
        <div className="text-center p-4 sm:p-6 bg-muted/30 rounded-2xl">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Remember: You are not alone in this journey. Every step forward, no matter how small, is progress.
          </p>
        </div>
      </footer>
    </div>
  )
}