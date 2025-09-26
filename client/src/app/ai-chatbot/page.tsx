"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle } from "lucide-react"
import { moodPalettes } from '@/lib/constants'
import type { Feature } from '@/lib/types'
import ComingSoonView from '@/components/coming-soon'
import DynamicStyles from '@/components/DynamicStyle'

export default function AIChatbotPage() {
  const router = useRouter()
  const [userMood, setUserMood] = useState<number>(3)

  // Get mood from localStorage
  useEffect(() => {
    const savedMood = localStorage.getItem("userMood")
    if (savedMood) {
      setUserMood(parseInt(savedMood))
    }
  }, [])

  // Get current palette based on mood
  const currentPalette = moodPalettes[userMood]

  // Create feature object
  const feature: Feature = {
    id: 'ai-chatbot',
    title: 'AI Chatbot',
    description: '24/7 empathetic support in your language',
    icon: <MessageCircle className="h-8 w-8" />,
    status: 'coming-soon'
  }

  const handleBack = () => {
    router.back()
  }

  const dynamicStyles: React.CSSProperties = {
        '--primary': currentPalette.primary,
        '--primary-foreground': currentPalette.primaryForeground,
        '--background': currentPalette.background,
        '--foreground': currentPalette.foreground,
        '--card': currentPalette.card,
        '--card-foreground': currentPalette.cardForeground,
        '--muted': currentPalette.muted,
        '--muted-foreground': currentPalette.mutedForeground,
        '--accent': currentPalette.accent,
        '--accent-foreground': currentPalette.accentForeground,
        '--border': currentPalette.border,
        '--ring': currentPalette.ring,
        background: currentPalette.gradient
      } as React.CSSProperties

  return (
    <div className="min-h-screen fade-in" style={dynamicStyles}>
      <DynamicStyles palette={currentPalette} />
    <ComingSoonView 
      feature={feature}
      palette={currentPalette}
      onBack={handleBack}
    />
    </div>
  )
}