"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusIcon, SearchIcon, MoreHorizontalIcon, FileTextIcon, EditIcon, CheckIcon, CalendarIcon } from "lucide-react"

// Mock data for loss reports
const mockLossReports = [
  {
    id: "L001",
    assetId: "A010",
    assetName: "Mikrofon Wireless",
    discoveryDate: "2023-07-10",
    reportDate: "2023-07-12",
    description: "Tidak dapat dijumpai selepas program ceramah",
    estimatedValue: 350.0,
    policeReportNo: "PDRM-12345",
    policeReportDate: "2023-07-13",
    status: "Siasatan",
  },
  {
    id: "L002",
    assetId: "A011",
    assetName: "Tablet",
    discoveryDate: "2023-06-05",
    reportDate: "2023-06-05",
    description: "Hilang semasa pemindahan peralatan",
    estimatedValue: 1200.0,
    policeReportNo: "PDRM-12346",
    policeReportDate: "2023-06-06",
    status: "Hapus Kira",
  },
  {
    id: "L003",
    assetId: "A012",
    assetName: "Projektor Mudah Alih",
    discoveryDate: "2023-08-01",
    reportDate: "2023-08-02",
    description: "Tidak dapat dikesan selepas dipinjamkan",
    estimatedValue: 2500.0,
    policeReportNo: "PDRM-12347",
    policeReportDate: "2023-08-03",
    status: "Siasatan",
  },
  {
    id: "L004",
    assetId: "A013",
    assetName: "Kamera DSLR",
    discoveryDate: "2023-05-20",
    reportDate: "2023-05-21",
    description: "Hilang semasa program luar",
    estimatedValue: 3000.0,
    policeReportNo: "PDRM-12348",
    policeReportDate: "2023-05-22",
    status: "Hapus Kira",
  },
  {
    id: "L005",
    assetId: "A014",
    assetName: "Speaker Bluetooth",
    discoveryDate: "2023-07-25",
    reportDate: "2023-07-26",
    description: "Tidak dapat dijumpai selepas mesyuarat",
    estimatedValue: 450.0,
    policeReportNo: null,
    policeReportDate: null,
    status: "Dilaporkan",
  },
]

export default function LossesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter loss reports based on search term and status filter
  const filteredReports = mockLossReports.filter((report) => {
    const matchesSearch =
      report.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || report.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Dilaporkan":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Siasatan":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "Hapus Kira":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Dijumpai":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight lg:hidden">Kehilangan</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/losses/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Laporan Baru
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Laporan Kehilangan</CardTitle>
          <CardDescription>Urus semua laporan kehilangan aset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari laporan..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-[180px]">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="Dilaporkan">Dilaporkan</SelectItem>
                  <SelectItem value="Siasatan">Siasatan</SelectItem>
                  <SelectItem value="Hapus Kira">Hapus Kira</SelectItem>
                  <SelectItem value="Dijumpai">Dijumpai</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Aset</TableHead>
                  <TableHead className="hidden md:table-cell">Tarikh Ditemui</TableHead>
                  <TableHead className="hidden lg:table-cell">No. Laporan Polis</TableHead>
                  <TableHead className="hidden md:table-cell">Nilai (RM)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Tiada laporan kehilangan ditemui
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell className="font-medium">
                        <div>
                          <div>{report.assetName}</div>
                          <div className="text-xs text-muted-foreground">{report.assetId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                          <span>{new Date(report.discoveryDate).toLocaleDateString("ms-MY")}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{report.policeReportNo || "-"}</TableCell>
                      <TableCell className="hidden md:table-cell">{report.estimatedValue.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(report.status)}>{report.status}</Badge>
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
                            <DropdownMenuItem>
                              <FileTextIcon className="mr-2 h-4 w-4" />
                              Lihat Butiran
                            </DropdownMenuItem>
                            {report.status === "Dilaporkan" && (
                              <>
                                <DropdownMenuItem>
                                  <EditIcon className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <CheckIcon className="mr-2 h-4 w-4" />
                                  Kemaskini Status
                                </DropdownMenuItem>
                              </>
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
