"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FloatingActionButtonProps {
  icon: ReactNode
  onClick: () => void
  className?: string
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  position?: "bottom-right" | "bottom-center" | "bottom-left"
}

export function FloatingActionButton({
  icon,
  onClick,
  className,
  variant = "default",
  size = "default",
  position = "bottom-right",
}) {
  const positionClasses = {
    "bottom-right": "bottom-20 right-4 md:bottom-4",
    "bottom-center": "bottom-20 left-1/2 transform -translate-x-1/2 md:bottom-4",
    "bottom-left": "bottom-20 left-4 md:bottom-4",
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={onClick}
      className={cn(
        "fixed shadow-lg rounded-full h-14 w-14 flex items-center justify-center z-10",
        positionClasses[position],
        className,
      )}
    >
      {icon}
    </Button>
  )
}

