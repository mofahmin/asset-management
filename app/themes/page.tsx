"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const themes = [
  {
    name: "Light",
    id: "light",
    primaryColor: "#7c3aed", // Purple
    bgColor: "#ffffff",
    textColor: "#000000",
  },
  {
    name: "Dark",
    id: "dark",
    primaryColor: "#7c3aed", // Purple
    bgColor: "#09090b",
    textColor: "#ffffff",
  },
  {
    name: "System",
    id: "system",
    primaryColor: "#7c3aed", // Purple
    bgColor: "system default",
    textColor: "system default",
  },
]

const accentColors = [
  { name: "Purple", value: "purple", color: "#7c3aed" },
  { name: "Blue", value: "blue", color: "#2563eb" },
  { name: "Green", value: "green", color: "#10b981" },
  { name: "Red", value: "red", color: "#ef4444" },
  { name: "Orange", value: "orange", color: "#f97316" },
  { name: "Pink", value: "pink", color: "#ec4899" },
]

export default function ThemesPage() {
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()
  const [selectedAccentColor, setSelectedAccentColor] = useState("purple")

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme}`,
      variant: "success",
    })
  }

  const handleAccentColorChange = (color: string) => {
    setSelectedAccentColor(color)
    // In a real app, this would update CSS variables or a theme context
    toast({
      title: "Accent color updated",
      description: `Accent color changed to ${color}`,
      variant: "success",
    })
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Theme Settings</h1>
        <Palette className="h-6 w-6 text-primary" />
      </div>

      <Tabs defaultValue="theme">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="theme">Theme Mode</TabsTrigger>
          <TabsTrigger value="colors">Accent Colors</TabsTrigger>
        </TabsList>

        <TabsContent value="theme" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme Mode</CardTitle>
              <CardDescription>Choose between light, dark, or system theme</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {themes.map((themeOption) => (
                  <div
                    key={themeOption.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      theme === themeOption.id ? "border-primary ring-2 ring-primary/20" : "hover:border-primary/50"
                    }`}
                    onClick={() => handleThemeChange(themeOption.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="font-medium">{themeOption.name}</div>
                      {theme === themeOption.id && (
                        <div className="bg-primary text-primary-foreground rounded-full p-1">
                          <Check className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    <div
                      className="h-24 rounded-md mb-2"
                      style={{
                        backgroundColor: themeOption.bgColor === "system default" ? undefined : themeOption.bgColor,
                        border: "1px solid rgba(0,0,0,0.1)",
                      }}
                    >
                      <div className="p-2">
                        <div
                          className="w-full h-3 rounded mb-1"
                          style={{
                            backgroundColor: themeOption.primaryColor,
                            opacity: 0.7,
                          }}
                        />
                        <div
                          className="w-3/4 h-2 rounded mb-1"
                          style={{
                            backgroundColor:
                              themeOption.textColor === "system default" ? undefined : themeOption.textColor,
                            opacity: 0.2,
                          }}
                        />
                        <div
                          className="w-1/2 h-2 rounded"
                          style={{
                            backgroundColor:
                              themeOption.textColor === "system default" ? undefined : themeOption.textColor,
                            opacity: 0.2,
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {themeOption.id === "system" ? "Follows your system preferences" : `${themeOption.name} mode`}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Accent Colors</CardTitle>
              <CardDescription>Choose the primary color for buttons and interactive elements</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={selectedAccentColor}
                onValueChange={handleAccentColorChange}
                className="grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                {accentColors.map((color) => (
                  <div key={color.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={color.value} id={color.value} className="sr-only" />
                    <Label
                      htmlFor={color.value}
                      className={`flex items-center space-x-2 rounded-md border p-4 w-full cursor-pointer transition-all ${
                        selectedAccentColor === color.value
                          ? "border-primary ring-2 ring-primary/20"
                          : "hover:border-primary/50"
                      }`}
                    >
                      <div className="h-5 w-5 rounded-full" style={{ backgroundColor: color.color }} />
                      <div className="flex-1">{color.name}</div>
                      {selectedAccentColor === color.value && <Check className="h-4 w-4 text-primary" />}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground">
                Note: Custom theme colors will be available in the admin management app.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

