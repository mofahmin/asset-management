"use client"

import { useLanguage } from "@/lib/language-context"
import { Button } from "@/components/ui/button"
import { GlobeIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 gap-1">
          <GlobeIcon className="h-4 w-4" />
          <span className="hidden md:inline">{language === "ms-MY" ? "Bahasa Melayu" : "English"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setLanguage("ms-MY")} className={language === "ms-MY" ? "bg-accent" : ""}>
          Bahasa Melayu
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLanguage("en-US")} className={language === "en-US" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
