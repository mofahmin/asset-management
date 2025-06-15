"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, EditIcon, CheckIcon, XIcon, PrinterIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock disposal data
const mockDisposal = {
  id: "D001",
  assetId: "A001",
  assetName: "Kerusi Pejabat (Rosak)",
  reason: "Rosak teruk dan tidak ekonomik untuk dibaiki. Bahagian sandaran telah patah dan tidak boleh dibaiki.",
  disposalMethod: "Pelupusan",
  requestDate: "2023-07-15",
  approvalStatus: "Menunggu Kelulusan",
  approvedDate: null,
  disposalDate: null,
  currentValue: 50.0,
  condition: "Rosak",
  notes: "Kerusi telah digunakan selama 5 tahun dan mengalami kerosakan struktur",
  createdBy: "Ahmad Bin Abdullah",
  createdAt: "2023-07-15T09:30:00",
}

export default function DisposalDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()

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

  const handleApprove = () => {
    toast({
      title: "Permohonan Diluluskan",
      description: "Permohonan pelupusan telah diluluskan.",
    })
  }

  const handleReject = () => {
    toast({
      title: "Permohonan Ditolak",
      description: "Permohonan pelupusan telah ditolak.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Butiran Pelupusan</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <PrinterIcon className="h-4 w-4 mr-2" />
            Cetak
          </Button>
          {mockDisposal.approvalStatus === "Menunggu Kelulusan" && (
            <>
              <Button variant="outline" size="sm">
                <EditIcon className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button size="sm" onClick={handleApprove}>
                <CheckIcon className="h-4 w-4 mr-2" />
                Luluskan
              </Button>
              <Button variant="destructive" size="sm" onClick={handleReject}>
                <XIcon className="h-4 w-4 mr-2" />
                Tolak
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">{mockDisposal.assetName}</CardTitle>
            <CardDescription>
              {mockDisposal.id} • {mockDisposal.assetId}
            </CardDescription>
          </div>
          <Badge className={getStatusBadgeColor(mockDisposal.approvalStatus)}>{mockDisposal.approvalStatus}</Badge>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Kaedah Pelupusan</h3>
                <p>{mockDisposal.disposalMethod}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Tarikh Permohonan</h3>
                <p>{new Date(mockDisposal.requestDate).toLocaleDateString("ms-MY")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Nilai Semasa (RM)</h3>
                <p>{mockDisposal.currentValue.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Keadaan Aset</h3>
                <p>{mockDisposal.condition}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <p>{mockDisposal.approvalStatus}</p>
              </div>
              {mockDisposal.approvedDate && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tarikh Diluluskan</h3>
                  <p>{new Date(mockDisposal.approvedDate).toLocaleDateString("ms-MY")}</p>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Sebab Pelupusan</h3>
              <p>{mockDisposal.reason}</p>
            </div>

            {mockDisposal.notes && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Catatan Tambahan</h3>
                <p>{mockDisposal.notes}</p>
              </div>
            )}

            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Dimohon Oleh</h3>
                  <p>{mockDisposal.createdBy}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(mockDisposal.createdAt).toLocaleString("ms-MY")}
                  </p>
                </div>
                {mockDisposal.disposalDate && (
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Tarikh Pelupusan</h3>
                    <p>{new Date(mockDisposal.disposalDate).toLocaleDateString("ms-MY")}</p>
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
