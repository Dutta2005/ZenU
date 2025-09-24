import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import EmojiSlider from './EmojiSlider';
import { TipCard } from './Card';
import { moodPalettes } from '@/lib/constants';
import type { MoodCheckInModalProps } from '@/lib/types';

const MoodCheckInModal: React.FC<MoodCheckInModalProps> = ({
  isOpen,
  userMood,
  palette,
  todaysTip,
  onMoodChange,
  onComplete,
  onSkip
}) => {
  const [currentMood, setCurrentMood] = React.useState(userMood);
  const [currentPalette, setCurrentPalette] = React.useState(palette);

  const handleMoodChange = (mood: number, theme: string) => {
    setCurrentMood(mood);
    setCurrentPalette(moodPalettes[mood]);
    onMoodChange(mood, theme);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="w-[95vw] max-w-lg mx-auto p-0 gap-0 border-0 bg-transparent shadow-none max-h-[95vh] overflow-y-auto">
        <div 
          className="backdrop-blur-lg rounded-3xl border shadow-2xl overflow-hidden"
          style={{ 
            backgroundColor: `${currentPalette.card}95`,
            borderColor: `${currentPalette.border}50` 
          }}
        >
          <div className="flex justify-end p-4 pb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={onSkip}
              className="rounded-full w-8 h-8 opacity-60 hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="px-4 sm:px-6 pb-6 space-y-6">
            <div className="text-center space-y-2">
              <h2 
                className="text-2xl sm:text-3xl font-semibold" 
                style={{ color: currentPalette.cardForeground }}
              >
                Check-in
              </h2>
              <p 
                className="text-sm" 
                style={{ color: currentPalette.mutedForeground }}
              >
                Let's start your day with a moment of self-reflection
              </p>
            </div>

            <div className="py-2">
              <EmojiSlider
                value={currentMood}
                onValueChange={handleMoodChange}
                palette={currentPalette}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 justify-center">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: currentPalette.primary }}
                ></div>
                <h3 
                  className="text-sm font-medium text-center" 
                  style={{ color: currentPalette.cardForeground }}
                >
                  Today's Tip
                </h3>
              </div>
              <TipCard
                tip={todaysTip.tip}
                category={todaysTip.category}
                className="transition-all duration-300 ease-out"
                palette={currentPalette}
              />
            </div>

            <div className="flex space-x-3 pt-2">
              <Button
                variant="outline"
                onClick={onSkip}
                className="flex-1 rounded-xl h-12"
                style={{ 
                  borderColor: currentPalette.border,
                  color: currentPalette.foreground 
                }}
              >
                Skip for now
              </Button>
              <Button
                onClick={() => onComplete(currentMood, currentPalette.name)}
                className="flex-1 rounded-xl h-12"
                style={{ 
                  backgroundColor: currentPalette.primary,
                  color: currentPalette.primaryForeground 
                }}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodCheckInModal;