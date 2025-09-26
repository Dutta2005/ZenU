"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MHCard } from "@/components/ui/mh-card"
import { Phone, MessageSquare, ArrowLeft, Heart, Clock, Users, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import DynamicStyles from '@/components/DynamicStyle'
import { moodPalettes } from '@/lib/constants'

const nationalHotlines = [
  {
    name: "988 Suicide & Crisis Lifeline",
    number: "988",
    description: "24/7 crisis support for mental health, substance use, and emotional distress",
    type: "call",
    features: ["Call", "Text", "Chat online"],
    isMain: true
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    description: "24/7 confidential support via text with trained crisis counselors",
    type: "text",
    features: ["Text only", "Anonymous", "Free"],
    isMain: true
  },
  {
    name: "NAMI HelpLine",
    number: "1-800-950-NAMI (6264)",
    description: "Information, referrals and support for mental health concerns",
    type: "call",
    features: ["Mon-Fri 10am-10pm ET", "Text NAMI to 62640"],
    isMain: false
  }
]

const campusSupport = {
  name: "University Counseling Center",
  description: "Connect with on-campus mental health professionals",
  features: [
    "Licensed counselors who understand student life",
    "Free or low-cost services for enrolled students", 
    "Crisis intervention and ongoing support",
    "Familiar with academic stress and college challenges"
  ],
  contactMethods: [
    {
      method: "Emergency Line",
      number: "9878453210",
      available: "24/7",
      type: "call"
    },
    {
      method: "Counseling Center",
      number: "8951234567",
      available: "Business Hours",
      type: "call"
    },
    {
      method: "Online Chat",
      number: "123-456-7890",
      available: "Check availability",
      type: "chat"
    }
  ]
}

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

  const handleCall = (number: string) => {
    // Clean the number for calling
    const cleanNumber = number.replace(/\D/g, '')
    if (cleanNumber) {
      window.location.href = `tel:${cleanNumber}`
    }
  }

  const handleText = (service: string) => {
    if (service === "crisis-text-line") {
      window.location.href = "sms:741741?body=HOME"
    } else if (service === "nami-text") {
      window.location.href = "sms:62640?body=NAMI"
    }
  }

  const handle988Chat = () => {
    window.open('https://988lifeline.org/chat/', '_blank')
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
          <h1 className="text-headline text-primary font-semibold">Crisis Support</h1>
          <p className="text-caption text-primary">You're not alone - help is available</p>
        </div>
      </header>

      {/* Emergency Banner */}
      <section className="content-safe pb-6">
        <MHCard variant="crisis" className="transition-opacity duration-300">
          <div className="p-6 text-center space-y-4">
            <div className="text-3xl">🚨</div>
            <h2 className="text-xl font-semibold text-crisis">
              Life-threatening emergency?
            </h2>
            <p className="text-sm text-foreground/80">
              Call 911 immediately or go to your nearest emergency room
            </p>
            <Button
              onClick={() => handleCall("911")}
              className="w-full mh-button-crisis"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call 911 Now
            </Button>
          </div>
        </MHCard>
      </section>

      {/* Main Support Options */}
      <section className="content-safe pb-8">
        <div className="space-y-6">
          <h2 className="text-headline flex items-center space-x-2 text-primary">
            <Heart className="h-5 w-5 text-primary" />
            <span>Get Support Right Now</span>
          </h2>

          {/* Option 1: National Hotlines */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-primary">National Mental Health Hotlines</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Connect with trained crisis counselors nationwide - available 24/7
            </p>
            
            <div className="space-y-3">
              {nationalHotlines.map((hotline, index) => (
                <MHCard
                  key={index}
                  variant={hotline.isMain ? "default" : "default"}
                  className="transition-all duration-200"
                >
                  <div className="p-5 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-base text-primary">{hotline.name}</h4>
                        <p className="text-lg font-bold text-primary mt-1">{hotline.number}</p>
                        <p className="text-xs text-muted-foreground mt-2">{hotline.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {hotline.features.map((feature, featureIndex) => (
                        <span 
                          key={featureIndex}
                          className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      {hotline.type === "call" && (
                        <>
                          <Button
                            onClick={() => handleCall(hotline.number)}
                            className="flex-1"
                            size="sm"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call Now
                          </Button>
                          {hotline.number === "988" && (
                            <Button
                              onClick={handle988Chat}
                              variant="outline"
                              size="sm"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Chat Online
                            </Button>
                          )}
                        </>
                      )}
                      {hotline.type === "text" && (
                        <Button
                          onClick={() => handleText("crisis-text-line")}
                          className="flex-1"
                          size="sm"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Text Now
                        </Button>
                      )}
                      {hotline.name === "NAMI HelpLine" && (
                        <Button
                          onClick={() => handleText("nami-text")}
                          variant="outline"
                          size="sm"
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Text NAMI
                        </Button>
                      )}
                    </div>
                  </div>
                </MHCard>
              ))}
            </div>
          </div>

          {/* Option 2: Campus Support */}
          <div className="space-y-4 mt-8">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-primary">University On-Campus Counseling</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Connect with counselors who understand student life and academic pressures
            </p>
            
            <MHCard className="transition-all duration-200">
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="font-semibold text-base text-primary">{campusSupport.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{campusSupport.description}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">Why choose campus counseling:</p>
                  <ul className="space-y-1">
                    {campusSupport.features.map((feature, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start space-x-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 pt-2 border-t border-border">
                  <p className="text-sm font-medium text-primary">Contact your campus:</p>
                  {campusSupport.contactMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">{method.method}</p>
                        <p className="text-xs text-muted-foreground">{method.available}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">{method.number}</p>
                        {method.type === "call" && method.number !== "Your Campus Crisis Line" && method.number !== "Your Campus Counseling Number" && (
                          <Button
                            onClick={() => handleCall(method.number)}
                            size="sm"
                            variant="outline"
                            className="mt-1"
                          >
                            <Phone className="h-3 w-3 mr-1" />
                            Call
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MHCard>
          </div>
        </div>
      </section>

      {/* Support Message */}
      <section className="content-safe pb-8">
        <MHCard variant="default" className="bg-muted/30">
          <div className="p-6 text-center space-y-3">
            <div className="text-2xl">💙</div>
            <h3 className="font-medium">Remember: Seeking help is a sign of strength</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you choose to reach out to a national hotline or your campus counseling center, 
              trained professionals are ready to listen and support you. You deserve care and help.
            </p>
          </div>
        </MHCard>
      </section>
    </div>
  )
}