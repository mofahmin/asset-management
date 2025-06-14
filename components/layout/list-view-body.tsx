"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ChevronUp, Edit, MoreHorizontal, Plus } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { PullToRefresh } from "@/components/pull-to-refresh"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import { cn } from "@/lib/utils"

export interface Column {
  key: string
  label: string
  sortable?: boolean
  editable?: boolean
  searchable?: boolean
  render?: (value: any, row: any) => React.ReactNode
  className?: string
  width?: string
}

export interface Action {
  label: string
  icon?: React.ReactNode
  onClick: (row: any) => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  className?: string
  show?: (row: any) => boolean
}

export interface ListViewBodyProps {
  data: any[]
  columns: Column[]
  actions?: Action[]
  onRowClick?: (row: any) => void
  onEdit?: (row: any) => void
  onDelete?: (row: any) => void
  onNew?: () => void
  onRefresh?: () => Promise<void>
  onCellEdit?: (id: string, field: string, value: string) => void | Promise<void>
  searchValue?: string
  selectable?: boolean
  sortable?: boolean
  editable?: boolean
  loading?: boolean
  emptyMessage?: string
  // mobileCardRender?: (row: any, index: number) => React.ReactNode
  className?: string
  idField?: string
}

export function ListViewBody({
  data,
  columns,
  actions = [],
  onRowClick,
  onEdit,
  onDelete,
  onNew,
  onRefresh,
  onCellEdit,
  searchValue = "",
  selectable = false,
  sortable = true,
  editable = false,
  loading = false,
  emptyMessage = "No data available",
  // mobileCardRender,
  className,
  idField = "id",
}: ListViewBodyProps) {
  const isMobile = useMobile()
  const [editingCell, setEditingCell] = useState<{
    id: string
    field: string
    value: string
  } | null>(null)
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // Filter data based on search value
  const filteredData = useMemo(() => {
    if (!searchValue.trim()) return data

    const searchTerm = searchValue.toLowerCase()

    return data.filter((row) => {
      // Search through all searchable columns or all columns if none specified
      const searchableColumns = columns.filter((col) => col.searchable !== false)

      return searchableColumns.some((column) => {
        const value = row[column.key]
        if (value == null) return false

        // Convert value to string and search
        const stringValue = String(value).toLowerCase()
        return stringValue.includes(searchTerm)
      })
    })
  }, [data, searchValue, columns])

  const handleSort = (field: string) => {
    if (!sortable) return

    const column = columns.find((col) => col.key === field)
    if (!column?.sortable) return

    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleSelectAll = () => {
    if (!selectable) return

    if (selectedRows.length === filteredData.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(filteredData.map((row) => row[idField]))
    }
  }

  const handleSelectRow = (id: string) => {
    if (!selectable) return

    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id))
    } else {
      setSelectedRows([...selectedRows, id])
    }
  }

  const handleCellClick = (id: string, field: string, value: string) => {
    if (!editable) return

    const column = columns.find((col) => col.key === field)
    if (!column?.editable) return

    setEditingCell({ id, field, value: String(value) })
  }

  const handleCellChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingCell) {
      setEditingCell({ ...editingCell, value: e.target.value })
    }
  }

  const handleCellBlur = async () => {
    if (editingCell) {
      try {
        // Call the onCellEdit callback if provided
        await onCellEdit?.(editingCell.id, editingCell.field, editingCell.value)
      } catch (error) {
        console.error("Error updating cell:", error)
        // Optionally show an error toast here
      } finally {
        setEditingCell(null)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCellBlur()
    } else if (e.key === "Escape") {
      setEditingCell(null)
    }
  }

  const sortedData = useMemo(() => {
    if (!sortable || !sortField) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })
  }, [filteredData, sortField, sortDirection, sortable])

  const renderCellValue = (column: Column, row: any) => {
    const value = row[column.key]

    if (column.render) {
      return column.render(value, row)
    }

    return value
  }

  const defaultActions: Action[] = []

  // if (onEdit) {
  //   defaultActions.push({
  //     label: "Edit",
  //     icon: <Edit className="h-4 w-4" />,
  //     onClick: onEdit,
  //     variant: "ghost",
  //   })
  // }

  // if (onDelete) {
  //   defaultActions.push({
  //     label: "Delete",
  //     onClick: onDelete,
  //     variant: "ghost",
  //     className: "text-destructive",
  //   })
  // }

  const allActions = [...actions, ...defaultActions]

  // Show "no results" message when search returns empty
  const noDataMessage = searchValue.trim() ? `No results found for "${searchValue}"` : emptyMessage

  // Desktop table view
  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
            </TableHead>
            {selectable && (
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedRows.length === sortedData.length && sortedData.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
            )}
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(column.sortable && sortable && "cursor-pointer", column.className)}
                style={{ width: column.width }}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable &&
                    sortField === column.key &&
                    (sortDirection === "asc" ? (
                      <ChevronUp className="ml-2 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-2 h-4 w-4" />
                    ))}
                </div>
              </TableHead>
            ))}
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (selectable ? 1 : 0) + (allActions.length > 0 ? 1 : 0)}
                className="text-center py-8"
              >
                <p className="text-muted-foreground">{noDataMessage}</p>            
              </TableCell>
            </TableRow>
          ) : (
            sortedData.map((row) => (
              <TableRow
                key={row[idField]}
                className={cn(
                  selectedRows.includes(row[idField]) && "bg-muted/50",
                  onRowClick && "cursor-pointer hover:bg-muted/30",
                )}
                onClick={() => onRowClick?.(row)}
              >
                <TableCell className="text-center text-muted-foreground font-mono">
                  {sortedData.findIndex(item => item[idField] === row[idField]) + 1}
                </TableCell>                
                {selectable && (
                  <TableCell>
                    <Checkbox
                      checked={selectedRows.includes(row[idField])}
                      onCheckedChange={() => handleSelectRow(row[idField])}
                    />
                  </TableCell>
                )}
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={cn(column.editable && editable && "cursor-pointer", column.className)}
                    onClick={(e) => {
                      if (column.editable && editable) {
                        e.stopPropagation()
                        handleCellClick(row[idField], column.key, row[column.key])
                      }
                    }}
                  >
                    {editingCell?.id === row[idField] && editingCell?.field === column.key ? (
                      <Input
                        value={editingCell.value}
                        onChange={handleCellChange}
                        onBlur={handleCellBlur}
                        onKeyDown={handleKeyDown}
                        className="h-8 w-full"
                        autoFocus
                      />
                    ) : (
                      renderCellValue(column, row)
                    )}
                  </TableCell>
                ))}
                {allActions.length > 0 && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                    
                      
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {allActions.slice(1).map((action, i) => (
                              <DropdownMenuItem
                                key={i}
                                onClick={() => action.onClick(row)}
                                className={action.className}
                              >
                                {action.icon && <span className="mr-2">{action.icon}</span>}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
