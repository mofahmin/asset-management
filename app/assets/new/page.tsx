"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeftIcon, FileTextIcon, PackageIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import BRMS001Form from "@/components/forms/br-ams-001"
import BRMS002Form from "@/components/forms/br-ams-002"

type FormType = "selection" | "br-ams-001" | "br-ams-002"

export default function NewAssetPage() {
  const router = useRouter()
  const [currentForm, setCurrentForm] = useState<FormType>("selection")

  const handleFormSelection = (formType: "br-ams-001" | "br-ams-002") => {
    setCurrentForm(formType)
  }

  const handleBack = () => {
    if (currentForm === "selection") {
      router.back()
    } else {
      setCurrentForm("selection")
    }
  }

  if (currentForm === "br-ams-001") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Pendaftaran Harta Modal</h1>
        </div>
        <BRMS001Form />
      </div>
    )
  }

  if (currentForm === "br-ams-002") {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Pendaftaran Inventori</h1>
        </div>
        <BRMS002Form />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Pendaftaran Aset Baharu</h1>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-xl font-semibold">Pilih Jenis Borang Pendaftaran</h2>
          <p className="text-muted-foreground">
            Sila pilih borang yang sesuai berdasarkan jenis aset yang ingin didaftarkan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BR-AMS 001 - Harta Modal */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleFormSelection("br-ams-001")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileTextIcon className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg">BR-AMS 001</CardTitle>
              <CardDescription className="text-base font-medium">Pendaftaran Harta Modal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Untuk aset bernilai tinggi seperti:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Perabot (meja, kerusi, almari)</li>
                  <li>Peralatan elektronik (komputer, printer)</li>
                  <li>Kenderaan</li>
                  <li>Mesin dan peralatan</li>
                  <li>Aset bernilai RM 1,000 ke atas</li>
                </ul>
              </div>
              <Button className="w-full">Pilih Borang Ini</Button>
            </CardContent>
          </Card>

          {/* BR-AMS 002 - Inventori */}
          <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleFormSelection("br-ams-002")}
          >
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <PackageIcon className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">BR-AMS 002</CardTitle>
              <CardDescription className="text-base font-medium">Pendaftaran Inventori</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Untuk bekalan dan inventori seperti:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Alat tulis dan bekalan pejabat</li>
                  <li>Bahan pembersihan</li>
                  <li>Makanan dan minuman</li>
                  <li>Bekalan am dan consumables</li>
                  <li>Item bernilai rendah (kurang RM 1,000)</li>
                </ul>
              </div>
              <Button className="w-full">Pilih Borang Ini</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">Panduan Pemilihan Borang:</h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p>
              • <strong>BR-AMS 001</strong> - Untuk aset yang mempunyai nilai tinggi, tahan lama, dan memerlukan
              penyelenggaraan berkala
            </p>
            <p>
              • <strong>BR-AMS 002</strong> - Untuk bekalan dan inventori yang digunakan secara berterusan dan perlu
              dipantau stoknya
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
