'use client'

/**
 * Phase 8 — capability gate for the WebGL layer.
 *
 * Everything in components/webgl is opt-in: a single provider decides once
 * whether this device should get GPU work at all, and every scene reads that
 * decision instead of re-testing. Sections keep a non-WebGL fallback so the
 * page is never dependent on a GPU being available.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export type WebglState = {
  /** WebGL is supported, motion is allowed, and data saver is off. */
  enabled: boolean
  /** Large viewport — gates cursor-driven effects and the Lab object. */
  desktop: boolean
  /** Permanently fall back to DOM/SVG if the shared renderer fails. */
  disableWebgl: () => void
}

const initialState: WebglState = {
  enabled: false,
  desktop: false,
  disableWebgl: () => undefined,
}

const WebglContext = createContext<WebglState>(initialState)

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const DESKTOP = '(min-width: 1024px)'

type LimitedNavigator = Navigator & {
  connection?: { saveData?: boolean }
}

/** One-shot probe: does this browser give us a usable WebGL context? */
function supportsWebgl(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl =
      canvas.getContext('webgl2') ??
      (canvas.getContext('webgl') as WebGLRenderingContext | null)

    if (!gl) return false

    // Release the probe context immediately so it never counts against the
    // browser's (small) limit of simultaneous contexts.
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

function isDataSaverEnabled(): boolean {
  return Boolean((navigator as LimitedNavigator).connection?.saveData)
}

export function WebglProvider({ children }: { children: React.ReactNode }) {
  // Always start disabled so server and first client render agree, then upgrade.
  const [supported, setSupported] = useState(false)
  const [motionAllowed, setMotionAllowed] = useState(false)
  const [desktop, setDesktop] = useState(false)
  const [rendererFailed, setRendererFailed] = useState(false)

  const disableWebgl = useCallback(() => setRendererFailed(true), [])

  useEffect(() => {
    const motion = window.matchMedia(REDUCED_MOTION)
    const desktopQuery = window.matchMedia(DESKTOP)
    const capable = supportsWebgl() && !isDataSaverEnabled()

    const sync = () => {
      setSupported(capable)
      setMotionAllowed(!motion.matches)
      setDesktop(desktopQuery.matches)
    }

    sync()
    motion.addEventListener('change', sync)
    desktopQuery.addEventListener('change', sync)

    return () => {
      motion.removeEventListener('change', sync)
      desktopQuery.removeEventListener('change', sync)
    }
  }, [])

  const state = useMemo<WebglState>(
    () => ({
      enabled: supported && motionAllowed && !rendererFailed,
      desktop,
      disableWebgl,
    }),
    [desktop, disableWebgl, motionAllowed, rendererFailed, supported],
  )

  return <WebglContext.Provider value={state}>{children}</WebglContext.Provider>
}

export function useWebgl(): WebglState {
  return useContext(WebglContext)
}
