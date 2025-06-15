"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Edit, MoreHorizontal, Trash } from "lucide-react"

interface RecordHeaderProps {
  title: string
  subtitle?: string
  entityName: string
  onEdit: () => void
  onDelete: () => void
}

export function RecordHeader({ title, subtitle, entityName, onEdit, onDelete }: RecordHeaderProps) {
  return (
    <div className="flex flex-col gap-4 pb-4 border-b">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={onEdit} variant="outline" size="sm">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="mr-2 h-4 w-4" />
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log(`Cloning ${entityName}`)}>Clone</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log(`Sharing ${entityName}`)}>Share</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={onDelete}>
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

