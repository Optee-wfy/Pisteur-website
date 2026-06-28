import { useSyncExternalStore } from "react"

const INITIAL_LEAD_COUNT = 10218
const STORAGE_KEY = "pisteur-live-lead-count"

let leadCount = readStoredCount()
let timer: ReturnType<typeof setTimeout> | undefined
const listeners = new Set<() => void>()

function readStoredCount() {
  if (typeof window === "undefined") return INITIAL_LEAD_COUNT

  const storedValue = Number.parseInt(window.localStorage.getItem(STORAGE_KEY) ?? "", 10)
  return Number.isFinite(storedValue) && storedValue >= INITIAL_LEAD_COUNT
    ? storedValue
    : INITIAL_LEAD_COUNT
}

function getIncrement() {
  const roll = Math.random()
  if (roll < 0.78) return 1
  if (roll < 0.95) return 2
  return 3
}

function scheduleNextIncrement() {
  if (timer || listeners.size === 0) return

  const delay = 2500 + Math.random() * 5000
  timer = setTimeout(() => {
    timer = undefined
    leadCount += getIncrement()
    window.localStorage.setItem(STORAGE_KEY, String(leadCount))
    listeners.forEach((listener) => listener())
    scheduleNextIncrement()
  }, delay)
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  scheduleNextIncrement()

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && timer) {
      clearTimeout(timer)
      timer = undefined
    }
  }
}

function getSnapshot() {
  return leadCount
}

export function useLiveLeadCount() {
  return useSyncExternalStore(subscribe, getSnapshot, () => INITIAL_LEAD_COUNT)
}
