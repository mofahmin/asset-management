import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PackageIcon,
  WrenchIcon,
  AlertTriangleIcon,
  TrashIcon,
  BarChart3Icon,
  CalendarIcon,
  ClipboardCheckIcon,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight lg:hidden">Home</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
          <TabsTrigger value="reports">Laporan</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jumlah Aset</CardTitle>
                <PackageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">+4 sejak bulan lepas</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Penyelenggaraan</CardTitle>
                <WrenchIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">3 perlu perhatian segera</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Kehilangan</CardTitle>
                <AlertTriangleIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Dalam proses siasatan</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pelupusan</CardTitle>
                <TrashIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">Menunggu kelulusan</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Statistik Aset</CardTitle>
                <CardDescription>Taburan aset mengikut kategori</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-md">
                  <BarChart3Icon className="h-16 w-16 text-muted-foreground/50" />
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Aktiviti Terkini</CardTitle>
                <CardDescription>Aktiviti dalam 7 hari lepas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">{activity.icon}</div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analitik Aset</CardTitle>
              <CardDescription>Analisis terperinci mengenai aset masjid</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-md">
              <p className="text-muted-foreground">Analitik akan dipaparkan di sini</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Laporan</CardTitle>
              <CardDescription>Laporan dan dokumen berkaitan aset</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-md">
              <p className="text-muted-foreground">Laporan akan dipaparkan di sini</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const recentActivities = [
  {
    icon: <PackageIcon className="h-4 w-4" />,
    title: "Aset Baru Didaftarkan",
    description: "5 unit kerusi telah didaftarkan",
    time: "Hari ini, 10:30 AM",
  },
  {
    icon: <WrenchIcon className="h-4 w-4" />,
    title: "Penyelenggaraan Dijadualkan",
    description: "Penyelenggaraan AC dijadualkan",
    time: "Semalam, 2:15 PM",
  },
  {
    icon: <ClipboardCheckIcon className="h-4 w-4" />,
    title: "Borang BR-AMS 001 Dihantar",
    description: "Borang telah dihantar untuk kelulusan",
    time: "2 hari lepas, 9:00 AM",
  },
  {
    icon: <CalendarIcon className="h-4 w-4" />,
    title: "Pemeriksaan Tahunan",
    description: "Pemeriksaan tahunan aset telah dijadualkan",
    time: "3 hari lepas, 11:45 AM",
  },
]
