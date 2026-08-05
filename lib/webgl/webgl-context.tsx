'use client'

/**
 * Phase 8 — capability gate for the WebGL layer.
 *
 * Everything in components/webgl is opt-in: a single provider decides once
 * whether this device should get GPU work at all, and every scene reads that
 * decision instead of re-testing. Sections keep a non-WebGL fallback so the
 * page is never dependent on a GPU being available.
 */

import { createContext, useContext, useEffect, useState } from 'react'

export type WebglState = {
  /** WebGL is supported, motion is allowed, and the device looks capable. */
  enabled: boolean
  /** Large viewport with a precise pointer — gates cursor-driven effects. */
  desktop: boolean
}

const initialState: WebglState = { enabled: false, desktop: false }

const WebglContext = createContext<WebglState>(initialState)

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'
const DESKTOP = '(min-width: 1024px) and (pointer: fine)'

type LimitedNavigator = Navigator & {
  connection?: { saveData?: boolean }
  deviceMemory?: number
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

/** Cheap heuristics for devices where a shader layer would hurt more than help. */
function deviceLooksCapable(): boolean {
  const nav = navigator as LimitedNavigator

  if (nav.connection?.saveData) return false
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4) return false
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency < 4) return false

  return true
}

export function WebglProvider({ children }: { children: React.ReactNode }) {
  // Always start disabled so server and first client render agree, then upgrade.
  const [state, setState] = useState<WebglState>(initialState)

  useEffect(() => {
    const motion = window.matchMedia(REDUCED_MOTION)
    const desktop = window.matchMedia(DESKTOP)

    // The expensive checks only ever run once per page load.
    const capable = supportsWebgl() && deviceLooksCapable()

    const sync = () =>
      setState({
        enabled: capable && !motion.matches,
        desktop: desktop.matches,
      })

    sync()
    motion.addEventListener('change', sync)
    desktop.addEventListener('change', sync)

    return () => {
      motion.removeEventListener('change', sync)
      desktop.removeEventListener('change', sync)
    }
  }, [])

  return <WebglContext.Provider value={state}>{children}</WebglContext.Provider>
}

export function useWebgl(): WebglState {
  return useContext(WebglContext)
}
