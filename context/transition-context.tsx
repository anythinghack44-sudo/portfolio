'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TransitionContextType {
  isTransitioning: boolean
  playTransition: (action: () => void) => void
  finishTransition: () => void
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function TransitionProvider({ children }: { children: ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const playTransition = (action: () => void) => {
    if (isTransitioning) return

    setIsTransitioning(true)

    // Wait for the "cover" animation to finish before performing the action (e.g., routing)
    // The "cover" animation duration will be 300ms in GSAP
    setTimeout(() => {
      action()
    }, 300)
  }

  const finishTransition = () => {
    setIsTransitioning(false)
  }

  return (
    <TransitionContext.Provider value={{ isTransitioning, playTransition, finishTransition }}>
      {children}
    </TransitionContext.Provider>
  )
}

export function useTransition() {
  const context = useContext(TransitionContext)
  if (context === undefined) {
    throw new Error('useTransition must be used within a TransitionProvider')
  }
  return context
}
