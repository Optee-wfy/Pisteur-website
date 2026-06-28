import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { trackEvent } from "@/lib/backend"

export function AnalyticsTracker() {
  const location = useLocation()

  useEffect(() => { void trackEvent("page_view") }, [location.pathname])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a,button") as HTMLElement | null
      if (!target) return
      const label = target.textContent?.trim().replace(/\s+/g, " ").slice(0, 160) || target.getAttribute("aria-label") || "Sans libellé"
      void trackEvent("cta_click", { elementLabel: label, elementHref: target.getAttribute("href") })
    }
    document.addEventListener("click", handleClick, { passive: true })
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return null
}
