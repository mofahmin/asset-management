"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChurchIcon as MosqueIcon } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    // TODO: Implement actual registration
    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Pendaftaran berjaya",
        description: "Akaun anda telah didaftarkan. Sila log masuk.",
      })

      router.push("/login")
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during registration",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <MosqueIcon className="h-10 w-10 text-blue-500" />
          </div>
          <CardTitle className="text-2xl text-center">Daftar Akaun</CardTitle>
          <CardDescription className="text-center">Daftar untuk mengakses sistem pengurusan aset</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nama Pertama</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nama Akhir</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="nama@contoh.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="masjidName">Nama Masjid/Surau</Label>
              <Input id="masjidName" name="masjidName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Peranan</Label>
              <Select name="role" defaultValue="pegawai-aset">
                <SelectTrigger>
                  <SelectValue placeholder="Pilih peranan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="pegawai-aset">Pegawai Aset</SelectItem>
                  <SelectItem value="pegawai-pengawal">Pegawai Pengawal</SelectItem>
                  <SelectItem value="jawatankuasa">Jawatankuasa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Kata Laluan</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Sahkan Kata Laluan</Label>
              <Input id="confirmPassword" name="confirmPassword" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Mendaftar..." : "Daftar"}
            </Button>
            <div className="mt-4 text-center text-sm">
              Sudah mempunyai akaun?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
                Log masuk di sini
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
