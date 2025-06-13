"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, PrinterIcon, CheckIcon, XIcon } from "lucide-react"
import PDFExportButton from "@/components/pdf-export-button"
import { useToast } from "@/components/ui/use-toast"

// Mock form data
const mockForm = {
  id: "BR-AMS-001-2023-001",
  name: "BR-AMS 001",
  title: "Senarai Daftar Harta Modal",
  submittedBy: "Ahmad Bin Abdullah",
  submittedDate: "2023-05-15",
  status: "Diluluskan",
  approvedBy: "Mohamed Bin Ismail",
  approvedDate: "2023-05-18",
  content: {
    assets: [
      {
        name: "Kerusi Pejabat",
        category: "Perabot",
        acquisitionDate: "2023-01-15",
        value: 450.0,
        location: "Pejabat Pentadbiran",
        serialNumber: "SN12345678",
        acquisitionMethod: "Pembelian",
      },
      {
        name: "Komputer Riba",
        category: "Peralatan Elektronik",
        acquisitionDate: "2023-02-20",
        value: 3200.0,
        location: "Pejabat Pentadbiran",
        serialNumber: "SN87654321",
        acquisitionMethod: "Pembelian",
      },
      {
        name: "Sistem Pembesar Suara",
        category: "Peralatan Audio",
        acquisitionDate: "2022-11-05",
        value: 5000.0,
        location: "Dewan Solat",
        serialNumber: "SN-AUDIO-123",
        acquisitionMethod: "Pembelian",
      },
    ],
    remarks: "Senarai aset yang didaftarkan dalam sistem pada suku pertama tahun 2023.",
  },
}

export default function FormDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isPrinting, setIsPrinting] = useState(false)

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

  const handlePrint = async () => {
    setIsPrinting(true)

    try {
      // In a real implementation, we would prepare the document for printing
      // For this demo, we'll just use the browser's print functionality
      await new Promise((resolve) => setTimeout(resolve, 1000))
      window.print()
    } catch (error) {
      console.error("Error printing form:", error)
      toast({
        title: "Ralat",
        description: "Gagal mencetak borang. Sila cuba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsPrinting(false)
    }
  }

  const handleExportComplete = () => {
    toast({
      title: "Eksport Berjaya",
      description: `Borang ${mockForm.name} telah berjaya dieksport.`,
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Butiran Borang</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} disabled={isPrinting}>
            <PrinterIcon className="h-4 w-4 mr-2" />
            {isPrinting ? "Mencetak..." : "Cetak"}
          </Button>
          <PDFExportButton
            formId={mockForm.id}
            formType={mockForm.name}
            formTitle={mockForm.title}
            onExport={handleExportComplete}
          />
          {mockForm.status === "Dalam Proses" && (
            <>
              <Button variant="outline" size="sm" className="text-green-600">
                <CheckIcon className="h-4 w-4 mr-2" />
                Luluskan
              </Button>
              <Button variant="outline" size="sm" className="text-red-600">
                <XIcon className="h-4 w-4 mr-2" />
                Tolak
              </Button>
            </>
          )}
        </div>
      </div>

      <Card className="print:shadow-none print:border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 print:pb-0">
          <div>
            <CardTitle className="text-xl">{mockForm.title}</CardTitle>
            <CardDescription>{mockForm.id}</CardDescription>
          </div>
          <Badge className={getStatusBadgeColor(mockForm.status)}>{mockForm.status}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Jenis Borang</h3>
                <p>{mockForm.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tarikh Dihantar</h3>
                <p>{new Date(mockForm.submittedDate).toLocaleDateString("ms-MY")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Dihantar Oleh</h3>
                <p>{mockForm.submittedBy}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p>{mockForm.status}</p>
              </div>
              {mockForm.status === "Diluluskan" && (
                <>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Diluluskan Oleh</h3>
                    <p>{mockForm.approvedBy}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tarikh Diluluskan</h3>
                    <p>{new Date(mockForm.approvedDate).toLocaleDateString("ms-MY")}</p>
                  </div>
                </>
              )}
            </div>

            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Senarai Aset</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-2">Nama Aset</th>
                      <th className="text-left py-2 px-2">Kategori</th>
                      <th className="text-left py-2 px-2">Tarikh Perolehan</th>
                      <th className="text-left py-2 px-2">Nilai (RM)</th>
                      <th className="text-left py-2 px-2">Lokasi</th>
                      <th className="text-left py-2 px-2">No. Siri</th>
                      <th className="text-left py-2 px-2">Kaedah Perolehan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockForm.content.assets.map((asset, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-2">{asset.name}</td>
                        <td className="py-2 px-2">{asset.category}</td>
                        <td className="py-2 px-2">{new Date(asset.acquisitionDate).toLocaleDateString("ms-MY")}</td>
                        <td className="py-2 px-2">{asset.value.toFixed(2)}</td>
                        <td className="py-2 px-2">{asset.location}</td>
                        <td className="py-2 px-2">{asset.serialNumber}</td>
                        <td className="py-2 px-2">{asset.acquisitionMethod}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Catatan</h3>
              <p>{mockForm.content.remarks || "-"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
