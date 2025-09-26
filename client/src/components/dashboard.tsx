import React from "react";
import { FeatureCard } from "./Card";
import type { DashboardProps } from "@/lib/types";
import { User } from "lucide-react";
import DynamicStyles from "./DynamicStyle";

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
  return (
    <div className="min-h-screen fade-in">
      <DynamicStyles palette={palette} />
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

      <section
        className="px-4 pt-8 max-w-md mx-auto rounded-tl-4xl rounded-tr-4xl"
        style={{ backgroundColor: palette.background }}
      >
        <div className="space-y-4">
          {/* Two column grid for feature cards */}
          <div className="grid grid-cols-2 gap-3">
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