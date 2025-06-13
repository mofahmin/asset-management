"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { PlusIcon, SaveIcon, TrashIcon, ClipboardIcon } from "lucide-react"

export default function SettingsPage() {
  const { toast } = useToast()
  const [language, setLanguage] = useState("ms-MY")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data for asset categories
  const [assetCategories, setAssetCategories] = useState([
    { id: 1, name: "Perabot", description: "Kerusi, meja, almari, dll." },
    { id: 2, name: "Peralatan Elektronik", description: "Komputer, projektor, pembesar suara, dll." },
    { id: 3, name: "Peralatan Audio", description: "Mikrofon, amplifier, speaker, dll." },
    { id: 4, name: "Bangunan", description: "Struktur bangunan utama dan tambahan" },
    { id: 5, name: "Tanah", description: "Lot tanah dan kawasan" },
  ])

  // Mock data for users
  const users = [
    { id: 1, name: "Ahmad Bin Abdullah", email: "ahmad@example.com", role: "Pegawai Aset" },
    { id: 2, name: "Siti Binti Hassan", email: "siti@example.com", role: "Pegawai Pengawal" },
    { id: 3, name: "Mohamed Bin Ismail", email: "mohamed@example.com", role: "Jawatankuasa" },
  ]

  const handleSaveGeneral = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Tetapan disimpan",
        description: "Tetapan umum telah dikemaskini.",
      })
    } catch (error) {
      toast({
        title: "Ralat",
        description: "Gagal menyimpan tetapan. Sila cuba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAddCategory = () => {
    const newId = assetCategories.length > 0 ? Math.max(...assetCategories.map((cat) => cat.id)) + 1 : 1
    setAssetCategories([...assetCategories, { id: newId, name: "Kategori Baru", description: "Penerangan kategori" }])
  }

  const handleDeleteCategory = (id: number) => {
    setAssetCategories(assetCategories.filter((cat) => cat.id !== id))
    toast({
      title: "Kategori dihapuskan",
      description: "Kategori aset telah dihapuskan.",
    })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold tracking-tight lg:hidden">Tetapan</h1>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Umum</TabsTrigger>
          <TabsTrigger value="masjid">Masjid</TabsTrigger>
          <TabsTrigger value="users">Pengguna</TabsTrigger>
          <TabsTrigger value="categories">Kategori Aset</TabsTrigger>
          <TabsTrigger value="forms">Borang</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Tetapan Umum</CardTitle>
              <CardDescription>Konfigurasi umum untuk sistem pengurusan aset</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Bahasa</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="w-[240px]">
                    <SelectValue placeholder="Pilih bahasa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ms-MY">Bahasa Melayu</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notifikasi</Label>
                  <Switch id="notifications" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Terima notifikasi untuk aktiviti penting dalam sistem</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="emailReports">Laporan Melalui Email</Label>
                  <Switch id="emailReports" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Terima laporan ringkasan mingguan melalui email</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveGeneral} disabled={isSubmitting}>
                <SaveIcon className="h-4 w-4 mr-2" />
                {isSubmitting ? "Menyimpan..." : "Simpan Tetapan"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="masjid">
          <Card>
            <CardHeader>
              <CardTitle>Maklumat Masjid</CardTitle>
              <CardDescription>Kemaskini maklumat masjid atau surau anda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="masjidName">Nama Masjid/Surau</Label>
                <Input id="masjidName" defaultValue="Masjid Al-Hidayah" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="masjidCode">Kod Masjid</Label>
                  <Input id="masjidCode" defaultValue="MSJ-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="masjidType">Jenis</Label>
                  <Select defaultValue="masjid">
                    <SelectTrigger id="masjidType">
                      <SelectValue placeholder="Pilih jenis" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="masjid">Masjid</SelectItem>
                      <SelectItem value="surau">Surau</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="masjidAddress">Alamat</Label>
                <Textarea
                  id="masjidAddress"
                  defaultValue="Jalan Contoh 1/2, Taman Contoh, 40000 Shah Alam, Selangor"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="masjidPhone">No. Telefon</Label>
                  <Input id="masjidPhone" defaultValue="03-12345678" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="masjidEmail">Email</Label>
                  <Input id="masjidEmail" type="email" defaultValue="info@masjidalhidayah.com" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <SaveIcon className="h-4 w-4 mr-2" />
                Simpan Maklumat
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Pengurusan Pengguna</CardTitle>
              <CardDescription>Urus pengguna dan peranan dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Peranan</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4">
                <Button>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tambah Pengguna
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Kategori Aset</CardTitle>
              <CardDescription>Urus kategori aset dalam sistem</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nama Kategori</TableHead>
                      <TableHead>Penerangan</TableHead>
                      <TableHead className="text-right">Tindakan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assetCategories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell>{category.description}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDeleteCategory(category.id)}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="mt-4">
                <Button onClick={handleAddCategory}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Tambah Kategori
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Konfigurasi Borang</CardTitle>
              <CardDescription>Urus aliran kerja dan tetapan borang BR-AMS</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="requireApproval">Perlukan Kelulusan untuk Semua Borang</Label>
                  <Switch id="requireApproval" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Semua borang memerlukan kelulusan sebelum difinalisasi</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="autoNumbering">Penomboran Automatik</Label>
                  <Switch id="autoNumbering" defaultChecked />
                </div>
                <p className="text-sm text-muted-foreground">Jana nombor rujukan borang secara automatik</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="approvalFlow">Aliran Kelulusan</Label>
                <Select defaultValue="sequential">
                  <SelectTrigger id="approvalFlow">
                    <SelectValue placeholder="Pilih aliran kelulusan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sequential">Berurutan (Pegawai Aset → Pegawai Pengawal)</SelectItem>
                    <SelectItem value="parallel">Selari (Kedua-dua perlu meluluskan)</SelectItem>
                    <SelectItem value="single">Tunggal (Pegawai Pengawal sahaja)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Borang Aktif</Label>
                <div className="space-y-2">
                  {[
                    "BR-AMS 001",
                    "BR-AMS 002",
                    "BR-AMS 003",
                    "BR-AMS 004",
                    "BR-AMS 005",
                    "BR-AMS 006",
                    "BR-AMS 007",
                    "BR-AMS 008",
                  ].map((form, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Label htmlFor={`form-${index}`} className="flex items-center gap-2">
                        <ClipboardIcon className="h-4 w-4" />
                        {form}
                      </Label>
                      <Switch id={`form-${index}`} defaultChecked />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <SaveIcon className="h-4 w-4 mr-2" />
                Simpan Konfigurasi
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
