"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronLeft, Edit, MoreHorizontal, Trash } from "lucide-react"
import Link from "next/link"

interface RecordHeaderMobileProps {
  title: string
  subtitle?: string
  entityName: string
  backPath: string
  onEdit: () => void
  onDelete: () => void
}

export function RecordHeaderMobile({
  title,
  subtitle,
  entityName,
  backPath,
  onEdit,
  onDelete,
}: RecordHeaderMobileProps) {
  return (
    <div className="flex flex-col gap-2 pb-4 border-b">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href={backPath}>
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1 truncate">
          <h1 className="text-xl font-bold truncate">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground truncate">{subtitle}</p>}
        </div>
        <div className="flex items-center">
          <Button onClick={onEdit} variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Clone</DropdownMenuItem>
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

