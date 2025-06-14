"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface RelatedItem {
  id: string
  name: string
  path: string
  fields: Record<string, string | React.ReactNode>
}

interface RelatedListProps {
  title: string
  entityName: string
  items: RelatedItem[]
  columns: Array<{
    key: string
    label: string
  }>
  onNew: () => void
}

export function RelatedList({ title, entityName, items, columns, onNew }: RelatedListProps) {
  const [viewAll, setViewAll] = useState(false)
  const displayItems = viewAll ? items : items.slice(0, 3)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <Button
          size="sm"
          onClick={() => {
            // Show new related item form
            alert(`New ${entityName} form would appear here`)
            onNew()
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          New {entityName}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-[1fr_repeat(auto-fill,minmax(150px,1fr))] bg-muted/50 p-3 text-sm font-medium">
            {columns.map((column) => (
              <div key={column.key}>{column.label}</div>
            ))}
          </div>
          <div className="divide-y">
            {displayItems.map((item) => (
              <div key={item.id} className="grid grid-cols-[1fr_repeat(auto-fill,minmax(150px,1fr))] p-3 text-sm">
                <div>
                  <Link href={item.path} className="font-medium hover:underline">
                    {item.name}
                  </Link>
                </div>
                {columns.slice(1).map((column) => (
                  <div key={column.key}>{item.fields[column.key]}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
        {items.length > 3 && (
          <Button variant="link" className="mt-2 p-0 h-auto" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "View Less" : `View All (${items.length})`}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

