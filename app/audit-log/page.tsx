"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SearchIcon, DownloadIcon, CalendarIcon } from "lucide-react"

// Mock data for audit logs
const mockAuditLogs = [
  {
    id: "LOG-001",
    action: "CREATE",
    entity: "Asset",
    entityId: "A001",
    description: "Aset baru didaftarkan: Kerusi Pejabat",
    user: "Ahmad Bin Abdullah",
    timestamp: "2023-05-15T10:30:00",
    ipAddress: "192.168.1.100",
  },
  {
    id: "LOG-002",
    action: "UPDATE",
    entity: "Asset",
    entityId: "A001",
    description: "Aset dikemaskini: Lokasi berubah dari 'Stor' ke 'Pejabat Pentadbiran'",
    user: "Ahmad Bin Abdullah",
    timestamp: "2023-05-16T14:45:00",
    ipAddress: "192.168.1.100",
  },
  {
    id: "LOG-003",
    action: "CREATE",
    entity: "Form",
    entityId: "BR-AMS-001-2023-001",
    description: "Borang BR-AMS 001 dihantar",
    user: "Ahmad Bin Abdullah",
    timestamp: "2023-05-17T09:15:00",
    ipAddress: "192.168.1.100",
  },
  {
    id: "LOG-004",
    action: "UPDATE",
    entity: "Form",
    entityId: "BR-AMS-001-2023-001",
    description: "Borang BR-AMS 001 diluluskan",
    user: "Mohamed Bin Ismail",
    timestamp: "2023-05-18T11:20:00",
    ipAddress: "192.168.1.102",
  },
  {
    id: "LOG-005",
    action: "CREATE",
    entity: "Maintenance",
    entityId: "M001",
    description: "Penyelenggaraan baru dijadualkan untuk Sistem Pembesar Suara",
    user: "Siti Binti Hassan",
    timestamp: "2023-05-20T13:10:00",
    ipAddress: "192.168.1.101",
  },
  {
    id: "LOG-006",
    action: "DELETE",
    entity: "Asset",
    entityId: "A002",
    description: "Aset dihapuskan: Meja Lama",
    user: "Ahmad Bin Abdullah",
    timestamp: "2023-05-22T15:30:00",
    ipAddress: "192.168.1.100",
  },
]

export default function AuditLogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterAction, setFilterAction] = useState("all")
  const [filterEntity, setFilterEntity] = useState("all")

  // Filter audit logs based on search term and filters
  const filteredLogs = mockAuditLogs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesAction = filterAction === "all" || log.action === filterAction
    const matchesEntity = filterEntity === "all" || log.entity === filterEntity

    return matchesSearch && matchesAction && matchesEntity
  })

  // Function to get badge color based on action
  const getActionBadgeColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "UPDATE":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "DELETE":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("ms-MY", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }).format(date)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight lg:hidden">Log Audit</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Eksport
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Log Audit</CardTitle>
          <CardDescription>Jejak audit untuk semua aktiviti dalam sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari log..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-[150px]">
                <Select value={filterAction} onValueChange={setFilterAction}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tindakan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tindakan</SelectItem>
                    <SelectItem value="CREATE">Cipta</SelectItem>
                    <SelectItem value="UPDATE">Kemaskini</SelectItem>
                    <SelectItem value="DELETE">Hapus</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[150px]">
                <Select value={filterEntity} onValueChange={setFilterEntity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Entiti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Entiti</SelectItem>
                    <SelectItem value="Asset">Aset</SelectItem>
                    <SelectItem value="Form">Borang</SelectItem>
                    <SelectItem value="Maintenance">Penyelenggaraan</SelectItem>
                    <SelectItem value="User">Pengguna</SelectItem>
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
                  <TableHead>Tindakan</TableHead>
                  <TableHead className="hidden md:table-cell">Entiti</TableHead>
                  <TableHead className="hidden lg:table-cell">ID Entiti</TableHead>
                  <TableHead>Penerangan</TableHead>
                  <TableHead className="hidden md:table-cell">Pengguna</TableHead>
                  <TableHead className="hidden lg:table-cell">Masa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Tiada log audit ditemui
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-mono text-xs">{log.id}</TableCell>
                      <TableCell>
                        <Badge className={getActionBadgeColor(log.action)}>{log.action}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{log.entity}</TableCell>
                      <TableCell className="hidden lg:table-cell font-mono text-xs">{log.entityId}</TableCell>
                      <TableCell className="max-w-[300px] truncate">{log.description}</TableCell>
                      <TableCell className="hidden md:table-cell">{log.user}</TableCell>
                      <TableCell className="hidden lg:table-cell whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{formatDate(log.timestamp)}</span>
                        </div>
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
