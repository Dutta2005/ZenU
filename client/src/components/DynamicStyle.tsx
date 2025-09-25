import React from 'react';
import type { MoodPalette } from '@/lib/types';

interface DynamicStylesProps {
  palette: MoodPalette;
}

const DynamicStyles: React.FC<DynamicStylesProps> = ({ palette }) => {
  return (
    <style jsx global>{`
      .mood-transition {
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .mood-glow {
        box-shadow: 0 0 20px ${palette.primary}20;
      }
      
      .mood-border {
        border: 1px solid ${palette.border};
      }
      
      .mood-card {
        background: ${palette.card};
        color: ${palette.cardForeground};
        border: 1px solid ${palette.border};
      }
      
      .mood-card:hover {
        box-shadow: 0 8px 32px ${palette.primary}15;
        transform: translateY(-2px);
      }
      
      .mood-button {
        background: ${palette.primary};
        color: ${palette.primaryForeground};
      }
      
      .mood-button:hover {
        background: ${palette.primary}dd;
        box-shadow: 0 4px 20px ${palette.primary}40;
      }
      
      .mood-text-primary {
        color: ${palette.primary};
      }
      
      .mood-text-foreground {
        color: ${palette.foreground};
      }
      
      .mood-text-muted {
        color: ${palette.mutedForeground};
      }
      
      .mood-bg-muted {
        background-color: ${palette.muted};
      }
      
      /* Pulse animation for crisis situations */
      .crisis-pulse {
        animation: crisis-pulse 2s infinite;
      }
      
      @keyframes crisis-pulse {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
      }
      
      /* Smooth gradient background animation */
      .mood-gradient-bg {
        background: ${palette.gradient};
        background-size: 400% 400%;
        animation: gradient-shift 8s ease infinite;
      }
      
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      /* Breathing animation for mindfulness */
      .breathing-animation {
        animation: breathe 4s ease-in-out infinite;
      }
      
      @keyframes breathe {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      /* Floating animation for positive moods */
      .float-animation {
        animation: float 3s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }

      /* Fade in animation for components */
      .fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Slide up animation for modals */
      .slide-up {
        animation: slideUp 0.3s ease-out;
      }
      
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
      }

      /* Ripple effect for buttons */
      .ripple {
        position: relative;
        overflow: hidden;
      }
      
      .ripple::after {
        content: '';
        position: absolute;
        width: 100px;
        height: 100px;
        background: ${palette.primary}30;
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-effect 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-effect {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }

      /* Smooth transitions for mood changes */
      * {
        transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
      }

      /* Custom scrollbar styling */
      ::-webkit-scrollbar {
        width: 6px;
      }
      
      ::-webkit-scrollbar-track {
        background: ${palette.muted};
      }
      
      ::-webkit-scrollbar-thumb {
        background: ${palette.primary}60;
        border-radius: 3px;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: ${palette.primary};
      }
    `}</style>
  );
};

export default DynamicStyles;