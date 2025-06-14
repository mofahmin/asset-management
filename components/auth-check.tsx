"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface AuthCheckProps {
  children: React.ReactNode
}

export default function AuthCheck({ children }: AuthCheckProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth-token")
      const isAuth = token === "demo-token"

      setIsAuthenticated(isAuth)
      setIsLoading(false)

      // If not authenticated and not on a public page, redirect to login
      const currentPath = window.location.pathname
      const isPublicPath = currentPath === "/" || currentPath === "/login" || currentPath === "/register"

      if (!isAuth && !isPublicPath) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Memuatkan...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
