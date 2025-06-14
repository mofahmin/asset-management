"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import AuthCheck from "@/components/auth-check"

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname()

  // Define public paths that don't need the dashboard layout
  const publicPaths = ["/", "/login", "/register", "/forgot-password"]
  const isPublicPath = publicPaths.includes(pathname)

  // If it's a public path, just return children with auth check
  if (isPublicPath) {
    return <AuthCheck>{children}</AuthCheck>
  }

  // For protected paths, wrap with dashboard layout
  return (
    <AuthCheck>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthCheck>
  )
}
