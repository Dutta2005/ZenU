import React from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles, Heart } from "lucide-react";
import { FeatureCard, CrisisCard } from './Card';
import type { DashboardProps } from '@/lib/types';

const Dashboard: React.FC<DashboardProps> = ({
  userMood,
  palette,
  moodGreeting,
  suggestedActions,
  features,
  onFeatureClick,
  onCrisisClick,
  onMoodCheckIn
}) => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.background }}>
      {/* Header */}
      <header className="px-4 py-6 max-w-md mx-auto">
        <div className="text-center space-y-3">
            <h1
              className="text-2xl text-left sm:text-4xl font-sour-gummy font-bold"
              style={{ color: palette.foreground }}
            >
              Welcome back
            </h1>
        </div>
      </header>

      {/* Crisis Support for low moods */}
      {userMood <= 2 && (
        <section className="px-4 pb-6 max-w-md mx-auto">
          <CrisisCard onEmergencyClick={onCrisisClick} />
        </section>
      )}

      {/* Suggested Features */}
      <section className="px-4 pb-6 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5" style={{ color: palette.primary }} />
            <h2 
              className="text-xl font-medium" 
              style={{ color: palette.foreground }}
            >
              Suggested for you
            </h2>
          </div>
          <div className="space-y-3">
            {features
              .filter(feature => suggestedActions.includes(feature.title))
              .slice(0, 2)
              .map((feature) => (
                <FeatureCard
                  key={feature.id}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  status={feature.status}
                  onClick={() => onFeatureClick(feature.id)}
                  className="transition-all duration-200"
                  palette={palette}
                />
              ))}
          </div>
        </div>
      </section>

      {/* All Features */}
      <section className="px-4 pb-8 max-w-md mx-auto">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Heart className="h-5 w-5" style={{ color: palette.primary }} />
            <h2 
              className="text-xl font-medium" 
              style={{ color: palette.foreground }}
            >
              All Features
            </h2>
          </div>
          <div className="space-y-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                status={feature.status}
                onClick={() => onFeatureClick(feature.id)}
                className="transition-all duration-200"
                palette={palette}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Support message */}
      <footer className="px-4 pb-8 max-w-md mx-auto">
        <div 
          className="text-center p-4 sm:p-6 rounded-2xl"
          style={{ backgroundColor: `${palette.muted}50` }}
        >
          <p 
            className="text-sm leading-relaxed" 
            style={{ color: palette.mutedForeground }}
          >
            Remember: You are not alone in this journey. Every step forward, no matter how small, is progress.
          </p>
        </div>
      </footer>

      {/* Floating mood check-in button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        <Button
          onClick={onMoodCheckIn}
          className="rounded-full w-14 h-14 sm:w-12 sm:h-12 shadow-lg text-xl transition-all duration-300 hover:scale-110"
          size="icon"
          style={{ 
            backgroundColor: `${palette.primary}20`,
            color: palette.primary,
            border: `2px solid ${palette.primary}40`
          }}
        >
          😊
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;