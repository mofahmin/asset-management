"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Grip,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/use-auth";

interface ConsoleNavigationLayoutProps {
  children: React.ReactNode;
}

export function ConsoleNavigation({ children }: ConsoleNavigationLayoutProps) {
  const pathname = usePathname();
  const [openTabs, setOpenTabs] = useState<string[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const isMobile = useMobile();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    //router.push("/login")
  };

  const isActive = (path: string) => pathname === path;

  const navItems = [
    { name: "Home", path: "/home", icon: <Home className="h-4 w-4" /> },
    {
      name: "Organisasi",
      path: "/account",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      name: "Aset Alih",
      path: "/asset",
      icon: <Building2 className="h-4 w-4" />,
    },
    {
      name: "Aset Tak Alih",
      path: "/asset",
      icon: <Users className="h-4 w-4" />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <Grip className="h-4 w-4" />,
    },
  ];

  const openTabItems = [
    { id: "home", name: "Home", path: "/home" },
    { id: "account", name: "Organisasi", path: "/account" },
    { id: "asset", name: "Aset Alih", path: "/asset" },
    // { id: "asset", name: "Aset Tak Alih", path: "/asset" },
    { id: "maintenance", name: "Penyelenggaraan", path: "/maintenance" },
    { id: "disposals", name: "Pelupusan", path: "/disposal" },
    { id: "losses", name: "Kehilangan & Hapus Kira", path: "/losses" },
    { id: "reports", name: "Reports", path: "/reports" },
    { id: "dashboard", name: "Dashboard", path: "/dashboard" },
  ];

  const navigation = [
    // { name: "", href: "/dashboard", icon: HomeIcon },
    // { name: "Aset", href: "/asset", icon: PackageIcon },
    // { name: "Penggunaan", href: "/forms", icon: FileTextIcon },
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
  ];

  //Hide on mobile since we're using bottom navigation
  if (isMobile) {
    return (
      <>
        <div className="flex h-16 items-center border-b px-4 lg:px-6 text-black">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-black"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[240px] sm:w-[280px] text-black"
            >
              <nav className="grid gap-2 py-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 text-sm rounded-md",
                      isActive(item.path) ? "text-black" : "hover:text-black"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-black relative">
              <Bell className="h-5 w-8" />
              <span className="sr-only">Notifications</span>
              <span className="absolute top-1 right-1 inline-block h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder.svg"
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
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
        <div className="p-4">{children}</div>
      </>
    );
  }

  return (
    <>
      <div className="flex h-16 items-center border-b px-4 lg:px-6 text-black">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-lg text-black"
        >
          <Moon className="h-8 w-8" />
          <span>Jabatan Agama Islam Selangor</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <form className="hidden md:block">
            <div className="relative flex items-center">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[256px] pl-8 bg-primary-foreground text-primary"
              />
            </div>
          </form>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <SettingsIcon className="h-24 w-24" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                Setup Menu
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Administration</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>Setting</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-24 w-24" />
                <span className="sr-only">Notifications</span>
                <span className="absolute top-1 right-1 inline-block h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end" forceMount>
              <DropdownMenuLabel className="font-normal flex items-center justify-between">
                <span>Notifications</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-xs px-0 h-auto"
                  onClick={() => {
                    // handle mark all as read logic here
                  }}
                >
                  Mark all as read
                </Button>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {/* Example notifications */}
              <DropdownMenuItem>
                <div>
                  <p className="text-sm font-medium">Asset Maintenance Due</p>
                  <p className="text-xs text-muted-foreground">
                    Asset #123 needs maintenance soon.
                  </p>
                  <span className="text-xs text-gray-400">2 hours ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div>
                  <p className="text-sm font-medium">New User Registered</p>
                  <p className="text-xs text-muted-foreground">
                    A new user has joined your organization.
                  </p>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/notifications"
                  className="w-full text-center text-primary"
                >
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="default"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg"
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    {user?.name?.charAt(0) || "U"}
                    <UserIcon className="h-5 w-5 text-black" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-row items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src="/placeholder.svg"
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>
                      {user?.name?.charAt(0) || "U"}
                      <UserIcon className="h-6 w-6 text-black" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-2">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email || "user@example.com"}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {user?.role || "Admin"}
                    </Badge>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SettingsIcon className="mr-2 h-4 w-4" />
                <span>User Setting</span>
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
      <div className="border-b flex bg-white">
        <Link
          href="/home"
          className="flex items-center gap-2 font-semibold text-lg text-[#004651] px-4"
        >
          <Grip className="ml-2 h-6 w-6" />
          <span className="text-base font-normal whitespace-nowrap">
            Sistem Pengurusan Aset
          </span>
        </Link>
        <Tabs defaultValue="home" className="w-full">
          <TabsList className="w-full justify-start h-10 rounded-none bg-white px-2 border-b">
            {openTabItems.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-[#004651] data-[state=active]:text-[#004651] rounded-none px-4 py-2"
                asChild
              >
                <Link href={tab.path}>{tab.name}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className="p-4">{children}</div>
    </>
  );
}
