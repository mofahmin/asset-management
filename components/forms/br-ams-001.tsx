"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SaveIcon, SendIcon } from "lucide-react"

interface BRMS001FormData {
  // Organization Details
  organizationName: string
  department: string
  address: string

  // Asset Details
  assetName: string
  assetDescription: string
  assetCategory: string
  assetType: string
  brand: string
  model: string
  serialNumber: string

  // Acquisition Details
  acquisitionDate: string
  acquisitionMethod: string
  supplier: string
  invoiceNumber: string
  purchasePrice: string

  // Warranty Details
  warrantyPeriod: string
  warrantyExpiry: string

  // Custodian Details
  custodianName: string
  custodianPosition: string
  custodianDepartment: string

  // Location Details
  location: string
  sublocation: string

  // Remarks
  remarks: string
}

export default function BRMS001Form() {
  const [formData, setFormData] = useState<BRMS001FormData>({
    organizationName: "Masjid Al-Hidayah",
    department: "",
    address: "",
    assetName: "",
    assetDescription: "",
    assetCategory: "",
    assetType: "Harta Modal",
    brand: "",
    model: "",
    serialNumber: "",
    acquisitionDate: "",
    acquisitionMethod: "",
    supplier: "",
    invoiceNumber: "",
    purchasePrice: "",
    warrantyPeriod: "",
    warrantyExpiry: "",
    custodianName: "",
    custodianPosition: "",
    custodianDepartment: "",
    location: "",
    sublocation: "",
    remarks: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof BRMS001FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isDraft) {
        alert("Draf telah disimpan!")
      } else {
        alert("Borang BR-AMS 001 telah dihantar untuk kelulusan!")
      }
    } catch (error) {
      alert("Ralat berlaku. Sila cuba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">BORANG BR-AMS 001</h1>
        <p className="text-lg font-semibold">PENDAFTARAN HARTA MODAL</p>
        <p className="text-sm text-muted-foreground">
          No. Rujukan: BR-AMS-001-{new Date().getFullYear()}-
          {Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")}
        </p>
      </div>

      <form className="space-y-6">
        {/* Section A: Organization Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian A: Maklumat Organisasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organizationName">Nama Organisasi *</Label>
                <Input
                  id="organizationName"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange("organizationName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Jabatan/Unit *</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Alamat *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Section B: Asset Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian B: Maklumat Aset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assetName">Nama Aset *</Label>
                <Input
                  id="assetName"
                  value={formData.assetName}
                  onChange={(e) => handleInputChange("assetName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="assetCategory">Kategori Aset *</Label>
                <Select
                  value={formData.assetCategory}
                  onValueChange={(value) => handleInputChange("assetCategory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perabot">Perabot</SelectItem>
                    <SelectItem value="peralatan-elektronik">Peralatan Elektronik</SelectItem>
                    <SelectItem value="kenderaan">Kenderaan</SelectItem>
                    <SelectItem value="mesin-peralatan">Mesin & Peralatan</SelectItem>
                    <SelectItem value="lain-lain">Lain-lain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="assetDescription">Penerangan Aset *</Label>
              <Textarea
                id="assetDescription"
                value={formData.assetDescription}
                onChange={(e) => handleInputChange("assetDescription", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="brand">Jenama</Label>
                <Input id="brand" value={formData.brand} onChange={(e) => handleInputChange("brand", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="model">Model</Label>
                <Input id="model" value={formData.model} onChange={(e) => handleInputChange("model", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="serialNumber">No. Siri</Label>
                <Input
                  id="serialNumber"
                  value={formData.serialNumber}
                  onChange={(e) => handleInputChange("serialNumber", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section C: Acquisition Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian C: Maklumat Perolehan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="acquisitionDate">Tarikh Perolehan *</Label>
                <Input
                  id="acquisitionDate"
                  type="date"
                  value={formData.acquisitionDate}
                  onChange={(e) => handleInputChange("acquisitionDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="acquisitionMethod">Kaedah Perolehan *</Label>
                <Select
                  value={formData.acquisitionMethod}
                  onValueChange={(value) => handleInputChange("acquisitionMethod", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kaedah" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pembelian">Pembelian</SelectItem>
                    <SelectItem value="hibah">Hibah</SelectItem>
                    <SelectItem value="wakaf">Wakaf</SelectItem>
                    <SelectItem value="sumbangan">Sumbangan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="supplier">Pembekal</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => handleInputChange("supplier", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="invoiceNumber">No. Invois</Label>
                <Input
                  id="invoiceNumber"
                  value={formData.invoiceNumber}
                  onChange={(e) => handleInputChange("invoiceNumber", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="purchasePrice">Harga Pembelian (RM) *</Label>
              <Input
                id="purchasePrice"
                type="number"
                step="0.01"
                value={formData.purchasePrice}
                onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Section D: Warranty Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian D: Maklumat Waranti</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="warrantyPeriod">Tempoh Waranti</Label>
                <Input
                  id="warrantyPeriod"
                  value={formData.warrantyPeriod}
                  onChange={(e) => handleInputChange("warrantyPeriod", e.target.value)}
                  placeholder="Contoh: 2 tahun"
                />
              </div>
              <div>
                <Label htmlFor="warrantyExpiry">Tarikh Tamat Waranti</Label>
                <Input
                  id="warrantyExpiry"
                  type="date"
                  value={formData.warrantyExpiry}
                  onChange={(e) => handleInputChange("warrantyExpiry", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section E: Custodian Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian E: Maklumat Penjaga Aset</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="custodianName">Nama Penjaga *</Label>
                <Input
                  id="custodianName"
                  value={formData.custodianName}
                  onChange={(e) => handleInputChange("custodianName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="custodianPosition">Jawatan *</Label>
                <Input
                  id="custodianPosition"
                  value={formData.custodianPosition}
                  onChange={(e) => handleInputChange("custodianPosition", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="custodianDepartment">Jabatan/Unit *</Label>
              <Input
                id="custodianDepartment"
                value={formData.custodianDepartment}
                onChange={(e) => handleInputChange("custodianDepartment", e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Section F: Location Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian F: Maklumat Lokasi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Lokasi Utama *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="sublocation">Sub-lokasi</Label>
                <Input
                  id="sublocation"
                  value={formData.sublocation}
                  onChange={(e) => handleInputChange("sublocation", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section G: Remarks */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian G: Catatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="remarks">Catatan Tambahan</Label>
              <Textarea
                id="remarks"
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => handleSubmit(true)} disabled={isSubmitting}>
            <SaveIcon className="h-4 w-4 mr-2" />
            Simpan Draf
          </Button>
          <Button type="button" onClick={() => handleSubmit(false)} disabled={isSubmitting}>
            <SendIcon className="h-4 w-4 mr-2" />
            Hantar untuk Kelulusan
          </Button>
        </div>
      </form>
    </div>
  )
}
