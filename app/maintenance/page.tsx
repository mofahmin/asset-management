"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, SearchIcon, MoreHorizontalIcon, FileTextIcon, EditIcon, CheckIcon, CalendarIcon } from "lucide-react"

// Mock data for maintenance records
const mockMaintenanceRecords = [
  {
    id: "M001",
    assetId: "A003",
    assetName: "Sistem Pembesar Suara",
    maintenanceType: "Penyelenggaraan Berkala",
    scheduledDate: "2023-08-15",
    completedDate: null,
    vendor: "Audio Solutions Sdn Bhd",
    cost: 500.0,
    status: "Dijadualkan",
  },
  {
    id: "M002",
    assetId: "A004",
    assetName: "Penghawa Dingin",
    maintenanceType: "Pembaikan",
    scheduledDate: "2023-07-20",
    completedDate: "2023-07-22",
    vendor: "CoolTech Services",
    cost: 350.0,
    status: "Selesai",
  },
  {
    id: "M003",
    assetId: "A002",
    assetName: "Komputer Riba",
    maintenanceType: "Naik Taraf",
    scheduledDate: "2023-09-05",
    completedDate: null,
    vendor: "IT Solutions Sdn Bhd",
    cost: 800.0,
    status: "Dijadualkan",
  },
  {
    id: "M004",
    assetId: "A003",
    assetName: "Sistem Pembesar Suara",
    maintenanceType: "Pembaikan Kecemasan",
    scheduledDate: "2023-06-10",
    completedDate: "2023-06-10",
    vendor: "Audio Solutions Sdn Bhd",
    cost: 250.0,
    status: "Selesai",
  },
  {
    id: "M005",
    assetId: "A004",
    assetName: "Penghawa Dingin",
    maintenanceType: "Penyelenggaraan Berkala",
    scheduledDate: "2023-10-15",
    completedDate: null,
    vendor: "CoolTech Services",
    cost: 450.0,
    status: "Dijadualkan",
  },
]

export default function MaintenancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Filter maintenance records based on search term and filters
  const filteredRecords = mockMaintenanceRecords.filter((record) => {
    const matchesSearch =
      record.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.vendor?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    const matchesType = filterType === "all" || record.maintenanceType === filterType

    return matchesSearch && matchesStatus && matchesType
  })

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Dijadualkan":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Dalam Proses":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Selesai":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Dibatalkan":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight lg:hidden">Penyelenggaraan</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/maintenance/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Jadual Baru
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rekod Penyelenggaraan</CardTitle>
          <CardDescription>Urus semua aktiviti penyelenggaraan aset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari penyelenggaraan..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-[180px]">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Dijadualkan">Dijadualkan</SelectItem>
                    <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                    <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    <SelectItem value="Penyelenggaraan Berkala">Berkala</SelectItem>
                    <SelectItem value="Pembaikan">Pembaikan</SelectItem>
                    <SelectItem value="Naik Taraf">Naik Taraf</SelectItem>
                    <SelectItem value="Pembaikan Kecemasan">Kecemasan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Aset</TableHead>
                  <TableHead className="hidden md:table-cell">Jenis</TableHead>
                  <TableHead className="hidden lg:table-cell">Tarikh Jadual</TableHead>
                  <TableHead className="hidden lg:table-cell">Vendor</TableHead>
                  <TableHead className="hidden md:table-cell">Kos (RM)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Tiada rekod penyelenggaraan ditemui
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>{record.id}</TableCell>
                      <TableCell className="font-medium">
                        <div>
                          <Link href={`/maintenance/${record.id}`} className="hover:underline">
                            {record.assetName}
                          </Link>
                          <div className="text-xs text-muted-foreground">{record.assetId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{record.maintenanceType}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          <span>{new Date(record.scheduledDate).toLocaleDateString("ms-MY")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{record.vendor}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.cost?.toFixed(2) || "-"}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(record.status)}>{record.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontalIcon className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Tindakan</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                              <Link href={`/maintenance/${record.id}`}>
                                <FileTextIcon className="mr-2 h-4 w-4" />
                                Lihat Butiran
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <EditIcon className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            {record.status === "Dijadualkan" && (
                              <DropdownMenuItem>
                                <CheckIcon className="mr-2 h-4 w-4" />
                                Tandakan Selesai
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
