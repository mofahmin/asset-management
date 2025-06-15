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
import { ArrowLeftIcon, UploadIcon } from "lucide-react"

// Mock data for assets
const mockAssets = [
  { id: "A001", name: "Kerusi Pejabat" },
  { id: "A002", name: "Komputer Riba" },
  { id: "A003", name: "Sistem Pembesar Suara" },
  { id: "A004", name: "Penghawa Dingin" },
  { id: "A005", name: "Bangunan Utama" },
]

export default function NewDisposalPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate a random disposal ID for demonstration
  const disposalId = `D${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Permohonan pelupusan berjaya dihantar",
        description: `Permohonan dengan ID ${disposalId} telah dihantar untuk kelulusan.`,
      })

      router.push("/disposals")
    } catch (error) {
      toast({
        title: "Ralat",
        description: "Permohonan pelupusan gagal. Sila cuba lagi.",
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
        <h1 className="text-2xl font-bold tracking-tight">Permohonan Pelupusan Baru</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maklumat Pelupusan</CardTitle>
          <CardDescription>Mohon kelulusan untuk pelupusan aset</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="disposalId">ID Permohonan</Label>
                <Input id="disposalId" value={disposalId} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="requestDate">Tarikh Permohonan</Label>
                <Input id="requestDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="asset">Aset</Label>
              <Select defaultValue="A001">
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
              <Label htmlFor="reason">Sebab Pelupusan</Label>
              <Textarea id="reason" placeholder="Nyatakan sebab aset perlu dilupuskan" rows={3} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="disposalMethod">Kaedah Pelupusan</Label>
              <Select defaultValue="Pelupusan">
                <SelectTrigger id="disposalMethod">
                  <SelectValue placeholder="Pilih kaedah pelupusan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pelupusan">Pelupusan</SelectItem>
                  <SelectItem value="Sumbangan">Sumbangan</SelectItem>
                  <SelectItem value="Jualan">Jualan</SelectItem>
                  <SelectItem value="Kitar Semula">Kitar Semula</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentValue">Nilai Semasa (RM)</Label>
              <Input id="currentValue" type="number" step="0.01" min="0" placeholder="0.00" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Keadaan Aset</Label>
              <Select defaultValue="Rosak">
                <SelectTrigger id="condition">
                  <SelectValue placeholder="Pilih keadaan aset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Rosak">Rosak</SelectItem>
                  <SelectItem value="Usang">Usang</SelectItem>
                  <SelectItem value="Tidak Ekonomik">Tidak Ekonomik untuk Dibaiki</SelectItem>
                  <SelectItem value="Lapuk">Teknologi Lapuk</SelectItem>
                  <SelectItem value="Lain-lain">Lain-lain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assetImage">Gambar Aset</Label>
              <div className="flex items-center gap-2">
                <Input id="assetImage" type="file" accept="image/*" className="flex-1" />
                <Button type="button" variant="outline" size="icon">
                  <UploadIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">Muat naik gambar aset dalam keadaan semasa</p>
            </div>

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
              {isSubmitting ? "Menghantar..." : "Hantar Permohonan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
