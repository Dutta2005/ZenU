import React from "react";
import { FeatureCard } from "./Card";
import type { DashboardProps } from "@/lib/types";
import { User } from "lucide-react";

const Dashboard: React.FC<DashboardProps> = ({
  userMood,
  palette,
  moodGreeting,
  suggestedActions,
  features,
  onFeatureClick,
  onCrisisClick,
  onMoodCheckIn,
}) => {
  // Helper function to check if a feature is suggested based on user mood
  const isFeatureSuggested = (featureTitle: string) => {
    return suggestedActions.some(action => 
      action.toLowerCase().replace(/\s+/g, '-') === featureTitle.toLowerCase().replace(/\s+/g, '-') ||
      action.toLowerCase() === featureTitle.toLowerCase()
    );
  };

  // Sort features to show suggested ones first
  const sortedFeatures = [...features].sort((a, b) => {
    const aIsSuggested = isFeatureSuggested(a.title);
    const bIsSuggested = isFeatureSuggested(b.title);
    
    if (aIsSuggested && !bIsSuggested) return -1;
    if (!aIsSuggested && bIsSuggested) return 1;
    return 0;
  });


  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="px-4 py-4 max-w-md mx-auto flex items-center justify-between">
        <div className="text-left">
          <h1
            className="text-2xl sm:text-4xl font-sour-gummy font-bold"
            style={{ color: palette.foreground }}
          >
            Welcome back,
          </h1>
          <p 
            className="text-xl sm:text-2xl font-semibold font-sour-gummy"
            style={{ color: palette.foreground }}
          >Rose!</p>
        </div>
        <div className="p-2 rounded-full bg-white/10" style={{ boxShadow: `0 4px 16px ${palette.primary}20`, border: `1px solid ${palette.primary}` }}>
          <User className="w-5 h-5" style={{ color: palette.primary }} />
        </div>
      </header>

      {/* Mood greeting section */}
      <section className="px-4 pb-4 max-w-md mx-auto">
        <div
          className="p-4 rounded-2xl"
          style={{ backgroundColor: `${palette.primary}10`, borderLeft: `4px solid ${palette.primary}` }}
        >
          <p
            className="text-sm font-medium"
            style={{ color: palette.foreground }}
          >
            {String(moodGreeting)}
          </p>
        </div>
      </section>

      <section
        className="px-4 pt-8 max-w-md mx-auto rounded-tl-4xl rounded-tr-4xl"
        style={{ backgroundColor: palette.background }}
      >
        <div className="space-y-4">
          {/* Two column grid for feature cards */}
          <div className="grid grid-cols-2 gap-3">
            {sortedFeatures.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                status={feature.status}
                onClick={() => onFeatureClick(feature.id)}
                className="transition-all duration-200"
                palette={palette}
                isSuggested={isFeatureSuggested(feature.title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Support message */}
      <footer
        className="px-4 py-8 max-w-md mx-auto"
        style={{ backgroundColor: palette.background }}
      >
        <div
          className="text-center p-4 sm:p-6 rounded-2xl"
          style={{ backgroundColor: `${palette.muted}50` }}
        >
          <p
            className="text-sm leading-relaxed"
            style={{ color: palette.mutedForeground }}
          >
            Remember: You are not alone in this journey. Every step forward, no
            matter how small, is progress.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;