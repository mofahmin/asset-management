"use client"

import { useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
  masjidId: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token and user data
    const token = localStorage.getItem("auth-token")
    const userData = localStorage.getItem("user")

    if (token === "demo-token" && userData) {
      try {
        setUser(JSON.parse(userData))
      } catch (error) {
        console.error("Error parsing user data:", error)
        localStorage.removeItem("auth-token")
        localStorage.removeItem("user")
        // Also clear cookie
        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
      }
    }

    setIsLoading(false)
  }, [])

  const login = (email: string, password: string) => {
    // Demo login - in real app, this would call your API
    const userData = {
      id: "1",
      name: "Ahmad Bin Abdullah",
      email: email,
      role: "Pegawai Aset",
      masjidId: "1",
    }

    localStorage.setItem("auth-token", "demo-token")
    localStorage.setItem("user", JSON.stringify(userData))

    // Set cookie for middleware
    document.cookie = "auth-token=demo-token; path=/; max-age=86400" // 24 hours

    setUser(userData)

    return Promise.resolve(userData)
  }

  const logout = () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("user")
    // Clear cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    setUser(null)
  }

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  }
}
