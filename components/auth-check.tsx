"use client"

import type React from "react"

interface AuthCheckProps {
  children: React.ReactNode
}

export default function AuthCheck({ children }: AuthCheckProps) {
  return <>{children}</>
}
