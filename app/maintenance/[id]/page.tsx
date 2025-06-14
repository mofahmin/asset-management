"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, EditIcon, CheckIcon, PrinterIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock maintenance data
const mockMaintenance = {
  id: "M001",
  assetId: "A003",
  assetName: "Sistem Pembesar Suara",
  maintenanceType: "Penyelenggaraan Berkala",
  description: "Pembersihan dan kalibrasi sistem audio untuk memastikan kualiti bunyi yang optimum",
  scheduledDate: "2023-08-15",
  completedDate: null,
  vendor: "Audio Solutions Sdn Bhd",
  cost: 500.0,
  estimatedDuration: 4,
  status: "Dijadualkan",
  notes: "Perlu dilakukan sebelum majlis besar bulan depan",
  createdAt: "2023-07-20T10:30:00",
  createdBy: "Ahmad Bin Abdullah",
}

export default function MaintenanceDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()

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

  const handleMarkComplete = () => {
    toast({
      title: "Penyelenggaraan Selesai",
      description: "Penyelenggaraan telah ditandakan sebagai selesai.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Butiran Penyelenggaraan</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Cetak
          </Button>
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
          {mockMaintenance.status === "Dijadualkan" && (
            <Button size="sm" onClick={handleMarkComplete}>
              <CheckIcon className="h-4 w-4 mr-2" />
              Tandakan Selesai
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">{mockMaintenance.assetName}</CardTitle>
            <CardDescription>
              {mockMaintenance.id} • {mockMaintenance.assetId}
            </CardDescription>
          </div>
          <Badge className={getStatusBadgeColor(mockMaintenance.status)}>{mockMaintenance.status}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Jenis Penyelenggaraan</h3>
                <p>{mockMaintenance.maintenanceType}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tarikh Dijadualkan</h3>
                <p>{new Date(mockMaintenance.scheduledDate).toLocaleDateString("ms-MY")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Vendor/Kontraktor</h3>
                <p>{mockMaintenance.vendor}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Anggaran Kos (RM)</h3>
                <p>{mockMaintenance.cost.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Anggaran Tempoh</h3>
                <p>{mockMaintenance.estimatedDuration} jam</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p>{mockMaintenance.status}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Penerangan</h3>
              <p>{mockMaintenance.description}</p>
            </div>

            {mockMaintenance.notes && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Catatan</h3>
                <p>{mockMaintenance.notes}</p>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Dijadualkan Oleh</h3>
                  <p>{mockMaintenance.createdBy}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(mockMaintenance.createdAt).toLocaleString("ms-MY")}
                  </p>
                </div>
                {mockMaintenance.completedDate && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tarikh Selesai</h3>
                    <p>{new Date(mockMaintenance.completedDate).toLocaleDateString("ms-MY")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
