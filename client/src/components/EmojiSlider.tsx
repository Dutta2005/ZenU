import React from 'react';
import { moods } from '@/lib/constants';
import type { EmojiSliderProps } from '@/lib/types';

const EmojiSlider: React.FC<EmojiSliderProps> = ({ value, onValueChange, palette }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div 
          className="text-6xl mb-2 transition-all duration-500"
          style={{ filter: `drop-shadow(0 0 10px ${palette.primary}40)` }}
        >
          {moods[value].emoji}
        </div>
        <h3 className="text-lg font-medium" style={{ color: palette.foreground }}>
          {moods[value].label}
        </h3>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="0"
          max="5"
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value);
            const newTheme = palette.name;
            onValueChange(newValue, newTheme);
          }}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: palette.gradient,
            WebkitAppearance: 'none'
          }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: ${palette.primary};
            border: 3px solid white;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
          }
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          input[type="range"]::-moz-range-thumb {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            background: ${palette.primary};
            border: 3px solid white;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }
        `}</style>
        
        <div className="flex justify-between mt-2 px-1">
          {moods.map((mood, index) => (
            <span 
              key={index}
              className={`text-xs transition-all duration-300 ${
                value === index ? 'opacity-100 font-medium' : 'opacity-40'
              }`}
              style={{ color: value === index ? palette.primary : 'inherit' }}
            >
              {mood.emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiSlider;