"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  ChurchIcon as MosqueIcon,
  LayoutDashboardIcon,
  PackageIcon,
  ClipboardIcon,
  WrenchIcon,
  TrashIcon,
  AlertTriangleIcon,
  SettingsIcon,
  UsersIcon,
  MenuIcon,
  LogOutIcon,
  ChevronDownIcon,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/lib/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import { useAuth } from "@/hooks/use-auth"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()
  const { t } = useLanguage()

  // Replace the mock user data with:
  const { user: authUser, logout: authLogout } = useAuth()

  // Use authUser instead of the mock user:
  const user = authUser || {
    name: "Ahmad Bin Abdullah",
    email: "ahmad@example.com",
    role: "Pegawai Aset",
    masjid: "Masjid Al-Hidayah",
    avatar: "",
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Update the handleLogout function:
  const handleLogout = () => {
    authLogout()
    toast({
      title: t("auth.logout_success"),
      description: "Anda telah berjaya log keluar.",
    })
    window.location.href = "/login"
  }

  // Navigation items based on user role
  const navigationItems = [
    {
      name: t("dashboard.title"),
      href: "/dashboard",
      icon: <LayoutDashboardIcon className="h-5 w-5" />,
      roles: ["Admin", "Pegawai Aset", "Pegawai Pengawal", "Jawatankuasa"],
    },
    {
      name: t("assets.title"),
      href: "/assets",
      icon: <PackageIcon className="h-5 w-5" />,
      roles: ["Admin", "Pegawai Aset", "Pegawai Pengawal", "Jawatankuasa"],
    },
    {
      name: t("forms.title"),
      href: "/forms",
      icon: <ClipboardIcon className="h-5 w-5" />,
      roles: ["Admin", "Pegawai Aset", "Pegawai Pengawal"],
    },
    {
      name: t("maintenance.title"),
      href: "/maintenance",
      icon: <WrenchIcon className="h-5 w-5" />,
      roles: ["Admin", "Pegawai Aset", "Pegawai Pengawal"],
    },
    {
      name: t("disposals.title"),
      href: "/disposals",
      icon: <TrashIcon className="h-5 w-5" />,
      roles: ["Admin", "Pegawai Aset", "Pegawai Pengawal"],
    },
    {
      name: t("losses.title"),
      href: "/losses",
      icon: <AlertTriangleIcon className="h-5 w-5" />,
      roles: ["Admin", "Pegawai Aset", "Pegawai Pengawal"],
    },
    {
      name: t("settings.users"),
      href: "/users",
      icon: <UsersIcon className="h-5 w-5" />,
      roles: ["Admin"],
    },
    {
      name: t("settings.title"),
      href: "/settings",
      icon: <SettingsIcon className="h-5 w-5" />,
      roles: ["Admin", "Pegawai Aset"],
    },
  ]

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter((item) => item.roles.includes(user.role))

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 border-b bg-background lg:hidden">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <MosqueIcon className="h-6 w-6" />
            <span className="font-bold">{t("app.name")}</span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <MenuIcon className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2 py-4">
                    <MosqueIcon className="h-6 w-6" />
                    <span className="font-bold">{t("app.name")}</span>
                  </div>
                  <div className="border-t py-4">
                    <p className="text-sm font-medium">{user.masjid}</p>
                  </div>
                  <nav className="flex-1 space-y-1">
                    {filteredNavItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="border-t py-4">
                    <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
                      <LogOutIcon className="h-5 w-5" />
                      {t("auth.logout")}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col border-r">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <MosqueIcon className="h-6 w-6" />
            <span className="font-bold">{t("app.name")}</span>
          </div>
          <div className="border-b py-4 px-6">
            <p className="text-sm font-medium">{user.masjid}</p>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            {filteredNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="border-t p-4">
            <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
              <LogOutIcon className="h-5 w-5" />
              {t("auth.logout")}
            </Button>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          {/* Desktop Header */}
          <header className="hidden lg:flex h-16 items-center gap-4 border-b bg-background px-6">
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {filteredNavItems.find((item) => item.href === pathname)?.name || t("dashboard.title")}
              </h1>
            </div>
            <LanguageSwitcher />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 flex items-center gap-2 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-medium">{user.name}</span>
                    <span className="text-xs text-muted-foreground">{user.role}</span>
                  </div>
                  <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("common.details")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings">{t("settings.title")}</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>{t("auth.logout")}</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}
