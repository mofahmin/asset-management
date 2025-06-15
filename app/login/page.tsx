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
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { login } = useAuth()

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      if (email && password) {
        await login(email, password)

        toast({
          title: "Log masuk berjaya",
          description: "Anda telah berjaya log masuk ke sistem.",
        })

        // Set cookie for middleware
        document.cookie = "auth-token=demo-token; path=/"

        router.push("/home")
      } else {
        toast({
          title: "Error",
          description: "Sila masukkan email dan kata laluan",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ralat semasa log masuk",
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
          <CardTitle className="text-2xl text-center">Log Masuk</CardTitle>
          <CardDescription className="text-center">Masukkan maklumat log masuk anda untuk akses sistem.
          Letak je email and password pape skang!</CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="nama@contoh.com" required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Kata Laluan</Label>
                <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                  Lupa Kata Laluan?
                </Link>
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memasuki Sistem..." : "Log Masuk"}
            </Button>
            <div className="mt-4 text-center text-sm">
              Belum mempunyai akaun?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Daftar di sini
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
