"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

interface Stage {
  id: string
  name: string
  completed: boolean
  guidance: string
}

interface RecordPathProps {
  stages: Stage[]
  currentStage: string
  onStageComplete: (stageId: string) => void
  onStageSelect: (stageId: string) => void
}

export function RecordPath({ stages, currentStage, onStageComplete, onStageSelect }: RecordPathProps) {
  const currentStageIndex = stages.findIndex((stage) => stage.id === currentStage)
  const currentGuidance = stages[currentStageIndex]?.guidance || ""

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative flex w-full sm:w-auto flex-grow mb-4 sm:mb-0 rounded-md overflow-hidden">
            {stages.map((stage, index) => {
              const isCompleted = index < currentStageIndex
              const isCurrent = index === currentStageIndex
              const isLast = index === stages.length - 1

              return (
                <div
                  key={stage.id}
                  className={cn(
                    "flex-1 relative",
                    !isLast &&
                      "after:content-[''] after:absolute after:top-0 after:right-0 after:border-8 after:border-transparent after:z-10",
                    isCompleted && !isLast && "after:border-l-green-500",
                    isCurrent && !isLast && "after:border-l-blue-700",
                    !isCompleted && !isCurrent && !isLast && "after:border-l-gray-200",
                  )}
                >
                  <button
                    onClick={() => onStageSelect(stage.id)}
                    className={cn(
                      "w-full h-10 px-4 flex items-center justify-center text-sm font-medium transition-colors",
                      isCompleted && "bg-green-500 text-white",
                      isCurrent && "bg-blue-700 text-white",
                      !isCompleted && !isCurrent && "bg-gray-200 text-gray-600",
                      !isLast && "clip-path-chevron",
                      index === 0 && "rounded-l-md",
                      isLast && "rounded-r-md",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      {isCompleted && <Check className="w-4 h-4" />}
                      {stage.name}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
          <div className="flex-shrink-0">
            <Button
              variant="default"
              size="sm"
              className="bg-blue-700 hover:bg-blue-800 whitespace-nowrap"
              onClick={() => onStageComplete(currentStage)}
            >
              <Check className="w-4 h-4 mr-2" />
              Mark Stage as Complete
            </Button>
          </div>
        </div>

        <Accordion type="single" collapsible defaultValue="guidance">
          <AccordionItem value="guidance">
            <AccordionTrigger>Guidance for Success</AccordionTrigger>
            <AccordionContent>{currentGuidance}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}

