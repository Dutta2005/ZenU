"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import Dashboard from "@/components/dashboard"
import MoodCheckInModal from "@/components/mood-check-in"
import { moodPalettes, features, dailyTips } from '@/lib/constants'
import { useModal } from '@/context/ModalContext'

const moodToThemeMap = {
  0: "sad",        // Very sad
  1: "sad",        // Sad  
  2: "anxious",    // Anxious
  3: "calm",       // Okay
  4: "happy",      // Good
  5: "energetic"   // Great
}

const moodGreetings = {
  0: "I see you're having a tough time",
  1: "Things feel difficult right now",
  2: "You seem a bit anxious today",
  3: "You're doing okay today",
  4: "You're feeling good today",
  5: "You're having an amazing day!"
}

const suggestedActionsByMood = {
  0: ["Crisis Support", "Self-Assessment"],        // Very sad - immediate help + understanding mental state
  1: ["Self-Assessment", "AI Chatbot"],         // Sad - self-reflection and journaling
  2: ["Self-Assessment", "Resource Hub"],          // Anxious - assessment tools + helpful resources
  3: ["Daily Journal", "Peer Support"],            // Okay - regular journaling + community connection
  4: ["Daily Journal", "Peer Support"],            // Good - continue positive practices
  5: ["Peer Support", "Resource Hub"]              // Great - share positivity + explore resources
}

export default function Home() {
  const router = useRouter()
  const { setTheme } = useTheme()
  const { isMoodCheckInOpen, setIsMoodCheckInOpen } = useModal()
  const [userMood, setUserMood] = React.useState<number>(3)
  const [currentThemeKey, setCurrentThemeKey] = React.useState<string>("calm")
  
  // Check if user has already done check-in today
  React.useEffect(() => {
    const today = new Date().toDateString()
    const lastCheckIn = localStorage.getItem("lastMoodCheckIn")
    
    if (lastCheckIn === today) {
      const savedMood = localStorage.getItem("userMood")
      const savedTheme = localStorage.getItem("currentTheme")
      
      if (savedMood && savedTheme) {
        const moodValue = parseInt(savedMood)
        setUserMood(moodValue)
        setCurrentThemeKey(savedTheme)
        setTheme(savedTheme)
        setIsMoodCheckInOpen(false)
      }
    } else {
      setIsMoodCheckInOpen(true)
    }
  }, [setTheme, setIsMoodCheckInOpen])

  const handleMoodCheckInComplete = (mood: number, themeKey: string) => {
    setUserMood(mood)
    
    // Map mood to theme
    const theme = moodToThemeMap[mood as keyof typeof moodToThemeMap] || "calm"
    setCurrentThemeKey(theme)
    setTheme(theme)
    setIsMoodCheckInOpen(false)
    
    // Save to localStorage
    const today = new Date().toDateString()
    localStorage.setItem("lastMoodCheckIn", today)
    localStorage.setItem("userMood", mood.toString())
    localStorage.setItem("currentTheme", theme)
  }

  const handleMoodCheckInSkip = () => {
    setIsMoodCheckInOpen(false)
    setTheme("calm")
  }

  const handleFeatureClick = (featureId: string) => {
    router.push(`/${featureId}`)
  }

  const handleCrisisClick = () => {
    router.push("/crisis-support")
  }

  const handleMoodCheckInOpen = () => {
    setIsMoodCheckInOpen(true)
  }

  // Get current palette
  const currentPalette = moodPalettes[userMood] || moodPalettes[3]
  
  // Get today's tip
  const todaysTip = dailyTips[Math.floor(Math.random() * dailyTips.length)]
  
  // Get suggested actions for current mood
  const suggestedActions = suggestedActionsByMood[userMood as keyof typeof suggestedActionsByMood] || []
  
  // Get mood greeting
  const moodGreeting = moodGreetings[userMood as keyof typeof moodGreetings] || moodGreetings[3]

  return (
    <>
      <MoodCheckInModal
        isOpen={isMoodCheckInOpen}
        userMood={userMood}
        palette={currentPalette}
        todaysTip={todaysTip}
        onMoodChange={(mood: number, theme: string) => {
          setUserMood(mood)
          setCurrentThemeKey(theme)
        }}
        onComplete={handleMoodCheckInComplete}
        onSkip={handleMoodCheckInSkip}
      />
      
      {!isMoodCheckInOpen && (
        <Dashboard
          userMood={userMood}
          palette={currentPalette}
          moodGreeting={moodGreeting}
          suggestedActions={suggestedActions}
          features={features}
          onFeatureClick={handleFeatureClick}
          onCrisisClick={handleCrisisClick}
          onMoodCheckIn={handleMoodCheckInOpen}
        />
      )}
    </>
  )
}