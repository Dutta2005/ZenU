"use client"

import * as React from "react"
import { MoodCheckIn } from "@/components/mood-check-in"
import { Dashboard } from "@/components/dashboard"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [showMoodCheckIn, setShowMoodCheckIn] = React.useState(true)
  const [userMood, setUserMood] = React.useState<number>(3)
  const [currentTheme, setCurrentTheme] = React.useState<string>("calm")
  
  // Check if user has already done check-in today (you can make this more sophisticated)
  React.useEffect(() => {
    const today = new Date().toDateString()
    const lastCheckIn = localStorage.getItem("lastMoodCheckIn")
    
    if (lastCheckIn === today) {
      const savedMood = localStorage.getItem("currentMood")
      const savedTheme = localStorage.getItem("currentTheme")
      
      if (savedMood && savedTheme) {
        setUserMood(parseInt(savedMood))
        setCurrentTheme(savedTheme)
        setShowMoodCheckIn(false)
      }
    }
  }, [])

  const handleMoodCheckInComplete = (mood: number, theme: string) => {
    setUserMood(mood)
    setCurrentTheme(theme)
    setShowMoodCheckIn(false)
    
    // Save to localStorage
    const today = new Date().toDateString()
    localStorage.setItem("lastMoodCheckIn", today)
    localStorage.setItem("currentMood", mood.toString())
    localStorage.setItem("currentTheme", theme)
  }

  const handleMoodCheckInSkip = () => {
    setShowMoodCheckIn(false)
    // Set default calm theme if skipped
    setCurrentTheme("calm")
  }

  const handleFeatureClick = (featureId: string) => {
    // Navigate to feature pages (to be implemented)
    router.push(`/${featureId}`)
  }

  const handleCrisisClick = () => {
    // Navigate to crisis support
    router.push("/crisis-support")
  }

  // Apply theme class to document body
  React.useEffect(() => {
    document.body.className = currentTheme
  }, [currentTheme])

  return (
    <>
      <MoodCheckIn
        open={showMoodCheckIn}
        onComplete={handleMoodCheckInComplete}
        onSkip={handleMoodCheckInSkip}
      />
      
      {!showMoodCheckIn && (
        <Dashboard
          userMood={userMood}
          onFeatureClick={handleFeatureClick}
          onCrisisClick={handleCrisisClick}
        />
      )}
      
      {/* Quick access button to retake mood check-in */}
      {!showMoodCheckIn && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <Button
            onClick={() => setShowMoodCheckIn(true)}
            className="rounded-full w-14 h-14 sm:w-12 sm:h-12 bg-primary/20 text-primary hover:bg-primary/30 shadow-lg text-xl"
            size="icon"
          >
            😊
          </Button>
        </div>
      )}
    </>
  )
}
