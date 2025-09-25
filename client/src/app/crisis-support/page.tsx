"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MHCard } from "@/components/ui/mh-card"
import { Phone, MessageSquare, ArrowLeft, Heart, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import DynamicStyles from '@/components/DynamicStyle'
import { moodPalettes } from '@/lib/constants'

const emergencyContacts = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support and suicide prevention",
    type: "call"
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "24/7 crisis support via text",
    type: "text"
  },
  {
    name: "Campus Counseling Center",
    number: "Your University Number",
    description: "Immediate support from university counselors",
    type: "call"
  }
]

const quickActions = [
  {
    title: "I need someone to talk to right now",
    action: "call-hotline",
    icon: <Phone className="h-5 w-5" />,
    urgent: true
  },
  {
    title: "I'm having thoughts of self-harm",
    action: "emergency-call",
    icon: <Phone className="h-5 w-5" />,
    urgent: true
  },
  {
    title: "I want to chat with someone",
    action: "text-support",
    icon: <MessageSquare className="h-5 w-5" />,
    urgent: false
  },
  {
    title: "I need campus support",
    action: "campus-support",
    icon: <Heart className="h-5 w-5" />,
    urgent: false
  }
]

export default function CrisisSupport() {
  const router = useRouter()
  
  // Get user's current mood from localStorage or default to neutral
  const [userMood, setUserMood] = React.useState<number>(3)
  
  React.useEffect(() => {
    // Try to get the user's current mood from localStorage
    const savedMood = localStorage.getItem('userMood')
    if (savedMood) {
      setUserMood(parseInt(savedMood))
    }
  }, [])

  const currentPalette = moodPalettes[userMood]

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number.replace(/\D/g, '')}`
  }

  const handleTextSupport = () => {
    window.location.href = "sms:741741?body=HOME"
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "call-hotline":
        handleEmergencyCall("988")
        break
      case "emergency-call":
        handleEmergencyCall("911")
        break
      case "text-support":
        handleTextSupport()
        break
      case "campus-support":
        alert("Please contact your campus counseling center directly")
        break
    }
  }

  // Apply dynamic styles
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
      
      {/* Header */}
      <header className="content-safe py-4 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-headline text-primary">Crisis Support</h1>
          <p className="text-caption">Immediate help is available</p>
        </div>
      </header>

      {/* Emergency Banner */}
      <section className="content-safe pb-6">
        <MHCard variant="crisis" className="transition-opacity duration-300">
          <div className="p-6 text-center space-y-4">
            <div className="text-3xl">🚨</div>
            <h2 className="text-xl font-semibold text-crisis">
              If this is a life-threatening emergency
            </h2>
            <p className="text-sm text-foreground/80">
              Call 911 immediately or go to your nearest emergency room
            </p>
            <Button
              onClick={() => handleEmergencyCall("911")}
              className="w-full mh-button-crisis"
            >
              Call 911 Now
            </Button>
          </div>
        </MHCard>
      </section>

      {/* Quick Actions */}
      <section className="content-safe pb-6">
        <div className="space-y-4">
          <h2 className="text-headline flex items-center space-x-2 text-primary">
            <Clock className="h-5 w-5 text-primary" />
            <span>How can we help right now?</span>
          </h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <MHCard
                key={index}
                variant={action.urgent ? "crisis" : "default"}
                interactive
                onClick={() => handleQuickAction(action.action)}
                className="transition-all duration-200"
              >
                <div className="p-4 flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${
                    action.urgent 
                      ? "bg-crisis/20 text-crisis" 
                      : "bg-primary/20 text-primary"
                  }`}>
                    {action.icon}
                  </div>
                  <span className="flex-1 text-sm font-medium">
                    {action.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Tap to connect
                  </span>
                </div>
              </MHCard>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="content-safe pb-6">
        <div className="space-y-4">
          <h2 className="text-headline text-primary">Emergency Contacts</h2>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <MHCard
                key={index}
                interactive
                onClick={() => contact.type === "call" 
                  ? handleEmergencyCall(contact.number)
                  : handleTextSupport()
                }
                className="transition-all duration-200"
              >
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">{contact.name}</h3>
                    <div className="flex items-center space-x-2">
                      {contact.type === "call" ? (
                        <Phone className="h-4 w-4 text-primary" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-primary">
                    {contact.number}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {contact.description}
                  </p>
                </div>
              </MHCard>
            ))}
          </div>
        </div>
      </section>

      {/* Support Message */}
      <section className="content-safe pb-8">
        <MHCard variant="default" className="bg-muted/30">
          <div className="p-6 text-center space-y-3">
            <div className="text-2xl">💙</div>
            <h3 className="font-medium">You are not alone</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Reaching out for help takes courage. Every person who cares about you wants you to stay safe and get the support you need.
            </p>
          </div>
        </MHCard>
      </section>
    </div>
  )
}