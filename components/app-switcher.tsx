"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BuildingIcon, PackageIcon, CheckIcon } from "lucide-react"

interface AppSwitcherProps {
  currentType?: "movable" | "immovable"
  onTypeChange?: (type: "movable" | "immovable") => void
}

export default function AppSwitcher({ currentType = "movable", onTypeChange }: AppSwitcherProps) {
  const [selectedType, setSelectedType] = useState<"movable" | "immovable">(currentType)

  const handleTypeChange = (type: "movable" | "immovable") => {
    setSelectedType(type)
    if (onTypeChange) {
      onTypeChange(type)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Jenis Aset:</span>
      <div className="flex gap-1">
        <Button
          variant={selectedType === "movable" ? "default" : "outline"}
          size="sm"
          onClick={() => handleTypeChange("movable")}
          className="flex items-center gap-2"
        >
          <PackageIcon className="h-4 w-4" />
          Aset Alih
          {selectedType === "movable" && <CheckIcon className="h-3 w-3" />}
        </Button>
        <Button
          variant={selectedType === "immovable" ? "default" : "outline"}
          size="sm"
          onClick={() => handleTypeChange("immovable")}
          className="flex items-center gap-2"
        >
          <BuildingIcon className="h-4 w-4" />
          Aset Tak Alih
          {selectedType === "immovable" && <CheckIcon className="h-3 w-3" />}
        </Button>
      </div>
    </div>
  )
}
