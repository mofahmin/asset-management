import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/lib/language-context"
import MainLayout from "@/components/main-layout"
import { ConsoleNavigation } from "@/components/layout/console-navigation"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistem Pengurusan Aset",
  description: "Sistem pengurusan aset untuk masjid dan surau mengikut garis panduan JAIS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <MainLayout>{children}</MainLayout>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
          <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
    </div>
    </html>
  )
}
