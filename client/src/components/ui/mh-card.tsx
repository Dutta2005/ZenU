"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MHCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "feature" | "tip" | "crisis"
  interactive?: boolean
}

const MHCard = React.forwardRef<HTMLDivElement, MHCardProps>(
  ({ className, variant = "default", interactive = false, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "transition-all duration-300 border-border/50",
          {
            // Default card styling
            "bg-card/80 backdrop-blur-sm": variant === "default",
            
            // Feature card for main dashboard
            "bg-gradient-to-br from-card to-card/50 border-2": variant === "feature",
            
            // Daily tip card
            "bg-gradient-to-r from-accent/10 to-primary/10 border-accent/20": variant === "tip",
            
            // Crisis support card
            "bg-gradient-to-r from-crisis/10 to-destructive/10 border-crisis/30": variant === "crisis",
            
            // Interactive hover effects
            "hover:shadow-lg hover:scale-[1.02] cursor-pointer": interactive,
            "hover:shadow-xl hover:scale-[1.03]": interactive && variant === "feature",
          },
          className
        )}
        {...props}
      />
    )
  }
)
MHCard.displayName = "MHCard"

// Specialized card components for different use cases
const FeatureCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode
    title: string
    description: string
    status?: "available" | "coming-soon"
    onClick?: () => void
  }
>(({ className, icon, title, description, status = "available", onClick, ...props }, ref) => {
  const isAvailable = status === "available"
  
  return (
    <MHCard
      ref={ref}
      variant="feature"
      interactive={isAvailable}
      onClick={isAvailable ? onClick : undefined}
      className={cn(
        "p-4",
        !isAvailable && "opacity-60 cursor-not-allowed",
        className
      )}
      {...props}
    >
      <div className="flex items-center space-x-3">
        <div className={cn(
          "p-2 rounded-lg transition-colors flex-shrink-0",
          isAvailable ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
        )}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-sm truncate">{title}</h3>
            {!isAvailable && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md ml-2 flex-shrink-0">
                Coming Soon
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed truncate">
            {description}
          </p>
        </div>
      </div>
    </MHCard>
  )
})
FeatureCard.displayName = "FeatureCard"

const TipCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    tip: string
    category?: string
  }
>(({ className, tip, category, ...props }, ref) => {
  return (
    <MHCard
      ref={ref}
      variant="tip"
      className={cn("", className)}
      {...props}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <CardTitle className="text-base font-medium">
            {category || "Today's Tip"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm leading-relaxed text-foreground/90">
          {tip}
        </p>
      </CardContent>
    </MHCard>
  )
})
TipCard.displayName = "TipCard"

const CrisisCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    onEmergencyClick: () => void
  }
>(({ className, onEmergencyClick, ...props }, ref) => {
  return (
    <MHCard
      ref={ref}
      variant="crisis"
      className={cn("border-2", className)}
      {...props}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-crisis flex items-center space-x-2">
          <span>🚨</span>
          <span>Need Immediate Help?</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-foreground/80 leading-relaxed">
          If you're having thoughts of self-harm or suicide, please reach out for immediate support.
        </p>
        <button
          onClick={onEmergencyClick}
          className="w-full mh-button-crisis text-center"
        >
          Emergency Support
        </button>
      </CardContent>
    </MHCard>
  )
})
CrisisCard.displayName = "CrisisCard"

export { MHCard, FeatureCard, TipCard, CrisisCard }