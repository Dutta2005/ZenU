"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { MHCard } from "@/components/ui/mh-card"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface ComingSoonProps {
  title: string
  description: string
  icon: React.ReactNode
  estimatedLaunch?: string
}

export function ComingSoon({ 
  title, 
  description, 
  icon, 
  estimatedLaunch = "Soon" 
}: ComingSoonProps) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="content-safe py-4 flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-headline">{title}</h1>
          <p className="text-caption">Feature in development</p>
        </div>
      </header>

      {/* Coming Soon Content */}
      <div className="content-safe py-16">
        <MHCard className="text-center p-8 space-y-6">
          <div className="mx-auto w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-primary">
            {icon}
          </div>
          
          <div className="space-y-3">
            <h2 className="text-headline">{title}</h2>
            <p className="text-body-large text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 space-y-2">
            <p className="text-sm font-medium">Coming {estimatedLaunch}</p>
            <p className="text-xs text-muted-foreground">
              We're working hard to bring you this feature. Stay tuned for updates!
            </p>
          </div>

          <Button
            onClick={() => router.push('/')}
            className="rounded-xl"
          >
            Back to Dashboard
          </Button>
        </MHCard>

        {/* Feature Details */}
        <div className="mt-8 space-y-4">
          <h3 className="text-headline">What to expect:</h3>
          <div className="space-y-3">
            {title === "AI Chatbot" && (
              <>
                <MHCard className="p-4">
                  <p className="text-sm">🌐 Multi-language support for regional languages</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">🤖 Empathetic AI trained on mental health conversations</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">🔒 Private and secure conversations</p>
                </MHCard>
              </>
            )}
            
            {title === "Self-Assessment" && (
              <>
                <MHCard className="p-4">
                  <p className="text-sm">📋 PHQ-9 and GAD-7 validated questionnaires</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">📊 Progress tracking over time</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">💡 Personalized insights and recommendations</p>
                </MHCard>
              </>
            )}
            
            {title === "Daily Journaling" && (
              <>
                <MHCard className="p-4">
                  <p className="text-sm">🔐 End-to-end encryption for privacy</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">📝 Guided prompts and reflection tools</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">📈 Mood pattern recognition</p>
                </MHCard>
              </>
            )}
            
            {(title === "Peer Support" || title === "Peer Support Forum") && (
              <>
                <MHCard className="p-4">
                  <p className="text-sm">👥 Safe, moderated community space</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">🛡️ Anonymous posting options</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">💬 Peer support groups and discussions</p>
                </MHCard>
              </>
            )}
            
            {title === "Resource Hub" && (
              <>
                <MHCard className="p-4">
                  <p className="text-sm">🎵 Curated wellness music and sounds</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">🎥 Educational videos and content</p>
                </MHCard>
                <MHCard className="p-4">
                  <p className="text-sm">📚 Mental health articles and guides</p>
                </MHCard>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}