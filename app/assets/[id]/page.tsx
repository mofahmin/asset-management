"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, EditIcon, HistoryIcon, QrCodeIcon, PrinterIcon } from "lucide-react"
import QRCodeGenerator from "@/components/qr-code-generator"

// Mock asset data
const mockAsset = {
  id: "A001",
  name: "Kerusi Pejabat",
  description: "Kerusi pejabat ergonomik dengan roda dan boleh laras",
  type: "Aset Alih",
  category: "Perabot",
  acquisitionDate: "2023-01-15",
  acquisitionMethod: "Pembelian",
  value: 450.0,
  location: "Pejabat Pentadbiran",
  serialNumber: "SN12345678",
  status: "Aktif",
  createdAt: "2023-01-15T10:30:00",
  updatedAt: "2023-01-15T10:30:00",
  createdBy: "Ahmad Bin Abdullah",
  updatedBy: "Ahmad Bin Abdullah",
}

// Mock asset history
const mockAssetHistory = [
  {
    id: 1,
    date: "2023-01-15",
    action: "Pendaftaran",
    description: "Aset didaftarkan dalam sistem",
    user: "Ahmad Bin Abdullah",
  },
  {
    id: 2,
    date: "2023-03-10",
    action: "Pemindahan",
    description: "Aset dipindahkan dari Stor ke Pejabat Pentadbiran",
    user: "Ahmad Bin Abdullah",
  },
  {
    id: 3,
    date: "2023-05-20",
    action: "Pemeriksaan",
    description: "Pemeriksaan berkala dijalankan",
    user: "Siti Binti Hassan",
  },
]

export default function AssetDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Butiran Aset</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Cetak
          </Button>
          <Button size="sm">
            <EditIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl">{mockAsset.name}</CardTitle>
                <CardDescription>{mockAsset.id}</CardDescription>
              </div>
              <Badge className={getStatusBadgeColor(mockAsset.status)}>{mockAsset.status}</Badge>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="details">Maklumat</TabsTrigger>
                  <TabsTrigger value="history">Sejarah</TabsTrigger>
                  <TabsTrigger value="documents">Dokumen</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Jenis</h3>
                      <p>{mockAsset.type}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Kategori</h3>
                      <p>{mockAsset.category}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Tarikh Perolehan</h3>
                      <p>{new Date(mockAsset.acquisitionDate).toLocaleDateString("ms-MY")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Kaedah Perolehan</h3>
                      <p>{mockAsset.acquisitionMethod}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Nilai (RM)</h3>
                      <p>{mockAsset.value.toFixed(2)}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Lokasi</h3>
                      <p>{mockAsset.location}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">No. Siri</h3>
                      <p>{mockAsset.serialNumber || "-"}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                      <p>{mockAsset.status}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Penerangan</h3>
                    <p>{mockAsset.description || "-"}</p>
                  </div>

                  <div className="border-t pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Didaftarkan Oleh</h3>
                        <p>{mockAsset.createdBy}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(mockAsset.createdAt).toLocaleString("ms-MY")}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Dikemaskini Oleh</h3>
                        <p>{mockAsset.updatedBy}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(mockAsset.updatedAt).toLocaleString("ms-MY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <div className="space-y-4">
                    {mockAssetHistory.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="mt-0.5">
                          <div className="rounded-full p-1 bg-blue-100 dark:bg-blue-900">
                            <HistoryIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{item.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(item.date).toLocaleDateString("ms-MY")}
                            </p>
                          </div>
                          <p className="text-sm">{item.description}</p>
                          <p className="text-xs text-muted-foreground">Oleh: {item.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="documents">
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Tiada dokumen untuk dipaparkan</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCodeIcon className="h-5 w-5" />
                QR Code
              </CardTitle>
              <CardDescription>Jana dan cetak QR code untuk aset ini</CardDescription>
            </CardHeader>
            <CardContent>
              <QRCodeGenerator assetId={mockAsset.id} assetName={mockAsset.name} location={mockAsset.location} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
