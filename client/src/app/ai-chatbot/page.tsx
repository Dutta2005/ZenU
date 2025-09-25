"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle } from "lucide-react"
import { moodPalettes } from '@/lib/constants'
import type { Feature } from '@/lib/types'
import ComingSoonView from '@/components/coming-soon'

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
  const currentPalette = moodPalettes[userMood] || moodPalettes[3]

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

  return (
    <ComingSoonView 
      feature={feature}
      palette={currentPalette}
      onBack={handleBack}
    />
  )
}