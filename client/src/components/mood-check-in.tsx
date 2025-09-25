//components/mood-check-in.tsx
import React from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import EmojiSlider from './EmojiSlider';
import { TipCard } from './Card';
import { moodPalettes } from '@/lib/constants';
import type { MoodCheckInModalProps } from '@/lib/types';
import DynamicStyles from './DynamicStyle';

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
    <DialogTitle className="sr-only">Mood Check-In</DialogTitle>
     {/*if modal is open then update the background otherwise not*/}
     {isOpen && (
       <div
          className="fixed inset-0 z-50"
          style={{
            background: `linear-gradient(135deg,  ${currentPalette.primary}, ${currentPalette.primary}, ${currentPalette.background})`
          }}
          />
     )}
      <DialogContent className="w-[95vw] max-w-lg mx-auto p-0 gap-0 border-0 bg-transparent shadow-none max-h-[95vh] overflow-y-auto">
        <div 
          className="backdrop-blur-lg rounded-3xl border shadow-2xl overflow-hidden"
          style={{ 
            backgroundColor: `${currentPalette.card}`,
            borderColor: `${currentPalette.border}50` 
          }}
        >
          <div className="px-4 sm:px-6 py-6 space-y-6">
            <div className="text-center space-y-2">
              <p 
                className="font-medium" 
                style={{ color: currentPalette.mutedForeground }}
              >
                How are you feeling today?
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
                Check-In
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MoodCheckInModal;