"use client"

import React, { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Bot, BookOpen, AlertTriangle, Users, Settings, Globe } from 'lucide-react'
import { moodPalettes } from '@/lib/constants'
import { useModal } from '@/context/ModalContext'

interface MoodPalette {
  name: string;
  primary: string;
  primaryForeground: string;
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  input: string;
  ring: string;
  gradient: string;
}

function FloatingBottomNavbar() {
  const router = useRouter()
  const pathname = usePathname()
  const { isMoodCheckInOpen } = useModal()
  const [userMood, setUserMood] = useState<number>(3)
  const [activeTab, setActiveTab] = useState<string>('home')
  
  // Get mood from localStorage
  useEffect(() => {
    const savedMood = localStorage.getItem("userMood")
    if (savedMood) {
      setUserMood(parseInt(savedMood))
    }
  }, [])

  const hiddenRoutes = ['/admin/dashboard'];
  const shouldHideNavbar = hiddenRoutes.some(route => pathname.startsWith(route))

  console.log('Current pathname:', pathname)
  console.log('Should hide navbar:', shouldHideNavbar)

  if (shouldHideNavbar) {
    return null
  }

  // Don't render if mood check-in modal is open
  if (isMoodCheckInOpen) {
    return null
  }

  // Get current palette based on mood
  const currentPalette: MoodPalette = moodPalettes[userMood] || moodPalettes[3]

  const navItems = [
    {
      id: 'ai-chat',
      icon: Bot,
      path: '/ai-chatbot'
    },
    {
      id: 'journal',
      icon: BookOpen,
      path: '/daily-journaling'
    },
    // SOS button will be handled separately
    {
      id: 'community',
      icon: Globe,
      path: '/peer-support'
    },
    {
      id: 'settings',
      icon: Settings,
      path: '/settings'
    }
  ]

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id)
    router.push(item.path)
  }

  const handleSOSClick = () => {
    setActiveTab('sos')
    router.push('/crisis-support')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      {/* Main Navbar Container */}
      <div className="relative mx-4 mb-4">
        {/* SOS Button - Elevated Circle */}
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-4 z-10">
          <button
            onClick={handleSOSClick}
            className="w-12 h-12 rounded-full shadow-4xl border-4 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center group"
            style={{
              backgroundColor: currentPalette.primary,
              boxShadow: `0 8px 32px ${currentPalette.primary}40`
            }}
          >
            <AlertTriangle 
              className="w-5 h-5 transition-all duration-200 group-hover:animate-pulse" 
              style={{ color: currentPalette.primaryForeground }}
            />
          </button>
          {/* SOS Label */}
          <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
            <span 
              className="text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap"
              style={{ 
                color: currentPalette.primary,
                backgroundColor: `${currentPalette.primary}15`
              }}
            >
              SOS
            </span>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div 
          className="backdrop-blur-lg rounded-2xl border shadow-2xl overflow-hidden"
          style={{ 
            backgroundColor: `${currentPalette.card}95`,
            borderColor: `${currentPalette.border}60`,
            boxShadow: `0 8px 32px ${currentPalette.primary}20`
          }}
        >
          <div className="flex items-center justify-center px-4 py-3 relative">
            {/* Left Side Items */}
            <div className="flex flex-1 justify-center gap-2">
              {navItems.slice(0, 2).map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className="flex flex-col items-center space-y-1 px-2 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 min-w-0 flex-1"
                    style={{
                      backgroundColor: isActive ? `${currentPalette.primary}15` : 'transparent'
                    }}
                  >
                    <Icon 
                      className="w-5 h-5 transition-colors duration-200" 
                      style={{ 
                        color: isActive ? currentPalette.primary : currentPalette.mutedForeground 
                      }}
                    />
                  </button>
                )
              })}
            </div>

            {/* Center Space for SOS Button */}
            <div className="w-16 flex-shrink-0"></div>

            {/* Right Side Items */}
            <div className="flex flex-1 justify-center gap-2">
              {navItems.slice(2).map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.id
                
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className="flex flex-col items-center space-y-1 px-2 py-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 min-w-0 flex-1"
                    style={{
                      backgroundColor: isActive ? `${currentPalette.primary}15` : 'transparent'
                    }}
                  >
                    <Icon 
                      className="w-5 h-5 transition-colors duration-200" 
                      style={{ 
                        color: isActive ? currentPalette.primary : currentPalette.mutedForeground 
                      }}
                    />
                  </button>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FloatingBottomNavbar