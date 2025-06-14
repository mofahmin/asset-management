"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export function PWAStandaloneMode() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if the app is running in standalone mode (PWA)
    const isInStandaloneMode = () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes("android-app://")

    // Force standalone mode by preventing default link behavior
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest("a")

      if (!link) return

      // Only handle internal links
      const href = link.getAttribute("href")
      if (!href || href.startsWith("http") || href.startsWith("//") || href.startsWith("#")) return

      // Prevent default navigation and use router instead
      e.preventDefault()
      router.push(href)
    }

    // Add click handler to capture all link clicks
    if (isInStandaloneMode()) {
      document.addEventListener("click", handleClick)
    }

    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [router])

  // Force iOS to maintain standalone mode
  useEffect(() => {
    if (typeof window !== "undefined") {
      // This script helps maintain standalone mode on iOS
      const meta = document.createElement("meta")
      meta.name = "apple-mobile-web-app-capable"
      meta.content = "yes"
      document.head.appendChild(meta)

      // Force viewport height to prevent Safari UI
      const setViewportHeight = () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
      }

      window.addEventListener("resize", setViewportHeight)
      setViewportHeight()

      return () => {
        window.removeEventListener("resize", setViewportHeight)
        document.head.removeChild(meta)
      }
    }
  }, [pathname]) // Re-run when pathname changes

  return null
}

