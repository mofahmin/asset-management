"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"

interface SyncStatusProps {
  iconOnly?: boolean
}

export function SyncStatus({ iconOnly = false }: SyncStatusProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [lastSynced, setLastSynced] = useState<string | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)

  useEffect(() => {
    // Check online status on mount
    setIsOnline(navigator.onLine)

    // Get last synced time from localStorage
    const storedLastSynced = localStorage.getItem("lastSynced")
    if (storedLastSynced) {
      setLastSynced(storedLastSynced)
    }

    // Add event listeners for online/offline status
    const handleOnline = () => {
      setIsOnline(true)
      // Auto-sync when coming back online
      handleSync()
    }

    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleSync = async () => {
    if (!isOnline) return

    setIsSyncing(true)

    try {
      // Simulate sync process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update last synced time
      const now = new Date().toLocaleTimeString()
      setLastSynced(now)
      localStorage.setItem("lastSynced", now)
    } catch (error) {
      console.error("Sync failed:", error)
    } finally {
      setIsSyncing(false)
    }
  }

  if (iconOnly) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSync}
        disabled={!isOnline || isSyncing}
        className="h-8 w-8"
        title={isOnline ? "Online - Click to sync" : "Offline"}
      >
        {isOnline ? (
          <RefreshCw className={`h-4 w-4 ${isSyncing ? "animate-spin text-primary" : ""}`} />
        ) : (
          <WifiOff className="h-4 w-4 text-yellow-500" />
        )}
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {isOnline ? (
        <Badge variant="outline" className="flex items-center gap-1 px-2 py-1">
          <Wifi className="h-3 w-3" />
          <span>Online</span>
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 border-yellow-300"
        >
          <WifiOff className="h-3 w-3" />
          <span>Offline</span>
        </Badge>
      )}

      {lastSynced && <span className="text-xs text-muted-foreground">Last synced: {lastSynced}</span>}

      <Button variant="ghost" size="sm" onClick={handleSync} disabled={!isOnline || isSyncing} className="h-8 px-2">
        <RefreshCw className={`h-3 w-3 mr-1 ${isSyncing ? "animate-spin" : ""}`} />
        {isSyncing ? "Syncing..." : "Sync"}
      </Button>
    </div>
  )
}

