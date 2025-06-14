"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  HomeIcon,
  PackageIcon,
  FileTextIcon,
  WrenchIcon,
  TrashIcon,
  AlertTriangleIcon,
  HistoryIcon,
  SettingsIcon,
  LogOutIcon,
  UserIcon,
  MenuIcon,
  XIcon,
  BuildingIcon,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import AppSwitcher from "./app-switcher"

const navigation = [
  { name: "", href: "/dashboard", icon: HomeIcon },
  { name: "Aset", href: "/asset", icon: PackageIcon },
  { name: "Penggunaan", href: "/forms", icon: FileTextIcon },
  // { name: "Penggunaan", href: "/forms", icon: FileTextIcon },
  // { name: "Pinjaman & Pergerakan", href: "/forms", icon: FileTextIcon },
  // { name: "Penyimpanan", href: "/forms", icon: FileTextIcon },
  // { name: "Pemeriksaan", href: "/forms", icon: FileTextIcon },
  // { name: "Penyelenggaraan", href: "/maintenance", icon: WrenchIcon },
  // { name: "Pelupusan", href: "/disposals", icon: TrashIcon },
  // { name: "Kehilangan & Hapus Kira", href: "/losses", icon: AlertTriangleIcon },
  // { name: "Laporan", href: "/audit-log", icon: HistoryIcon },
  // { name: "Log Audit", href: "/audit-log", icon: HistoryIcon },
  // { name: "Tetapan", href: "/settings", icon: SettingsIcon },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentAssetType, setCurrentAssetType] = useState<"movable" | "immovable">("movable")

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleAssetTypeChange = (type: "movable" | "immovable") => {
    setCurrentAssetType(type)
    // You can add logic here to filter content based on asset type
  }

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <main className="flex-1">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
      </main>
    </div>
  )
}
