/**
 * Phase 8 — bridge between the Work rows and whichever preview renders them.
 *
 * Deliberately not React state: the pointer channel fires at pointer-move
 * frequency and must never trigger a re-render. Consumers (WebGL plane or DOM
 * fallback) subscribe and write straight into GSAP / uniforms.
 */

export type PreviewTarget = {
  /** Project index, e.g. '001'. Null before the first hover. */
  index: string | null
  hovering: boolean
}

type TargetListener = (target: PreviewTarget) => void
type PointerListener = (x: number, y: number, immediate: boolean) => void

let target: PreviewTarget = { index: null, hovering: false }
let pointer: { x: number; y: number; immediate: boolean } | null = null

const targetListeners = new Set<TargetListener>()
const pointerListeners = new Set<PointerListener>()

export function getPreviewTarget(): PreviewTarget {
  return target
}

export function setPreviewTarget(index: string | null, hovering: boolean): void {
  target = { index, hovering }
  for (const listener of targetListeners) listener(target)
}

export function onPreviewTarget(listener: TargetListener): () => void {
  targetListeners.add(listener)
  listener(target)
  return () => targetListeners.delete(listener)
}

/**
 * @param immediate Skip easing and jump to the position — used on row enter so
 * the preview never flies in from its last resting place.
 */
export function setPreviewPointer(x: number, y: number, immediate = false): void {
  pointer = { x, y, immediate }
  for (const listener of pointerListeners) listener(x, y, immediate)
}

export function onPreviewPointer(listener: PointerListener): () => void {
  pointerListeners.add(listener)
  if (pointer) listener(pointer.x, pointer.y, true)
  return () => pointerListeners.delete(listener)
}
