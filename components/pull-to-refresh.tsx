"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
import { ArrowDown, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
  className?: string
}

export function PullToRefresh({ onRefresh, children, className }: PullToRefreshProps) {
  const [isPulling, setIsPulling] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullProgress, setPullProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const startYRef = useRef(0)
  const pullThreshold = 80 // pixels to pull before triggering refresh

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleTouchStart = (e: TouchEvent) => {
      // Only enable pull to refresh when at the top of the page
      if (window.scrollY === 0) {
        startYRef.current = e.touches[0].clientY
        setIsPulling(true)
      }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPulling) return

      const currentY = e.touches[0].clientY
      const diff = currentY - startYRef.current

      // Only allow pulling down, not up
      if (diff > 0) {
        // Calculate progress (0-100)
        const progress = Math.min((diff / pullThreshold) * 100, 100)
        setPullProgress(progress)

        // Prevent default scrolling behavior when pulling
        if (window.scrollY === 0) {
          e.preventDefault()
        }
      }
    }

    const handleTouchEnd = async () => {
      if (!isPulling) return

      setIsPulling(false)

      // If pulled enough, trigger refresh
      if (pullProgress >= 100 && !isRefreshing) {
        setIsRefreshing(true)
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
          setPullProgress(0)
        }
      } else {
        // Reset progress if not pulled enough
        setPullProgress(0)
      }
    }

    container.addEventListener("touchstart", handleTouchStart, { passive: true })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isPulling, isRefreshing, onRefresh, pullProgress])

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Pull to refresh indicator */}
      <div
        className={cn(
          "absolute left-0 right-0 flex items-center justify-center transition-transform duration-200 z-10",
          isPulling || isRefreshing ? "opacity-100" : "opacity-0",
        )}
        style={{
          transform: `translateY(${Math.min(pullProgress / 2, 50)}px)`,
          top: "-50px",
          height: "50px",
        }}
      >
        {isRefreshing ? (
          <RefreshCw className="h-6 w-6 animate-spin text-primary" />
        ) : (
          <div className="flex flex-col items-center">
            <ArrowDown
              className={cn("h-6 w-6 text-primary transition-transform", pullProgress >= 100 ? "rotate-180" : "")}
            />
            <span className="text-xs mt-1">{pullProgress >= 100 ? "Release to refresh" : "Pull to refresh"}</span>
          </div>
        )}
      </div>

      {/* Main content */}
      <div
        style={{
          transform: isPulling ? `translateY(${pullProgress / 3}px)` : "translateY(0)",
          transition: isPulling ? "none" : "transform 0.3s ease",
        }}
      >
        {children}
      </div>
    </div>
  )
}

