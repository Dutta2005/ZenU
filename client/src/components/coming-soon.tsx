import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { ComingSoonViewProps } from '@/lib/types';

const ComingSoonView: React.FC<ComingSoonViewProps> = ({ feature, palette, onBack }) => {
  return (
    <div className="min-h-screen" style={{ background: palette.gradient }}>
      <div className="min-h-screen" style={{ backgroundColor: palette.background }}>
        <header className="px-4 py-4 flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
            style={{ color: palette.primary }}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 
              className="text-2xl font-semibold" 
              style={{ color: palette.foreground }}
            >
              {feature.title}
            </h1>
            <p 
              className="text-sm" 
              style={{ color: palette.mutedForeground }}
            >
              Feature in development
            </p>
          </div>
        </header>

        <div className="px-4 py-8 max-w-md mx-auto">
          <div 
            className="text-center p-8 space-y-6 rounded-2xl border" 
            style={{ 
              backgroundColor: palette.card,
              borderColor: palette.border 
            }}
          >
            <div 
              className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                backgroundColor: `${palette.primary}20`,
                color: palette.primary 
              }}
            >
              {feature.icon}
            </div>
            
            <div className="space-y-3">
              <h2 
                className="text-xl font-semibold" 
                style={{ color: palette.cardForeground }}
              >
                {feature.title}
              </h2>
              <p 
                className="text-base" 
                style={{ color: palette.mutedForeground }}
              >
                {feature.description}
              </p>
            </div>

            <div 
              className="rounded-xl p-4 space-y-2" 
              style={{ backgroundColor: palette.muted }}
            >
              <p 
                className="text-sm font-medium" 
                style={{ color: palette.mutedForeground }}
              >
                Coming Soon
              </p>
              <p 
                className="text-xs" 
                style={{ color: palette.mutedForeground }}
              >
                We're working hard to bring you this feature. Stay tuned for updates!
              </p>
            </div>

            <div className="space-y-4">
              <div 
                className="p-4 rounded-xl border" 
                style={{ 
                  backgroundColor: `${palette.primary}05`,
                  borderColor: `${palette.primary}20`
                }}
              >
                <h4 
                  className="font-medium mb-2" 
                  style={{ color: palette.cardForeground }}
                >
                  What to expect:
                </h4>
                <ul 
                  className="text-sm space-y-1 text-left" 
                  style={{ color: palette.mutedForeground }}
                >
                  {getFeatureDetails(feature.id).map((detail, index) => (
                    <li key={index}>• {detail}</li>
                  ))}
                </ul>
              </div>

              <Button
                onClick={onBack}
                className="rounded-xl px-6 py-2 w-full"
                style={{ 
                  backgroundColor: palette.primary,
                  color: palette.primaryForeground 
                }}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get feature-specific details
const getFeatureDetails = (featureId: string): string[] => {
  const details: Record<string, string[]> = {
    'ai-chatbot': [
      'Personalized conversations based on your mood',
      'Support in multiple languages',
      'Available 24/7 for immediate assistance',
      'Evidence-based therapeutic techniques'
    ],
    'daily-journaling': [
      'Guided prompts for self-reflection',
      'Mood tracking integration',
      'Private and encrypted entries',
      'Export options for sharing with professionals'
    ],
    'peer-support': [
      'Connect with verified student peers',
      'Moderated support groups',
      'Anonymous sharing options',
      'Community guidelines for safe spaces'
    ],
    'resource-hub': [
      'Curated mental health resources',
      'Meditation and mindfulness content',
      'Educational materials about mental wellness',
      'Local support services directory'
    ]
  };

  return details[featureId] || ['Enhanced functionality coming soon', 'Improved user experience', 'Better integration with existing features'];
};

export default ComingSoonView;