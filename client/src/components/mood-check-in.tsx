"use client"

import * as React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { EmojiSlider } from "@/components/ui/emoji-slider"
import { TipCard } from "@/components/ui/mh-card"
import { X } from "lucide-react"

const dailyTips = [
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
]

interface MoodCheckInProps {
  open: boolean
  onComplete: (mood: number, theme: string) => void
  onSkip: () => void
}

export function MoodCheckIn({ open, onComplete, onSkip }: MoodCheckInProps) {
  const [mood, setMood] = React.useState(3) // Default to "okay"
  const [currentTheme, setCurrentTheme] = React.useState("calm")
  
  // Get today's tip (you could make this more sophisticated)
  const todaysTip = React.useMemo(() => {
    const today = new Date().getDate()
    return dailyTips[today % dailyTips.length]
  }, [])

  const handleMoodChange = (newMood: number, theme: string) => {
    setMood(newMood)
    setCurrentTheme(theme)
  }

  const handleComplete = () => {
    onComplete(mood, currentTheme)
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent 
        className="w-[95vw] max-w-lg mx-auto p-0 gap-0 border-0 bg-transparent shadow-none max-h-[95vh] overflow-y-auto"
        hideCloseButton
      >
        <div className="bg-background/95 backdrop-blur-lg rounded-3xl border border-border/50 shadow-2xl overflow-hidden">
          {/* Close button */}
          <div className="flex justify-end p-4 pb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSkip}
              className="rounded-full w-8 h-8 opacity-60 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="px-4 sm:px-6 pb-6 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold">Check-in</h2>
              <p className="text-sm text-muted-foreground">
                Let's start your day with a moment of self-reflection
              </p>
            </div>

            {/* Mood Selection */}
            <div className="py-2">
              <EmojiSlider
                value={mood}
                onValueChange={handleMoodChange}
              />
            </div>

            {/* Daily Tip */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <h3 className="text-sm font-medium text-center">
                  Today's Tip
                </h3>
              </div>
              <TipCard
                tip={todaysTip.tip}
                category={todaysTip.category}
                className="transition-all duration-300 ease-out"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                onClick={onSkip}
                className="flex-1 rounded-xl h-12"
              >
                Skip for now
              </Button>
              <Button
                onClick={handleComplete}
                className="flex-1 rounded-xl h-12 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}