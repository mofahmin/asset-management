import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon as MosqueIcon } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            {/* <MosqueIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Sistem Pengurusan Aset</span> */}
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log Masuk</Button>
            </Link>
            <Link href="/register">
              <Button variant="link">Daftar</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Sistem Pengurusan Aset
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Pengurusan aset yang efisien.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg">Mula Sekarang</Button>
                  </Link>
                  <Link href="#features">
                    <Button size="lg" variant="outline">
                      Ketahui Lebih Lanjut
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] lg:h-[500px] lg:w-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full opacity-70 blur-3xl" />
                  <div className="absolute inset-5 bg-white dark:bg-gray-950 rounded-full flex items-center justify-center">
                    <MosqueIcon className="h-24 w-24 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ciri-ciri Utama</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Sistem pengurusan aset yang komprehensif.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col items-center space-y-2 rounded-lg border p-4">
                  <div className="rounded-full border p-2">{feature.icon}</div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-gray-500 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
            &copy; {new Date().getFullYear()} Sistem Pengurusan Aset. Hak cipta terpelihara.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Terma
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 underline-offset-4 hover:underline">
              Privasi
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Inventori Masa Nyata",
    description: "Pantau status dan lokasi aset secara langsung dengan kemas kini masa nyata.",
    icon: <MosqueIcon className="h-6 w-6" />,
  },
  {
    title: "Pemberitahuan Pintar",
    description: "Terima pemberitahuan automatik untuk penyelenggaraan dan tarikh luput aset.",
    icon: <MosqueIcon className="h-6 w-6" />,
  },
  {
    title: "Integrasi Kod QR",
    description: "Imbas kod QR untuk akses pantas kepada maklumat aset dan sejarah penyelenggaraan.",
    icon: <MosqueIcon className="h-6 w-6" />,
  },
  {
    title: "Pengurusan Pengguna",
    description: "Urus peranan dan kebenaran pengguna dengan mudah untuk keselamatan maksimum.",
    icon: <MosqueIcon className="h-6 w-6" />,
  },
  {
    title: "Analitik Visual",
    description: "Lihat data aset dalam bentuk carta dan graf untuk analisis yang lebih mendalam.",
    icon: <MosqueIcon className="h-6 w-6" />,
  },
  {
    title: "Sokongan Mudah Alih",
    description: "Akses sistem melalui peranti mudah alih untuk pengurusan di mana-mana.",
    icon: <MosqueIcon className="h-6 w-6" />,
  },
]
