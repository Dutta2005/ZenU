// contexts/ModalContext.tsx
"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ModalContextType {
  isMoodCheckInOpen: boolean
  setIsMoodCheckInOpen: (isOpen: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isMoodCheckInOpen, setIsMoodCheckInOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ isMoodCheckInOpen, setIsMoodCheckInOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}