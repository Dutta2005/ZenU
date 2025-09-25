import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import type { TipCardProps, FeatureCardProps, CrisisCardProps } from '@/lib/types';

export const TipCard: React.FC<TipCardProps> = ({ tip, category, className = "", palette }) => {
  return (
    <div 
      className={`p-4 rounded-2xl border transition-all duration-300 hover:shadow-md ${className}`}
      style={{ 
        backgroundColor: palette.card,
        borderColor: palette.border,
        color: palette.cardForeground
      }}
    >
      <div className="flex items-start space-x-3">
        <div 
          className="w-2 h-2 rounded-full mt-2 opacity-60"
          style={{ backgroundColor: palette.primary }}
        ></div>
        <div className="flex-1 space-y-2">
          <div 
            className="text-xs font-medium opacity-70 uppercase tracking-wide"
            style={{ color: palette.mutedForeground }}
          >
            {category}
          </div>
          <p className="text-sm leading-relaxed">{tip}</p>
        </div>
      </div>
    </div>
  );
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon, 
  title, 
  description, 
  status, 
  onClick, 
  className = "", 
  palette 
}) => {
  const isAvailable = status === 'available';
  
  return (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg relative overflow-hidden ${
        isAvailable ? 'hover:scale-[1.02] cursor-pointer' : 'cursor-not-allowed opacity-70'
      } ${className}`}
      style={{ 
        backgroundColor: palette.card,
        borderColor: palette.border
      }}
    >
      {/* Background logo */}
      <div 
        className="absolute top-2 right-2 opacity-10 pointer-events-none"
        style={{ color: palette.primary }}
      >
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <div className="space-y-3 relative z-10">
        {/* Main icon */}
        <div 
          className={`p-2 rounded-lg w-fit ${isAvailable ? 'bg-opacity-20' : 'bg-gray-100'}`}
          style={{ 
            backgroundColor: isAvailable ? `${palette.primary}20` : '#f3f4f6',
            color: isAvailable ? palette.primary : '#6b7280'
          }}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-sm leading-tight" style={{ color: palette.cardForeground }}>
              {title}
            </h3>
            {!isAvailable && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
                Soon
              </span>
            )}
          </div>
          <p 
            className="text-xs opacity-70 leading-relaxed line-clamp-3"
            style={{ color: palette.mutedForeground }}
          >
            {description}
          </p>
        </div>
      </div>
    </button>
  );
};

export const CrisisCard: React.FC<CrisisCardProps> = ({ onEmergencyClick }) => {
  return (
    <div className="p-4 rounded-2xl border-2 border-red-200 bg-red-50">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
          <Phone className="h-4 w-4 text-red-600" />
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-medium text-red-900">Need immediate help?</h3>
            <p className="text-sm text-red-700 mt-1">
              If you're in crisis or having thoughts of self-harm, please reach out for support.
            </p>
          </div>
          <Button
            onClick={onEmergencyClick}
            className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            Get Crisis Support
          </Button>
        </div>
      </div>
    </div>
  );
};