"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Building2,
  ChevronDown,
  Home,
  Moon,
  ListTodo,
  Menu,
  Search,
  Settings,
  Users,
  Wifi,
  WifiOff,
  LayoutGrid,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  Bell,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/hooks/use-auth"

interface ConsoleNavigationLayoutProps {
  children: React.ReactNode
}

export function ConsoleNavigation({ children }: ConsoleNavigationLayoutProps) {
  const pathname = usePathname()
  const [openTabs, setOpenTabs] = useState<string[]>([])
  const [isOnline, setIsOnline] = useState(true)
  const isMobile = useMobile()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    //router.push("/login")
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    { name: "Home", path: "/home", icon: <Home className="h-4 w-4" /> },
    { name: "Organisasi", path: "/account", icon: <Building2 className="h-4 w-4" /> },
    { name: "Aset", path: "/asset", icon: <Building2 className="h-4 w-4" /> },
    { name: "Penggunaan", path: "/contacts", icon: <Users className="h-4 w-4" /> },
    { name: "Projects", path: "/projects", icon: <ListTodo className="h-4 w-4" /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 className="h-4 w-4" /> },
    { name: "Dashboard", path: "/dashboard", icon: <LayoutGrid className="h-4 w-4" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-4 w-4" /> },
  ]

  const openTabItems = [
    { id: "home", name: "Home", path: "/home" },
    { id: "account", name: "Organisasi", path: "/account" },
    { id: "asset", name: "Aset", path: "/asset" },
    { id: "contacts", name: "Penggunaan", path: "/contacts" },
    { id: "projects", name: "Projects", path: "/projects" },
    { id: "reports", name: "Reports", path: "/reports" },
    { id: "dashboard", name: "Dashboard", path: "/dashboard" },
  ]

  //Hide on mobile since we're using bottom navigation
  if (isMobile) {
    return (
      <>
        <div className="flex h-16 items-center border-b px-4 lg:px-6 text-black">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-black">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px] text-black">
              <nav className="grid gap-2 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                      isActive(item.path) ? "text-black" : "hover:text-black",
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-black relative">
              <Bell className="h-5 w-8" />
              <span className="sr-only">Notifications</span>
              <span className="absolute top-1 right-1 inline-block h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={user?.name || "User"} />
                    <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {user?.role || "Admin"}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Tetapan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 border-b bg-[#e2f1d6] text-black">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/home" className="flex items-center gap-2 font-semibold text-lg text-black">
            <Moon className="h-8 w-8" />
            <span>Jabatan Agama Islam Selangor</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            <form className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-[200px] lg:w-[256px] pl-8 bg-primary-foreground text-primary"
                />
              </div>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-black">
                  <Settings className="h-8 w-8" />
                  <span className="sr-only">Settings</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {user?.role || "Admin"}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Tetapan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-black relative">
                  <Bell className="h-8 w-8" />
                  <span className="sr-only">Notifications</span>
                  <span className="absolute top-1 right-1 inline-block h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user?.email || "user@example.com"}</p>
                    <Badge variant="secondary" className="w-fit text-xs">
                      {user?.role || "Admin"}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Tetapan</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  <span>Log Keluar</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-4 border-b px-4 lg:px-6 py-2 bg-white">
          <Link href="/home" className={cn(
            "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground",
            pathname === "/home" ? "bg-gray-100 text-black" : "text-black hover:bg-gray-200"
          )}>
            <LayoutGrid className="mr-2 h-4 w-4" />
            Sistem Pengurusan Aset
          </Link>
          {openTabItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground",
                isActive(item.path) ? "bg-gray-100 text-black" : "text-black hover:bg-gray-200",
                item.id === "home" ? "hidden" : ""
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}

