"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  Building2,
  Home,
  ListTodo,
  Menu,
  Users,
  LayoutDashboard,
  BarChart3,
  Settings,
  HelpCircle,
  Palette,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"

export function MobileNavigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()

  if (!isMobile) return null

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="h-5 w-5" /> },
    { name: "Accounts", path: "/accounts", icon: <Building2 className="h-5 w-5" /> },
    { name: "Contacts", path: "/contacts", icon: <Users className="h-5 w-5" /> },
    { name: "Projects", path: "/projects", icon: <ListTodo className="h-5 w-5" /> },
  ]

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Reports", path: "/reports", icon: <BarChart3 className="h-5 w-5" /> },
    { name: "Settings", path: "/settings", icon: <Settings className="h-5 w-5" /> },
    { name: "Help", path: "/help", icon: <HelpCircle className="h-5 w-5" /> },
    { name: "Themes", path: "/themes", icon: <Palette className="h-5 w-5" /> },
  ]

  // Use client-side navigation to prevent browser UI from appearing
  const handleNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex items-center justify-between px-2 py-2 safe-area-inset-bottom">
      {navItems.map((item) => (
        <Button
          key={item.path}
          variant="ghost"
          className={cn(
            "flex flex-col items-center justify-center h-auto px-3 py-1 rounded-md",
            isActive(item.path) ? "text-primary" : "text-muted-foreground hover:text-foreground",
          )}
          onClick={() => handleNavigation(item.path)}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.name}</span>
        </Button>
      ))}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" className="flex flex-col items-center justify-center h-auto py-1 px-3">
            <Menu className="h-5 w-5" />
            <span className="text-xs mt-1">Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[350px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className="flex items-center gap-3 px-4 py-3 hover:bg-muted w-full justify-start"
                onClick={() => handleNavigation(item.path)}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-md border">{item.icon}</div>
                <div className="font-medium">{item.name}</div>
              </Button>
            ))}
          </div>
          <SheetFooter className="px-4 py-3 border-t text-xs text-muted-foreground">
            <div>CRM Console v1.0.2</div>
            <div>© 2025 Your Company, Inc.</div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

