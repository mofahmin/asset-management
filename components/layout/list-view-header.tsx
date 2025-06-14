"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Building, ChevronDown, Download, Filter, Plus, RefreshCw, Settings } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

interface ListViewHeaderProps {
  title: string
  description: string
  entityName: string
  onNew: () => void
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
}

export function ListViewHeader({
  title,
  entityName,
  description,
  onNew,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search...",
}: ListViewHeaderProps) {
  const isMobile = useMobile()

  return (
    <div className="flex flex-col gap-4 pb-4 border-b">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Building className="h-8 w-8 text-gray-700" />
          <div className="flex flex-col">
            <span className="text-2xl font-semibold text-gray-900">{title}</span>
            <span className="text-sm text-gray-500">{description}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onNew} size="sm">
            Daftar {entityName}
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <p className="text-sm"></p>
          <span className="text-xs text-gray-500">3 items • Updated 8 minutes ago</span>
        </div>
        {!isMobile && (
          <div className="flex items-center gap-2">
            <Input 
              placeholder={searchPlaceholder} 
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full sm:w-[300px]" />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={onNew}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New {entityName}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNew()}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Customize List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  )
}

