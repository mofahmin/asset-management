"use client"

import { SheetTitle } from "@/components/ui/sheet"

import { useState } from "react"
import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { useMobile } from "@/hooks/use-mobile"
import { useToast } from "@/hooks/use-toast"

export function MobileHeader() {
  const isMobile = useMobile()
  const { toast } = useToast()
  const [notificationCount, setNotificationCount] = useState(3)

  if (!isMobile) return null

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const handleNotificationClick = () => {
    setNotificationCount(0)
  }

  return (
    <div className="flex items-center justify-between h-14 px-4 border-b bg-background">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[80%] sm:w-[350px]">
          <SheetHeader className="border-b pb-4">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john.doe@example.com</p>
            </div>
          </SheetHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start" size="sm">
                Help & Support
              </Button>
            </div>
            <div className="border-t pt-4">
              <Button variant="ghost" className="w-full justify-start" size="sm" onClick={handleLogout}>
                Log out
              </Button>
            </div>
            <div className="border-t pt-4 text-xs text-muted-foreground">
              <div>CRM Console v1.0.2</div>
              <div>© 2025 Your Company, Inc.</div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top" className="h-[40vh]">
            <SheetHeader>
              <SheetTitle>Search</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search accounts, contacts, projects..."
                  className="rounded-md border border-input bg-background px-9 py-2"
                />
              </div>
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Recent Searches</h4>
                <ul className="space-y-2">
                  <li className="text-sm">Acme Corporation</li>
                  <li className="text-sm">Jane Smith</li>
                  <li className="text-sm">Website Redesign</li>
                </ul>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" onClick={handleNotificationClick} className="relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                  {notificationCount}
                </span>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[350px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Notifications</SheetTitle>
          </SheetHeader>
            <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium">Recent Searches</h4>
                <ul className="space-y-2">
                  <li className="text-sm">Acme Corporation</li>
                  <li className="text-sm">Jane Smith</li>
                  <li className="text-sm">Website Redesign</li>
                </ul>
            </div>
          <SheetFooter className="px-4 py-3 border-t text-xs text-muted-foreground">
            <div>CRM Console v1.0.2</div>
            <div>© 2025 Your Company, Inc.</div>
          </SheetFooter>
        </SheetContent>
        </Sheet>

      </div>
    </div>
  )
}

