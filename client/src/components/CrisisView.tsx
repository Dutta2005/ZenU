import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { CrisisViewProps } from '@/lib/types';

const CrisisView: React.FC<CrisisViewProps> = ({ palette, onBack }) => {
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
              Crisis Support
            </h1>
            <p 
              className="text-sm" 
              style={{ color: palette.mutedForeground }}
            >
              Immediate help available
            </p>
          </div>
        </header>

        <div className="px-4 py-8 max-w-md mx-auto space-y-6">
          <div 
            className="p-6 rounded-2xl border" 
            style={{ 
              backgroundColor: palette.card,
              borderColor: palette.border 
            }}
          >
            <h2 
              className="text-xl font-semibold mb-4" 
              style={{ color: palette.cardForeground }}
            >
              Emergency Hotlines
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                <h3 className="font-medium text-red-900">National Suicide Prevention Lifeline</h3>
                <p className="text-red-700 text-sm mt-1">Available 24/7</p>
                <p className="text-lg font-mono text-red-900 mt-2">988</p>
              </div>
              <div 
                className="p-4 rounded-xl" 
                style={{ 
                  backgroundColor: palette.muted,
                  color: palette.mutedForeground 
                }}
              >
                <h3 className="font-medium">Crisis Text Line</h3>
                <p className="text-sm mt-1">Text HOME to 741741</p>
              </div>
            </div>
          </div>

          <div 
            className="p-6 rounded-2xl border" 
            style={{ 
              backgroundColor: palette.card,
              borderColor: palette.border 
            }}
          >
            <h3 
              className="font-semibold mb-3" 
              style={{ color: palette.cardForeground }}
            >
              Immediate Coping Strategies
            </h3>
            <ul 
              className="space-y-2 text-sm" 
              style={{ color: palette.mutedForeground }}
            >
              <li>• Take slow, deep breaths</li>
              <li>• Find a safe, quiet space</li>
              <li>• Reach out to a trusted friend or family member</li>
              <li>• Focus on grounding techniques (5-4-3-2-1 method)</li>
            </ul>
          </div>

          <div 
            className="p-6 rounded-2xl border" 
            style={{ 
              backgroundColor: palette.card,
              borderColor: palette.border 
            }}
          >
            <h3 
              className="font-semibold mb-3" 
              style={{ color: palette.cardForeground }}
            >
              Grounding Technique: 5-4-3-2-1
            </h3>
            <div 
              className="space-y-2 text-sm" 
              style={{ color: palette.mutedForeground }}
            >
              <p><strong>5 things you can see</strong> - Look around and name them</p>
              <p><strong>4 things you can touch</strong> - Feel different textures</p>
              <p><strong>3 things you can hear</strong> - Listen to your environment</p>
              <p><strong>2 things you can smell</strong> - Notice any scents</p>
              <p><strong>1 thing you can taste</strong> - Focus on your mouth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrisisView;