"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DownloadIcon, FileIcon, LoaderIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PDFExportButtonProps {
  formId: string
  formType: string
  formTitle: string
  onExport?: () => void
}

export default function PDFExportButton({ formId, formType, formTitle, onExport }: PDFExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async (format: string) => {
    setIsExporting(true)

    try {
      // In a real implementation, we would call an API to generate the PDF
      // For this demo, we'll simulate the export with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Call the onExport callback if provided
      if (onExport) {
        onExport()
      }

      // Simulate a download by creating a temporary link
      const link = document.createElement("a")
      link.href = "#"
      link.download = `${formType.replace(/\s+/g, "-")}-${formId}.${format.toLowerCase()}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("Error exporting form:", error)
      alert("Failed to export form. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={isExporting}>
          {isExporting ? (
            <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <DownloadIcon className="h-4 w-4 mr-2" />
          )}
          {isExporting ? "Mengeksport..." : "Eksport"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("PDF")}>
          <FileIcon className="h-4 w-4 mr-2 text-red-500" />
          Eksport sebagai PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("DOCX")}>
          <FileIcon className="h-4 w-4 mr-2 text-blue-500" />
          Eksport sebagai Word
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("CSV")}>
          <FileIcon className="h-4 w-4 mr-2 text-green-500" />
          Eksport sebagai CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
