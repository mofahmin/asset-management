"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, EditIcon, CheckIcon, PrinterIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock loss data
const mockLoss = {
  id: "L001",
  assetId: "A010",
  assetName: "Mikrofon Wireless",
  discoveryDate: "2023-07-10",
  reportDate: "2023-07-12",
  description:
    "Mikrofon tidak dapat dijumpai selepas program ceramah pada malam 10 Julai 2023. Telah dicari di semua lokasi yang mungkin tetapi tidak berjaya dijumpai.",
  lastLocation: "Dewan Solat",
  estimatedValue: 350.0,
  policeReportNo: "PDRM-12345",
  policeReportDate: "2023-07-13",
  status: "Siasatan",
  notes: "Kemungkinan tertinggal dalam van pengangkutan peralatan",
  createdBy: "Ahmad Bin Abdullah",
  createdAt: "2023-07-12T14:30:00",
}

export default function LossDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()

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

  const handleUpdateStatus = () => {
    toast({
      title: "Status Dikemaskini",
      description: "Status laporan kehilangan telah dikemaskini.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Butiran Kehilangan</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Cetak
          </Button>
          {mockLoss.status === "Dilaporkan" && (
            <>
              <Button variant="outline" size="sm">
                <EditIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" onClick={handleUpdateStatus}>
                <CheckIcon className="h-4 w-4 mr-2" />
                Kemaskini Status
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">{mockLoss.assetName}</CardTitle>
            <CardDescription>
              {mockLoss.id} • {mockLoss.assetId}
            </CardDescription>
          </div>
          <Badge className={getStatusBadgeColor(mockLoss.status)}>{mockLoss.status}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tarikh Ditemui Hilang</h3>
                <p>{new Date(mockLoss.discoveryDate).toLocaleDateString("ms-MY")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tarikh Laporan</h3>
                <p>{new Date(mockLoss.reportDate).toLocaleDateString("ms-MY")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Lokasi Terakhir</h3>
                <p>{mockLoss.lastLocation}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Nilai Anggaran (RM)</h3>
                <p>{mockLoss.estimatedValue.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">No. Laporan Polis</h3>
                <p>{mockLoss.policeReportNo || "-"}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tarikh Laporan Polis</h3>
                <p>
                  {mockLoss.policeReportDate ? new Date(mockLoss.policeReportDate).toLocaleDateString("ms-MY") : "-"}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p>{mockLoss.status}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Penerangan Kejadian</h3>
              <p>{mockLoss.description}</p>
            </div>

            {mockLoss.notes && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Catatan Tambahan</h3>
                <p>{mockLoss.notes}</p>
              </div>
            )}

            <div className="border-t pt-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Dilaporkan Oleh</h3>
                <p>{mockLoss.createdBy}</p>
                <p className="text-xs text-muted-foreground">{new Date(mockLoss.createdAt).toLocaleString("ms-MY")}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
