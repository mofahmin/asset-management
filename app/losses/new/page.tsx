"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeftIcon, UploadIcon, CalendarIcon } from "lucide-react"

// Mock data for assets
const mockAssets = [
  { id: "A010", name: "Mikrofon Wireless" },
  { id: "A011", name: "Tablet" },
  { id: "A012", name: "Projektor Mudah Alih" },
  { id: "A013", name: "Kamera DSLR" },
  { id: "A014", name: "Speaker Bluetooth" },
]

export default function NewLossPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasPoliceReport, setHasPoliceReport] = useState(false)

  // Generate a random loss report ID for demonstration
  const lossId = `L${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Laporan kehilangan berjaya dihantar",
        description: `Laporan dengan ID ${lossId} telah direkodkan.`,
      })

      router.push("/losses")
    } catch (error) {
      toast({
        title: "Ralat",
        description: "Laporan kehilangan gagal. Sila cuba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Laporan Kehilangan Baru</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maklumat Kehilangan</CardTitle>
          <CardDescription>Laporkan kehilangan aset</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="lossId">ID Laporan</Label>
                <Input id="lossId" value={lossId} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reportDate">Tarikh Laporan</Label>
                <Input id="reportDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="asset">Aset</Label>
              <Select defaultValue="A010">
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Pilih aset" />
                </SelectTrigger>
                <SelectContent>
                  {mockAssets.map((asset) => (
                    <SelectItem key={asset.id} value={asset.id}>
                      {asset.name} ({asset.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discoveryDate">Tarikh Ditemui Hilang</Label>
              <div className="relative">
                <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="discoveryDate"
                  type="date"
                  className="pl-8"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Penerangan Kejadian</Label>
              <Textarea
                id="description"
                placeholder="Nyatakan bagaimana aset hilang dan keadaan terakhir dilihat"
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastLocation">Lokasi Terakhir</Label>
              <Input id="lastLocation" placeholder="Lokasi terakhir aset dilihat" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedValue">Nilai Anggaran (RM)</Label>
              <Input id="estimatedValue" type="number" step="0.01" min="0" placeholder="0.00" required />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="hasPoliceReport"
                  checked={hasPoliceReport}
                  onChange={(e) => setHasPoliceReport(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="hasPoliceReport">Laporan Polis Dibuat</Label>
              </div>
            </div>

            {hasPoliceReport && (
              <div className="space-y-4 border-l-2 border-blue-200 pl-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="policeReportNo">No. Laporan Polis</Label>
                    <Input id="policeReportNo" placeholder="Contoh: PDRM-12345" required={hasPoliceReport} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="policeReportDate">Tarikh Laporan Polis</Label>
                    <Input id="policeReportDate" type="date" required={hasPoliceReport} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="policeReport">Muat Naik Laporan Polis</Label>
                  <div className="flex items-center gap-2">
                    <Input id="policeReport" type="file" accept=".pdf,.jpg,.jpeg,.png" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <UploadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan Tambahan</Label>
              <Textarea id="notes" placeholder="Sebarang catatan tambahan" rows={2} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menghantar..." : "Hantar Laporan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
