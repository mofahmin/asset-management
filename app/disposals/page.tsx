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
import { PlusIcon, SearchIcon, MoreHorizontalIcon, FileTextIcon, EditIcon, CheckIcon, XIcon } from "lucide-react"

// Mock data for disposal requests
const mockDisposalRequests = [
  {
    id: "D001",
    assetId: "A001",
    assetName: "Kerusi Pejabat (Rosak)",
    reason: "Rosak teruk dan tidak ekonomik untuk dibaiki",
    disposalMethod: "Pelupusan",
    requestDate: "2023-07-15",
    approvalStatus: "Menunggu Kelulusan",
    approvedDate: null,
    disposalDate: null,
  },
  {
    id: "D002",
    assetId: "A006",
    assetName: "Meja Lama",
    reason: "Tidak digunakan lagi dan dalam keadaan usang",
    disposalMethod: "Sumbangan",
    requestDate: "2023-06-20",
    approvalStatus: "Diluluskan",
    approvedDate: "2023-06-25",
    disposalDate: "2023-07-05",
  },
  {
    id: "D003",
    assetId: "A007",
    assetName: "Projektor (Rosak)",
    reason: "Rosak dan tidak boleh dibaiki",
    disposalMethod: "Pelupusan",
    requestDate: "2023-08-10",
    approvalStatus: "Menunggu Kelulusan",
    approvedDate: null,
    disposalDate: null,
  },
  {
    id: "D004",
    assetId: "A008",
    assetName: "Komputer Lama",
    reason: "Teknologi lapuk dan tidak sesuai untuk kegunaan semasa",
    disposalMethod: "Kitar Semula",
    requestDate: "2023-05-05",
    approvalStatus: "Diluluskan",
    approvedDate: "2023-05-10",
    disposalDate: "2023-05-20",
  },
  {
    id: "D005",
    assetId: "A009",
    assetName: "Kipas Siling (Rosak)",
    reason: "Rosak dan berbahaya untuk digunakan",
    disposalMethod: "Pelupusan",
    requestDate: "2023-08-05",
    approvalStatus: "Ditolak",
    approvedDate: "2023-08-08",
    disposalDate: null,
  },
]

export default function DisposalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterMethod, setFilterMethod] = useState("all")

  // Filter disposal requests based on search term and filters
  const filteredRequests = mockDisposalRequests.filter((request) => {
    const matchesSearch =
      request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || request.approvalStatus === filterStatus
    const matchesMethod = filterMethod === "all" || request.disposalMethod === filterMethod

    return matchesSearch && matchesStatus && matchesMethod
  })

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Menunggu Kelulusan":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Diluluskan":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Ditolak":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Selesai":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight lg:hidden">Pelupusan</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Link href="/disposals/new">
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Permohonan Baru
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permohonan Pelupusan</CardTitle>
          <CardDescription>Urus semua permohonan pelupusan aset</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari permohonan..."
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
                    <SelectItem value="Menunggu Kelulusan">Menunggu Kelulusan</SelectItem>
                    <SelectItem value="Diluluskan">Diluluskan</SelectItem>
                    <SelectItem value="Ditolak">Ditolak</SelectItem>
                    <SelectItem value="Selesai">Selesai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-[180px]">
                <Select value={filterMethod} onValueChange={setFilterMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kaedah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kaedah</SelectItem>
                    <SelectItem value="Pelupusan">Pelupusan</SelectItem>
                    <SelectItem value="Sumbangan">Sumbangan</SelectItem>
                    <SelectItem value="Jualan">Jualan</SelectItem>
                    <SelectItem value="Kitar Semula">Kitar Semula</SelectItem>
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
                  <TableHead className="hidden md:table-cell">Sebab</TableHead>
                  <TableHead className="hidden lg:table-cell">Kaedah</TableHead>
                  <TableHead className="hidden lg:table-cell">Tarikh Mohon</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Tiada permohonan pelupusan ditemui
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell className="font-medium">
                        <div>
                          <div>{request.assetName}</div>
                          <div className="text-xs text-muted-foreground">{request.assetId}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate">{request.reason}</TableCell>
                      <TableCell className="hidden lg:table-cell">{request.disposalMethod}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        {new Date(request.requestDate).toLocaleDateString("ms-MY")}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(request.approvalStatus)}>{request.approvalStatus}</Badge>
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
                            {request.approvalStatus === "Menunggu Kelulusan" && (
                              <>
                                <DropdownMenuItem>
                                  <EditIcon className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <CheckIcon className="mr-2 h-4 w-4 text-green-600" />
                                  Luluskan
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <XIcon className="mr-2 h-4 w-4 text-red-600" />
                                  Tolak
                                </DropdownMenuItem>
                              </>
                            )}
                            {request.approvalStatus === "Diluluskan" && !request.disposalDate && (
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
