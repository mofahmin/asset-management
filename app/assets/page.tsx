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
import { PlusIcon, SearchIcon, MoreHorizontalIcon, FileTextIcon, EditIcon, TrashIcon, DownloadIcon } from "lucide-react"

// Mock data for assets
const mockAssets = [
  {
    id: "A001",
    name: "Kerusi Pejabat",
    category: "Perabot",
    type: "Aset Alih",
    location: "Pejabat Pentadbiran",
    acquisitionDate: "2023-01-15",
    value: 450.0,
    status: "Aktif",
  },
  {
    id: "A002",
    name: "Komputer Riba",
    category: "Peralatan Elektronik",
    type: "Aset Alih",
    location: "Pejabat Pentadbiran",
    acquisitionDate: "2023-02-20",
    value: 3200.0,
    status: "Aktif",
  },
  {
    id: "A003",
    name: "Sistem Pembesar Suara",
    category: "Peralatan Audio",
    type: "Aset Alih",
    location: "Dewan Solat",
    acquisitionDate: "2022-11-05",
    value: 5000.0,
    status: "Penyelenggaraan",
  },
  {
    id: "A004",
    name: "Penghawa Dingin",
    category: "Peralatan Elektronik",
    type: "Aset Alih",
    location: "Dewan Solat",
    acquisitionDate: "2022-08-10",
    value: 2800.0,
    status: "Aktif",
  },
  {
    id: "A005",
    name: "Bangunan Utama",
    category: "Bangunan",
    type: "Aset Tak Alih",
    location: "Tapak Masjid",
    acquisitionDate: "2010-05-20",
    value: 1500000.0,
    status: "Aktif",
  },
]

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  // Filter assets based on search term and filters
  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || asset.type === filterType
    const matchesStatus = filterStatus === "all" || asset.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Penyelenggaraan":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Pelupusan":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Hilang":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight lg:hidden">Aset</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/assets/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Daftar Aset Baru
            </Button>
          </Link>
          <Button variant="outline">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Eksport
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Senarai Aset</CardTitle>
          <CardDescription>Urus semua aset masjid dan surau di sini</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari aset..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-[180px]">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Jenis Aset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    <SelectItem value="Aset Alih">Aset Alih</SelectItem>
                    <SelectItem value="Aset Tak Alih">Aset Tak Alih</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Penyelenggaraan">Penyelenggaraan</SelectItem>
                    <SelectItem value="Pelupusan">Pelupusan</SelectItem>
                    <SelectItem value="Hilang">Hilang</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NOMBOR SIRI PENDAFTARAN</TableHead>
                  <TableHead>KETERANGAN ASET</TableHead>
                  <TableHead className="hidden md:table-cell">Kategori</TableHead>
                  <TableHead className="hidden md:table-cell">Jenis</TableHead>
                  <TableHead className="hidden lg:table-cell">Lokasi</TableHead>
                  <TableHead className="hidden lg:table-cell">Tarikh Perolehan</TableHead>
                  <TableHead className="hidden md:table-cell">Nilai (RM)</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      Tiada aset ditemui
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredAssets.map((asset) => (
                    <TableRow key={asset.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell>{asset.id}</TableCell>
                      <TableCell className="font-medium">
                        <Link href={`/assets/${asset.id}`} className="hover:underline">
                          {asset.name}
                        </Link>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{asset.category}</TableCell>
                      <TableCell className="hidden md:table-cell">{asset.type}</TableCell>
                      <TableCell className="hidden lg:table-cell">{asset.location}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(asset.acquisitionDate).toLocaleDateString("ms-MY")}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{asset.value.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(asset.status)}>{asset.status}</Badge>
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
                              <Link href={`/assets/${asset.id}`}>
                                <FileTextIcon className="mr-2 h-4 w-4" />
                                Lihat Butiran
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <EditIcon className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <TrashIcon className="mr-2 h-4 w-4" />
                              Hapus
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
