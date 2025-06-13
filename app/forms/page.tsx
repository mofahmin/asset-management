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
import { PlusIcon, SearchIcon, MoreHorizontalIcon, FileTextIcon, PrinterIcon, DownloadIcon } from "lucide-react"

// Mock data for forms
const mockForms = [
  {
    id: "BR-AMS-001-2023-001",
    name: "BR-AMS 001",
    title: "Senarai Daftar Harta Modal",
    submittedBy: "Ahmad Bin Abdullah",
    submittedDate: "2023-05-15",
    status: "Diluluskan",
  },
  {
    id: "BR-AMS-002-2023-001",
    name: "BR-AMS 002",
    title: "Senarai Daftar Inventori",
    submittedBy: "Ahmad Bin Abdullah",
    submittedDate: "2023-05-20",
    status: "Diluluskan",
  },
  {
    id: "BR-AMS-003-2023-001",
    name: "BR-AMS 003",
    title: "Kad Kawalan Stok",
    submittedBy: "Siti Binti Hassan",
    submittedDate: "2023-06-10",
    status: "Dalam Proses",
  },
  {
    id: "BR-AMS-004-2023-001",
    name: "BR-AMS 004",
    title: "Laporan Pemeriksaan Aset",
    submittedBy: "Mohamed Bin Ismail",
    submittedDate: "2023-07-05",
    status: "Dalam Proses",
  },
  {
    id: "BR-AMS-005-2023-001",
    name: "BR-AMS 005",
    title: "Laporan Penyelenggaraan",
    submittedBy: "Ahmad Bin Abdullah",
    submittedDate: "2023-08-12",
    status: "Diluluskan",
  },
]

export default function FormsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter forms based on search term and status filter
  const filteredForms = mockForms.filter((form) => {
    const matchesSearch =
      form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || form.status === filterStatus

    return matchesSearch && matchesStatus
  })

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Diluluskan":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Dalam Proses":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Ditolak":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight lg:hidden">Borang</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/forms/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Borang Baru
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Borang BR-AMS</CardTitle>
          <CardDescription>Urus semua borang BR-AMS di sini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari borang..."
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
                  <SelectItem value="Diluluskan">Diluluskan</SelectItem>
                  <SelectItem value="Dalam Proses">Dalam Proses</SelectItem>
                  <SelectItem value="Ditolak">Ditolak</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Jenis Borang</TableHead>
                  <TableHead className="hidden md:table-cell">Tajuk</TableHead>
                  <TableHead className="hidden lg:table-cell">Dihantar Oleh</TableHead>
                  <TableHead className="hidden md:table-cell">Tarikh</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredForms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Tiada borang ditemui
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredForms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell className="font-mono text-xs">{form.id}</TableCell>
                      <TableCell className="font-medium">{form.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{form.title}</TableCell>
                      <TableCell className="hidden lg:table-cell">{form.submittedBy}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(form.submittedDate).toLocaleDateString("ms-MY")}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(form.status)}>{form.status}</Badge>
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
                              Lihat Borang
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <PrinterIcon className="mr-2 h-4 w-4" />
                              Cetak
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <DownloadIcon className="mr-2 h-4 w-4" />
                              Muat Turun PDF
                            </DropdownMenuItem>
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
