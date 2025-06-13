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
import { ArrowLeftIcon, PlusIcon, TrashIcon } from "lucide-react"

export default function NewFormPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formType, setFormType] = useState("BR-AMS 001")
  const [assetRows, setAssetRows] = useState([
    {
      id: 1,
      name: "",
      category: "",
      acquisitionDate: "",
      value: "",
      location: "",
      serialNumber: "",
      acquisitionMethod: "",
    },
  ])

  // Generate a random form ID for demonstration
  const formId = `BR-AMS-001-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0")}`

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Borang berjaya dihantar",
        description: `Borang dengan ID ${formId} telah dihantar untuk kelulusan.`,
      })

      router.push("/forms")
    } catch (error) {
      toast({
        title: "Ralat",
        description: "Penghantaran borang gagal. Sila cuba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const addAssetRow = () => {
    const newId = assetRows.length > 0 ? Math.max(...assetRows.map((row) => row.id)) + 1 : 1
    setAssetRows([
      ...assetRows,
      {
        id: newId,
        name: "",
        category: "",
        acquisitionDate: "",
        value: "",
        location: "",
        serialNumber: "",
        acquisitionMethod: "",
      },
    ])
  }

  const removeAssetRow = (id: number) => {
    if (assetRows.length > 1) {
      setAssetRows(assetRows.filter((row) => row.id !== id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Borang Baru</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Borang BR-AMS 001</CardTitle>
          <CardDescription>Senarai Daftar Harta Modal</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="formId">ID Borang</Label>
                <Input id="formId" value={formId} readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="formType">Jenis Borang</Label>
                <Select value={formType} onValueChange={setFormType}>
                  <SelectTrigger id="formType">
                    <SelectValue placeholder="Pilih jenis borang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BR-AMS 001">BR-AMS 001 - Senarai Daftar Harta Modal</SelectItem>
                    <SelectItem value="BR-AMS 002">BR-AMS 002 - Senarai Daftar Inventori</SelectItem>
                    <SelectItem value="BR-AMS 003">BR-AMS 003 - Kad Kawalan Stok</SelectItem>
                    <SelectItem value="BR-AMS 004">BR-AMS 004 - Laporan Pemeriksaan Aset</SelectItem>
                    <SelectItem value="BR-AMS 005">BR-AMS 005 - Laporan Penyelenggaraan</SelectItem>
                    <SelectItem value="BR-AMS 006">BR-AMS 006 - Laporan Pelupusan</SelectItem>
                    <SelectItem value="BR-AMS 007">BR-AMS 007 - Laporan Kehilangan</SelectItem>
                    <SelectItem value="BR-AMS 008">BR-AMS 008 - Sijil Penyerahan Aset</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preparedBy">Disediakan Oleh</Label>
                <Input id="preparedBy" value="Ahmad Bin Abdullah" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preparedDate">Tarikh</Label>
                <Input id="preparedDate" type="date" defaultValue={new Date().toISOString().split("T")[0]} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="remarks">Catatan</Label>
              <Textarea id="remarks" placeholder="Sebarang catatan tambahan" rows={2} />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Senarai Aset</h3>
                <Button type="button" variant="outline" size="sm" onClick={addAssetRow}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tambah Aset
                </Button>
              </div>

              <div className="space-y-4">
                {assetRows.map((row, index) => (
                  <div key={row.id} className="border rounded-md p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Aset {index + 1}</h4>
                      {assetRows.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeAssetRow(row.id)}>
                          <TrashIcon className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`assetName-${row.id}`}>Nama Aset</Label>
                        <Input id={`assetName-${row.id}`} placeholder="Contoh: Kerusi Pejabat" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`category-${row.id}`}>Kategori</Label>
                        <Select defaultValue="Perabot">
                          <SelectTrigger id={`category-${row.id}`}>
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
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`acquisitionDate-${row.id}`}>Tarikh Perolehan</Label>
                        <Input id={`acquisitionDate-${row.id}`} type="date" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`value-${row.id}`}>Nilai (RM)</Label>
                        <Input id={`value-${row.id}`} type="number" step="0.01" min="0" placeholder="0.00" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`location-${row.id}`}>Lokasi</Label>
                        <Select defaultValue="Pejabat Pentadbiran">
                          <SelectTrigger id={`location-${row.id}`}>
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
                        <Label htmlFor={`serialNumber-${row.id}`}>No. Siri</Label>
                        <Input id={`serialNumber-${row.id}`} placeholder="Contoh: SN12345678" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`acquisitionMethod-${row.id}`}>Kaedah Perolehan</Label>
                      <Select defaultValue="Pembelian">
                        <SelectTrigger id={`acquisitionMethod-${row.id}`}>
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
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menghantar..." : "Hantar Borang"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
