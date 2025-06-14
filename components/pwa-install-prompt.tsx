"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

export function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false)
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!installPrompt) return

    await installPrompt.prompt()

    const choiceResult = await installPrompt.userChoice
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt")
    } else {
      console.log("User dismissed the install prompt")
    }

    setInstallPrompt(null)
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Install CRM App</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setShowPrompt(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Install our app for a better experience</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground">
            Get quick access to your CRM data, work offline, and receive notifications.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleInstall} className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Install App
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

