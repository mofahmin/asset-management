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
import { useAuth } from "@/hooks/use-auth"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (res.ok && data.token) {
        localStorage.setItem("token", data.token)
        toast({
          title: "Log masuk berjaya",
          description: "Anda telah berjaya log masuk ke sistem.",
        })
        router.push("/home")
      } else {
        setError(data.message || "Login failed")
        toast({
          title: "Error",
          description: data.message || "Ralat semasa log masuk",
          variant: "destructive",
        })
      }
    } catch (err) {
      setError("Network error")
      toast({
        title: "Error",
        description: "Ralat rangkaian atau pelayan tidak tersedia.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <MosqueIcon className="h-10 w-10 text-blue-500" />
          </div>
          <CardTitle className="text-2xl text-center">Log Masuk</CardTitle>
          <CardDescription className="text-center">
            Masukkan maklumat log masuk anda untuk akses sistem.
            Letak je email and password pape skang!
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nama@contoh.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Kata Laluan</Label>
                <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Lupa Kata Laluan?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Memasuki Sistem..." : "Log Masuk"}
            </Button>
            {error && <div className="text-red-600 text-center mt-2">{error}</div>}
            <div className="mt-4 text-center text-sm">
              Belum mempunyai akaun?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Daftar di sini
              </Link>
            </div>
            <div className="text-xs text-gray-500 text-center mt-2">
              <div>Demo users:</div>
              <div>admin@masjidalfalah.com / password</div>
              <div>pegawai@surauannur.com / password</div>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
