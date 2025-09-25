'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // Add this import
import MoodCheckInModal from '@/components/mood-check-in';
import Dashboard from '@/components/dashboard';
import ComingSoonView from '@/components/coming-soon';
import DynamicStyles from '@/components/DynamicStyle';
import { 
  moodPalettes, 
  dailyTips, 
  features, 
  moodGreetings, 
  actionsByMood 
} from '@/lib/constants';
import type { 
  ViewType, 
  Feature, 
  MoodGreeting, 
  DailyTip 
} from '@/lib/types';

// Main App Component
const ZenUApp: React.FC = () => {
  const router = useRouter(); // Add router hook
  const [showMoodCheckIn, setShowMoodCheckIn] = React.useState<boolean>(true);
  const [userMood, setUserMood] = React.useState<number>(3);
  const [currentTheme, setCurrentTheme] = React.useState<string>("okay");
  const [currentView, setCurrentView] = React.useState<ViewType>("dashboard");
  const [selectedFeature, setSelectedFeature] = React.useState<Feature | null>(null);

  // Load saved mood from localStorage on component mount
  React.useEffect(() => {
    const savedMood = localStorage.getItem('userMood');
    if (savedMood) {
      const moodValue = parseInt(savedMood);
      setUserMood(moodValue);
      // Also set the corresponding theme
      const moodThemes = ["very-sad", "sad", "okay", "good", "great"];
      setCurrentTheme(moodThemes[moodValue] || 'okay');
    }
  }, []);

  const currentPalette = moodPalettes[userMood];
  
  // Get today's tip
  const todaysTip: DailyTip = React.useMemo(() => {
    const today = new Date().getDate();
    return dailyTips[today % dailyTips.length];
  }, []);

  const moodGreeting: MoodGreeting = React.useMemo(() => {
    return moodGreetings[userMood] || moodGreetings[3];
  }, [userMood]);

  const suggestedActions: string[] = React.useMemo(() => {
    return actionsByMood[userMood] || actionsByMood[3];
  }, [userMood]);

  const handleMoodChange = (newMood: number, theme: string): void => {
    setUserMood(newMood);
    setCurrentTheme(theme);
    // Save to localStorage when mood changes
    localStorage.setItem('userMood', newMood.toString());
  };

  const handleMoodCheckInComplete = (mood: number, theme: string): void => {
    setUserMood(mood);
    setCurrentTheme(theme);
    setShowMoodCheckIn(false);
    // Save to localStorage when mood check-in is completed
    localStorage.setItem('userMood', mood.toString());
  };

  const handleMoodCheckInSkip = (): void => {
    setShowMoodCheckIn(false);
    setCurrentTheme("okay");
  };

  const handleFeatureClick = (featureId: string): void => {
    if (featureId === "crisis-support") {
      // Redirect to dedicated crisis support page
      router.push('/crisis-support');
    } else {
      const feature = features.find(f => f.id === featureId);
      if (feature) {
        setSelectedFeature(feature);
        setCurrentView("coming-soon");
      }
    }
  };

  const handleCrisisClick = (): void => {
    // Redirect to dedicated crisis support page
    router.push('/crisis-support');
  };

  const handleBackToDashboard = (): void => {
    setCurrentView("dashboard");
    setSelectedFeature(null);
  };

  const handleOpenMoodCheckIn = (): void => {
    setShowMoodCheckIn(true);
  };

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
  } as React.CSSProperties;

  return (
    <div className="min-h-screen fade-in" style={dynamicStyles}>
      <DynamicStyles palette={currentPalette} />
      
      {/* Mood Check-in Modal */}
      <MoodCheckInModal
        isOpen={showMoodCheckIn}
        userMood={userMood}
        palette={currentPalette}
        todaysTip={todaysTip}
        onMoodChange={handleMoodChange}
        onComplete={handleMoodCheckInComplete}
        onSkip={handleMoodCheckInSkip}
      />

      {/* Removed Crisis View - now redirects to dedicated page */}

      {/* Coming Soon View */}
      {currentView === "coming-soon" && selectedFeature && (
        <ComingSoonView
          feature={selectedFeature}
          palette={currentPalette}
          onBack={handleBackToDashboard}
        />
      )}

      {/* Dashboard */}
      {currentView === "dashboard" && !showMoodCheckIn && (
        <Dashboard
          userMood={userMood}
          palette={currentPalette}
          moodGreeting={moodGreeting}
          suggestedActions={suggestedActions}
          features={features}
          onFeatureClick={handleFeatureClick}
          onCrisisClick={handleCrisisClick}
          onMoodCheckIn={handleOpenMoodCheckIn}
        />
      )}
    </div>
  );
};

export default ZenUApp;