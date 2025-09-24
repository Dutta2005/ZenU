"use client"

import * as React from "react"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const moodEmojis = [
  { emoji: "😢", label: "Very sad", value: 0, theme: "sad" },
  { emoji: "😔", label: "Sad", value: 1, theme: "sad" },
  { emoji: "😰", label: "Anxious", value: 2, theme: "anxious" },
  { emoji: "😐", label: "Okay", value: 3, theme: "calm" },
  { emoji: "🙂", label: "Good", value: 4, theme: "happy" },
  { emoji: "😊", label: "Great", value: 5, theme: "energetic" },
]

interface EmojiSliderProps {
  value: number
  onValueChange: (value: number, theme: string) => void
  className?: string
}

export function EmojiSlider({ value, onValueChange, className }: EmojiSliderProps) {
  const currentMood = moodEmojis[value] || moodEmojis[3]

  const handleValueChange = (newValue: number[]) => {
    const moodValue = newValue[0]
    const mood = moodEmojis[moodValue]
    onValueChange(moodValue, mood.theme)
  }

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Current mood display */}
      <div className="text-center space-y-4">
        <div className="text-7xl sm:text-8xl transition-all duration-300 ease-out" key={currentMood.emoji}>
          {currentMood.emoji}
        </div>
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-medium">{currentMood.label}</h3>
          <p className="text-sm text-muted-foreground">How are you feeling today?</p>
        </div>
      </div>

      {/* Slider */}
      <div className="px-2">
        <Slider
          value={[value]}
          onValueChange={handleValueChange}
          max={5}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      {/* Mood labels */}
      <div className="flex justify-between text-xs text-muted-foreground px-2">
        <span>Not great</span>
        <span>Amazing</span>
      </div>
    </div>
  )
}