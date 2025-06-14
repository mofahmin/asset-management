"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, EditIcon, HistoryIcon, QrCodeIcon, PrinterIcon } from "lucide-react"
import QRCodeGenerator from "@/components/qr-code-generator"
import { CompactLayout } from "@/components/record/compact-layout"
import { RelatedList } from "@/components/record/related-list"
import { DetailTabs } from "@/components/record/detail-tabs"
// Mock asset data
const asset = {
    // Classification
    id: "001",
    registrationId: "MTAJ/HM/2018/001",
    classification: "Aset Alih",
    type: "Harta Modal",
    // Movable Asset Details
    name: "Kerusi Pejabat",
    description: "Kerusi pejabat untuk kegunaan staf masjid",
    notes: "Kerusi dalam keadaan baik, perlu diselenggara setiap 6 bulan.",
    image: "/assets/kerusi-pejabat.jpg",
    serialNumber: "SN123456",
    model: "Model X",
    manufacturer: "Syarikat Perabot Sdn Bhd",
    // Immovable Asset Details
    acquisitionSource: "Kerajaan Negeri",
    acquisitionCost: "Kerajaan Negeri",
    // Order details
    orderNumber: "PO123456",
    purchaseDate: "2023-01-15",
    purchasePrice: 450.0,
    warrantyPeriod: "2 tahun",
    warrantyExpiry: "2025-01-15",
    // Maintenance details
    lastMaintenanceDate: "2023-06-01",
    nextMaintenanceDue: "2024-06-01",
    category: "Perabot",
    location: "Pejabat Pentadbiran",
    acquisitionDate: "2023-01-15",
    acquisitionMethod: "Purchase",
    value: 450.0,
    status: "Aktif",
  }

// Mock asset history


export default function AssetDetailsPage({ params }: { params: { id: string } }) {

  const compactFields = [
    { label: "ID", value: asset.id },
    { label: "No. Pendaftaran", value: asset.registrationId },
    { label: "Jenis", value: asset.type },
    { label: "Kategori", value: asset.category },
    { label: "Lokasi", value: asset.location },
    { label: "Status", value: asset.status, badge: true, badgeVariant: asset.status === "Aktif" ? "default" : "secondary" },
    { label: "Nilai (RM)", value: asset.value?.toFixed(2) },
    { label: "Tarikh Perolehan", value: asset.acquisitionDate },
  ]

  const detailTabs = [
    {
      id: "details",
      label: "Maklumat",
      sections: [
        {
          id: "maklumat-aset",
          title: "Maklumat Aset",
          fields: [
            { label: "Nama", value: asset.name },
            { label: "Jenis", value: asset.type },
            { label: "Kategori", value: asset.category },
            { label: "Lokasi", value: asset.location },
            { label: "No. Siri", value: asset.serialNumber },
            { label: "Model", value: asset.model },
            { label: "Pengeluar", value: asset.manufacturer },
            { label: "Status", value: asset.status },
          ],
        },
        {
          id: "perolehan",
          title: "Maklumat Perolehan",
          fields: [
            { label: "Tarikh Perolehan", value: asset.acquisitionDate },
            { label: "Kaedah Perolehan", value: asset.acquisitionMethod },
            { label: "Sumber Perolehan", value: asset.acquisitionSource },
            { label: "Harga Perolehan (RM)", value: asset.purchasePrice?.toFixed(2) },
            { label: "No. Pesanan", value: asset.orderNumber },
            { label: "Tarikh Pembelian", value: asset.purchaseDate },
            { label: "Tempoh Waranti", value: asset.warrantyPeriod },
            { label: "Tamat Waranti", value: asset.warrantyExpiry },
          ],
        },
        {
          id: "penyelenggaraan",
          title: "Maklumat Penyelenggaraan",
          fields: [
            { label: "Tarikh Penyelenggaraan Terakhir", value: asset.lastMaintenanceDate },
            { label: "Penyelenggaraan Seterusnya", value: asset.nextMaintenanceDue },
            { label: "Catatan", value: asset.notes },
          ],
        },
        {
          id: "penerangan",
          title: "Penerangan",
          fields: [
            { label: "Penerangan", value: asset.description },
          ],
        },
      ],
    },
    {
      id: "document",
      label: "Documents",
      sections: [
        {
          id: "related-contacts",
          title: "Related Contacts",
          fields: [],
        },
        {
          id: "related-opportunities",
          title: "Related Opportunities",
          fields: [],
        },
      ],
    },
  ]

  const assetHistory = [
    {
      id: 1,
      date: "2023-01-15",
      action: "Pendaftaran",
      description: "Aset didaftarkan dalam sistem",
      user: "Ahmad Bin Abdullah",
    },
    {
      id: 2,
      date: "2023-03-10",
      action: "Pemindahan",
      description: "Aset dipindahkan dari Stor ke Pejabat Pentadbiran",
      user: "Ahmad Bin Abdullah",
    },
    {
      id: 3,
      date: "2023-05-20",
      action: "Pemeriksaan",
      description: "Pemeriksaan berkala dijalankan",
      user: "Siti Binti Hassan",
    },
  ]


  const contacts = [
    {
      id: "con-1",
      name: "Jane Smith",
      path: "/contacts/con-1",
      fields: {
        name: "Jane Smith",
        title: "CEO",
        email: "jane@acmecorp.com",
        phone: "(555) 123-4567",
      },
    },
    {
      id: "con-2",
      name: "John Doe",
      path: "/contacts/con-2",
      fields: {
        name: "John Doe",
        title: "CTO",
        email: "john@acmecorp.com",
        phone: "(555) 987-6543",
      },
    },
    {
      id: "con-3",
      name: "Alice Johnson",
      path: "/contacts/con-3",
      fields: {
        name: "Alice Johnson",
        title: "Marketing Director",
        email: "alice@acmecorp.com",
        phone: "(555) 456-7890",
      },
    },
    {
      id: "con-4",
      name: "Bob Williams",
      path: "/contacts/con-4",
      fields: {
        name: "Bob Williams",
        title: "Sales Manager",
        email: "bob@acmecorp.com",
        phone: "(555) 789-0123",
      },
    },
  ]


  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")

  // Function to get badge color based on status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Aktif":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Penyelenggaraan":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Pelupusan":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      case "Hilang":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      <CompactLayout
        title={asset.name}
        subtitle={asset.classification}
        entityName="Asset"
        fields={compactFields}
        onEdit={() => console.log("Edit asset")}
        onDelete={() => console.log("Delete asset")}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <DetailTabs tabs={detailTabs} />
              </div>

              <div className="flex flex-col gap-6">
                <RelatedList
                  title="Contacts (4)"
                  entityName="Contact"
                  items={contacts}
                  columns={[
                    { key: "name", label: "Name" },
                    { key: "title", label: "Title" },
                    { key: "email", label: "Email" },
                  ]}
                  onNew={() => console.log("New contact")}
                />

                <Card className="space-y-4">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HistoryIcon className="h-5 w-5" />
                      Sejarah
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assetHistory.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="mt-0.5">
                          <div className="rounded-full p-1 bg-blue-100 dark:bg-blue-900">
                            <HistoryIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{item.action}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(item.date).toLocaleDateString("ms-MY")}
                            </p>
                          </div>
                          <p className="text-sm">{item.description}</p>
                          <p className="text-xs text-muted-foreground">Oleh: {item.user}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              
            </div>

      {/* <div className="flex flex-col md:flex-row gap-4">

        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCodeIcon className="h-5 w-5" />
                QR Code
              </CardTitle>
              <CardDescription>Jana dan cetak QR code untuk aset ini</CardDescription>
            </CardHeader>
            <CardContent>
              <QRCodeGenerator assetId={asset.id} assetName={asset.name} location={asset.location} />
            </CardContent>
          </Card>
        </div>
      </div> */}
    </div>
  )
}
