"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import ClientLayout from "../app/client-layout"
import { ConsoleNavigation } from "@/components/layout/console-navigation"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()

  // Define public paths that don't need the dashboard layout
  const publicPaths = ["/", "/login", "/register", "/forgot-password"]
  const isPublicPath = publicPaths.includes(pathname)

  // If it's a public path, just return children without ClientLayout
  if (isPublicPath) {
    return <>{children}</>; // No ClientLayout for public paths
  }

  // For protected paths, wrap with ClientLayout and ConsoleNavigation
  return (
    <ClientLayout>
      <ConsoleNavigation>{children}</ConsoleNavigation>
    </ClientLayout>
  )
}
