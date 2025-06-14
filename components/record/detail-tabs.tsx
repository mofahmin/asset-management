"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"

interface Section {
  id: string
  title: string
  fields: Array<{
    label: string
    value: string | React.ReactNode
  }>
}

interface Tab {
  id: string
  label: string
  sections: Section[]
}

interface DetailTabsProps {
  tabs: Tab[]
}

export function DetailTabs({ tabs }: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || "")

  return (
    <Card>
      <CardContent className="p-4">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-none data-[state=active]:bg-background data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-2 px-4"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="pt-4">
              <Accordion type="multiple" className="w-full" defaultValue={tab.sections.map((section) => section.id)}>
                {tab.sections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="py-2 px-4 hover:bg-muted/50 font-medium">
                      {section.title}
                    </AccordionTrigger>
                    <AccordionContent className="px-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 p-4">
                        {section.fields.map((field, index) => (
                          <div key={index} className="space-y-1">
                            <p className="text-sm text-muted-foreground">{field.label}</p>
                            <p className="font-medium">{field.value}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

