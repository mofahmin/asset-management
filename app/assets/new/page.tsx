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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeftIcon, UploadIcon } from "lucide-react"

export default function NewAssetPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate a random asset ID for demonstration
  const assetId = `A${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Aset berjaya didaftarkan",
        description: `Aset dengan ID ${assetId} telah didaftarkan.`,
      })

      router.push("/assets")
    } catch (error) {
      toast({
        title: "Ralat",
        description: "Pendaftaran aset gagal. Sila cuba lagi.",
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
        <h1 className="text-2xl font-bold tracking-tight">Daftar Aset Baru</h1>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Maklumat Aset</TabsTrigger>
          <TabsTrigger value="documents">Dokumen</TabsTrigger>
          <TabsTrigger value="location">Lokasi</TabsTrigger>
        </TabsList>

        <form onSubmit={handleSubmit}>
          <TabsContent value="details">
            <Card>
              <CardHeader>
                <CardTitle>Maklumat Aset</CardTitle>
                <CardDescription>Masukkan maklumat asas untuk aset baru</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="assetId">ID Aset</Label>
                    <Input id="assetId" value={assetId} readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="assetType">Jenis Aset</Label>
                    <Select defaultValue="Aset Alih">
                      <SelectTrigger id="assetType">
                        <SelectValue placeholder="Pilih jenis aset" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aset Alih">Aset Alih</SelectItem>
                        <SelectItem value="Aset Tak Alih">Aset Tak Alih</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assetName">Nama Aset</Label>
                  <Input id="assetName" placeholder="Contoh: Kerusi Pejabat" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select defaultValue="Perabot">
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Perabot">Perabot</SelectItem>
                        <SelectItem value="Peralatan Elektronik">Peralatan Elektronik</SelectItem>
                        <SelectItem value="Peralatan Audio">Peralatan Audio</SelectItem>
                        <SelectItem value="Bangunan">Bangunan</SelectItem>
                        <SelectItem value="Tanah">Tanah</SelectItem>
                        <SelectItem value="Lain-lain">Lain-lain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="acquisitionMethod">Kaedah Perolehan</Label>
                    <Select defaultValue="Pembelian">
                      <SelectTrigger id="acquisitionMethod">
                        <SelectValue placeholder="Pilih kaedah perolehan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pembelian">Pembelian</SelectItem>
                        <SelectItem value="Wakaf">Wakaf</SelectItem>
                        <SelectItem value="Sumbangan">Sumbangan</SelectItem>
                        <SelectItem value="Lain-lain">Lain-lain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="acquisitionDate">Tarikh Perolehan</Label>
                    <Input id="acquisitionDate" type="date" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="value">Nilai (RM)</Label>
                    <Input id="value" type="number" step="0.01" min="0" placeholder="0.00" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serialNumber">No. Siri / No. Pendaftaran</Label>
                  <Input id="serialNumber" placeholder="Contoh: SN12345678" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Penerangan</Label>
                  <Textarea id="description" placeholder="Masukkan penerangan atau ciri-ciri aset" rows={3} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Dokumen Sokongan</CardTitle>
                <CardDescription>Muat naik dokumen berkaitan aset</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="invoice">Invois / Resit</Label>
                  <div className="flex items-center gap-2">
                    <Input id="invoice" type="file" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <UploadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deliveryOrder">Nota Serahan (DO)</Label>
                  <div className="flex items-center gap-2">
                    <Input id="deliveryOrder" type="file" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <UploadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wakafLetter">Surat Wakaf (jika berkaitan)</Label>
                  <div className="flex items-center gap-2">
                    <Input id="wakafLetter" type="file" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <UploadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assetImage">Gambar Aset</Label>
                  <div className="flex items-center gap-2">
                    <Input id="assetImage" type="file" accept="image/*" className="flex-1" />
                    <Button type="button" variant="outline" size="icon">
                      <UploadIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardHeader>
                <CardTitle>Lokasi & Pegawai Bertanggungjawab</CardTitle>
                <CardDescription>Tetapkan lokasi dan pegawai bertanggungjawab untuk aset ini</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Lokasi</Label>
                  <Select defaultValue="Pejabat Pentadbiran">
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pejabat Pentadbiran">Pejabat Pentadbiran</SelectItem>
                      <SelectItem value="Dewan Solat">Dewan Solat</SelectItem>
                      <SelectItem value="Bilik Mesyuarat">Bilik Mesyuarat</SelectItem>
                      <SelectItem value="Dapur">Dapur</SelectItem>
                      <SelectItem value="Stor">Stor</SelectItem>
                      <SelectItem value="Lain-lain">Lain-lain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customLocation">Lokasi Terperinci (jika berkaitan)</Label>
                  <Input id="customLocation" placeholder="Contoh: Tingkat 1, Bilik 3" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="responsibleOfficer">Pegawai Bertanggungjawab</Label>
                  <Select defaultValue="current-user">
                    <SelectTrigger id="responsibleOfficer">
                      <SelectValue placeholder="Pilih pegawai" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-user">Ahmad Bin Abdullah (Anda)</SelectItem>
                      <SelectItem value="user-1">Siti Binti Hassan</SelectItem>
                      <SelectItem value="user-2">Mohamed Bin Ismail</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Catatan</Label>
                  <Textarea id="notes" placeholder="Sebarang catatan tambahan mengenai lokasi atau pegawai" rows={3} />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Mendaftar..." : "Daftar Aset"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  )
}
