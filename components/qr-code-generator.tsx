"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DownloadIcon, PrinterIcon, RefreshCwIcon as RefreshIcon } from "lucide-react"

interface QRCodeGeneratorProps {
  assetId: string
  assetName: string
  location: string
}

export default function QRCodeGenerator({ assetId, assetName, location }: QRCodeGeneratorProps) {
  const [size, setSize] = useState("medium")
  const [includeDetails, setIncludeDetails] = useState(true)
  const qrRef = useRef<HTMLDivElement>(null)

  // In a real implementation, we would use a QR code library like qrcode.react
  // For this demo, we'll simulate the QR code with a placeholder
  const qrCodeUrl = `data:image/svg+xml;base64,${btoa(`
  <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="white" stroke="black" strokeWidth="2"/>
    <text x="100" y="100" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial" fontSize="12">${assetId}</text>
    <rect x="20" y="20" width="160" height="160" fill="none" stroke="black" strokeWidth="1"/>
    <rect x="30" y="30" width="10" height="10" fill="black"/>
    <rect x="50" y="30" width="10" height="10" fill="black"/>
    <rect x="70" y="30" width="10" height="10" fill="black"/>
    <rect x="30" y="50" width="10" height="10" fill="black"/>
    <rect x="70" y="50" width="10" height="10" fill="black"/>
    <rect x="30" y="70" width="10" height="10" fill="black"/>
    <rect x="50" y="70" width="10" height="10" fill="black"/>
    <rect x="70" y="70" width="10" height="10" fill="black"/>
  </svg>
`)}`

  const handlePrint = () => {
    if (qrRef.current) {
      const printWindow = window.open("", "_blank")
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Print QR Code - ${assetId}</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
                .qr-container { text-align: center; border: 1px solid #ddd; padding: 15px; max-width: 300px; margin: 0 auto; }
                .qr-image { width: 200px; height: 200px; }
                .qr-details { margin-top: 10px; font-size: 14px; }
                .qr-id { font-weight: bold; font-size: 16px; }
                @media print {
                  body { margin: 0; }
                  .qr-container { border: none; }
                }
              </style>
            </head>
            <body>
              <div class="qr-container">
                <img src="${qrCodeUrl}" class="qr-image" />
                ${
                  includeDetails
                    ? `
                <div class="qr-details">
                  <div class="qr-id">${assetId}</div>
                  <div>${assetName}</div>
                  <div>${location}</div>
                </div>
                `
                    : ""
                }
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                };
              </script>
            </body>
          </html>
        `)
        printWindow.document.close()
      }
    }
  }

  const handleDownload = () => {
    // In a real implementation, we would generate and download the QR code
    // For this demo, we'll just show a toast message
    alert("QR code downloaded successfully!")
  }

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "w-24 h-24"
      case "large":
        return "w-48 h-48"
      default:
        return "w-36 h-36"
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div ref={qrRef} className="flex flex-col items-center p-4 border rounded-md bg-white">
          <img src={qrCodeUrl || "/placeholder.svg"} alt={`QR Code for ${assetId}`} className={getSizeClass()} />
          {includeDetails && (
            <div className="mt-2 text-center">
              <div className="font-bold">{assetId}</div>
              <div className="text-sm">{assetName}</div>
              <div className="text-xs text-muted-foreground">{location}</div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="outline" size="sm" onClick={handlePrint}>
            <PrinterIcon className="h-4 w-4 mr-2" />
            Cetak
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <DownloadIcon className="h-4 w-4 mr-2" />
            Muat Turun
          </Button>
          <Button variant="outline" size="sm" onClick={() => setIncludeDetails(!includeDetails)}>
            <RefreshIcon className="h-4 w-4 mr-2" />
            {includeDetails ? "Sembunyikan Butiran" : "Tunjuk Butiran"}
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-4">
          <div className="space-y-2">
            <Label htmlFor="qrSize">Saiz QR</Label>
            <Select value={size} onValueChange={setSize}>
              <SelectTrigger id="qrSize">
                <SelectValue placeholder="Pilih saiz" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Kecil</SelectItem>
                <SelectItem value="medium">Sederhana</SelectItem>
                <SelectItem value="large">Besar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 space-y-2">
            <Label htmlFor="labelCount">Bilangan Label</Label>
            <Input id="labelCount" type="number" min="1" defaultValue="1" />
            <p className="text-xs text-muted-foreground">Bilangan label yang akan dicetak</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
