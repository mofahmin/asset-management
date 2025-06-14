"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Edit, MoreHorizontal, Trash } from "lucide-react"
import { getIconForEntity } from "@/lib/icons"

interface Field {
  label: string
  value: string | React.ReactNode
  badge?: boolean
  badgeVariant?: "default" | "secondary" | "outline" | "destructive"
}

interface CompactLayoutProps {
  title: string
  subtitle?: string
  entityName?: string
  fields: Field[]
  onEdit: () => void
  onDelete: () => void
  guidance?: string
}

export function CompactLayout({
  title,
  subtitle,
  entityName = "default", // Provide a default value
  fields,
  onEdit,
  onDelete,
}: CompactLayoutProps) {
  const EntityIcon = getIconForEntity(entityName)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-muted border-b">
        <div className="flex items-center">
          <EntityIcon className="h-6 w-6 mr-4" />
          <div>
            <p className="text-sm text-muted-foreground">{entityName}</p>
            <CardTitle className="text-xl">{title}</CardTitle>
          </div>
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
                Actions
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
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {fields.map((field, index) => (
            <div key={index} className="space-y-1">
              <p className="text-xs text-muted-foreground">{field.label}</p>
              {field.badge ? (
                <Badge variant={field.badgeVariant || "default"}>{field.value}</Badge>
              ) : (
                <p className="font-medium">{field.value}</p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

