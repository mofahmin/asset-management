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
import { ArrowLeftIcon, CalendarIcon } from "lucide-react"

// Mock data for assets
const mockAssets = [
  { id: "A001", name: "Kerusi Pejabat" },
  { id: "A002", name: "Komputer Riba" },
  { id: "A003", name: "Sistem Pembesar Suara" },
  { id: "A004", name: "Penghawa Dingin" },
  { id: "A005", name: "Bangunan Utama" },
]

export default function NewMaintenancePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate a random maintenance ID for demonstration
  const maintenanceId = `M${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Penyelenggaraan berjaya dijadualkan",
        description: `Penyelenggaraan dengan ID ${maintenanceId} telah dijadualkan.`,
      })

      router.push("/maintenance")
    } catch (error) {
      toast({
        title: "Ralat",
        description: "Penjadualan penyelenggaraan gagal. Sila cuba lagi.",
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
        <h1 className="text-2xl font-bold tracking-tight">Jadual Penyelenggaraan Baru</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maklumat Penyelenggaraan</CardTitle>
          <CardDescription>Jadualkan aktiviti penyelenggaraan untuk aset</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceId">ID Penyelenggaraan</Label>
                <Input id="maintenanceId" value={maintenanceId} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceType">Jenis Penyelenggaraan</Label>
                <Select defaultValue="Penyelenggaraan Berkala">
                  <SelectTrigger id="maintenanceType">
                    <SelectValue placeholder="Pilih jenis penyelenggaraan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Penyelenggaraan Berkala">Penyelenggaraan Berkala</SelectItem>
                    <SelectItem value="Pembaikan">Pembaikan</SelectItem>
                    <SelectItem value="Naik Taraf">Naik Taraf</SelectItem>
                    <SelectItem value="Pembaikan Kecemasan">Pembaikan Kecemasan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="asset">Aset</Label>
              <Select defaultValue="A003">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="scheduledDate">Tarikh Dijadualkan</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="scheduledDate"
                    type="date"
                    className="pl-8"
                    defaultValue={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Anggaran Tempoh (jam)</Label>
                <Input id="estimatedDuration" type="number" min="0.5" step="0.5" defaultValue="2" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor / Kontraktor</Label>
                <Input id="vendor" placeholder="Nama vendor atau kontraktor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedCost">Anggaran Kos (RM)</Label>
                <Input id="estimatedCost" type="number" step="0.01" min="0" placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Penerangan</Label>
              <Textarea
                id="description"
                placeholder="Penerangan terperinci mengenai penyelenggaraan yang akan dilakukan"
                rows={3}
                required
              />
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
              {isSubmitting ? "Menjadualkan..." : "Jadual Penyelenggaraan"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
