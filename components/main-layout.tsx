"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import AuthCheck from "@/components/auth-check"
import { ConsoleNavigation } from "@/components/layout/console-navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()

  // Define public paths that don't need the dashboard layout
  const publicPaths = ["/", "/login", "/register", "/forgot-password"]
  const isPublicPath = publicPaths.includes(pathname)

  // If it's a public path, just return children (no AuthCheck)
  if (isPublicPath) {
    return <>{children}</>
  }

  // For protected paths, wrap with dashboard layout and AuthCheck
  return (
    <AuthCheck>
      <ConsoleNavigation>{children}</ConsoleNavigation>
    </AuthCheck>
  )
}
