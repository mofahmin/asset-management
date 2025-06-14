"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { PlusIcon, TrashIcon, SaveIcon, SendIcon } from "lucide-react"

interface InventoryItem {
  id: string
  itemName: string
  description: string
  unit: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface BRMS002FormData {
  // Organization Details
  organizationName: string
  department: string
  address: string

  // Inventory Details
  inventoryType: string
  storageLocation: string
  responsiblePerson: string

  // Items
  items: InventoryItem[]

  // Summary
  totalItems: number
  totalValue: number

  // Remarks
  remarks: string
}

export default function BRMS002Form() {
  const [formData, setFormData] = useState<BRMS002FormData>({
    organizationName: "Masjid Al-Hidayah",
    department: "",
    address: "",
    inventoryType: "",
    storageLocation: "",
    responsiblePerson: "",
    items: [
      {
        id: "1",
        itemName: "",
        description: "",
        unit: "",
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
      },
    ],
    totalItems: 0,
    totalValue: 0,
    remarks: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof BRMS002FormData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleItemChange = (itemId: string, field: keyof InventoryItem, value: string | number) => {
    setFormData((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, [field]: value }

          // Auto-calculate total price
          if (field === "quantity" || field === "unitPrice") {
            updatedItem.totalPrice = updatedItem.quantity * updatedItem.unitPrice
          }

          return updatedItem
        }
        return item
      })

      // Calculate totals
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalValue = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)

      return {
        ...prev,
        items: updatedItems,
        totalItems,
        totalValue,
      }
    })
  }

  const addItem = () => {
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      itemName: "",
      description: "",
      unit: "",
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
    }

    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }))
  }

  const removeItem = (itemId: string) => {
    if (formData.items.length > 1) {
      setFormData((prev) => {
        const updatedItems = prev.items.filter((item) => item.id !== itemId)
        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalValue = updatedItems.reduce((sum, item) => sum + item.totalPrice, 0)

        return {
          ...prev,
          items: updatedItems,
          totalItems,
          totalValue,
        }
      })
    }
  }

  const handleSubmit = async (isDraft = false) => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (isDraft) {
        alert("Draf telah disimpan!")
      } else {
        alert("Borang BR-AMS 002 telah dihantar untuk kelulusan!")
      }
    } catch (error) {
      alert("Ralat berlaku. Sila cuba lagi.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">BORANG BR-AMS 002</h1>
        <p className="text-lg font-semibold">PENDAFTARAN INVENTORI</p>
        <p className="text-sm text-muted-foreground">
          No. Rujukan: BR-AMS-002-{new Date().getFullYear()}-
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

        {/* Section B: Inventory Details */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian B: Maklumat Inventori</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="inventoryType">Jenis Inventori *</Label>
                <Select
                  value={formData.inventoryType}
                  onValueChange={(value) => handleInputChange("inventoryType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alat-tulis">Alat Tulis</SelectItem>
                    <SelectItem value="bekalan-pejabat">Bekalan Pejabat</SelectItem>
                    <SelectItem value="bahan-pembersihan">Bahan Pembersihan</SelectItem>
                    <SelectItem value="makanan-minuman">Makanan & Minuman</SelectItem>
                    <SelectItem value="lain-lain">Lain-lain</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="storageLocation">Lokasi Penyimpanan *</Label>
                <Input
                  id="storageLocation"
                  value={formData.storageLocation}
                  onChange={(e) => handleInputChange("storageLocation", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="responsiblePerson">Pegawai Bertanggungjawab *</Label>
                <Input
                  id="responsiblePerson"
                  value={formData.responsiblePerson}
                  onChange={(e) => handleInputChange("responsiblePerson", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section C: Items List */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Bahagian C: Senarai Item</CardTitle>
              <CardDescription>Sila masukkan butiran setiap item inventori</CardDescription>
            </div>
            <Button type="button" onClick={addItem} size="sm">
              <PlusIcon className="h-4 w-4 mr-2" />
              Tambah Item
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Item {index + 1}</h4>
                  {formData.items.length > 1 && (
                    <Button type="button" variant="outline" size="sm" onClick={() => removeItem(item.id)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`itemName-${item.id}`}>Nama Item *</Label>
                    <Input
                      id={`itemName-${item.id}`}
                      value={item.itemName}
                      onChange={(e) => handleItemChange(item.id, "itemName", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`unit-${item.id}`}>Unit *</Label>
                    <Select value={item.unit} onValueChange={(value) => handleItemChange(item.id, "unit", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pcs">Keping (pcs)</SelectItem>
                        <SelectItem value="box">Kotak (box)</SelectItem>
                        <SelectItem value="pack">Pek (pack)</SelectItem>
                        <SelectItem value="bottle">Botol (bottle)</SelectItem>
                        <SelectItem value="kg">Kilogram (kg)</SelectItem>
                        <SelectItem value="liter">Liter (L)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor={`description-${item.id}`}>Penerangan</Label>
                  <Textarea
                    id={`description-${item.id}`}
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, "description", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`quantity-${item.id}`}>Kuantiti *</Label>
                    <Input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, "quantity", Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`unitPrice-${item.id}`}>Harga Per Unit (RM) *</Label>
                    <Input
                      id={`unitPrice-${item.id}`}
                      type="number"
                      step="0.01"
                      min="0"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, "unitPrice", Number(e.target.value))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`totalPrice-${item.id}`}>Jumlah Harga (RM)</Label>
                    <Input
                      id={`totalPrice-${item.id}`}
                      type="number"
                      step="0.01"
                      value={item.totalPrice.toFixed(2)}
                      readOnly
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Separator />

            {/* Summary */}
            <div className="bg-muted p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Jumlah Item</Label>
                  <p className="text-2xl font-bold">{formData.totalItems}</p>
                </div>
                <div>
                  <Label>Jumlah Nilai (RM)</Label>
                  <p className="text-2xl font-bold">{formData.totalValue.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section D: Remarks */}
        <Card>
          <CardHeader>
            <CardTitle>Bahagian D: Catatan</CardTitle>
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
