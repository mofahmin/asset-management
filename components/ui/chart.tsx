"use client"
import {
  Bar,
  BarChart as RechartsBarChart,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { cn } from "@/lib/utils"

interface ChartProps {
  data: any[]
  index: string
  categories: string[]
  colors?: string[]
  valueFormatter?: (value: number) => string
  showLegend?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showGridLines?: boolean
  showAnimation?: boolean
  className?: string
}

export function BarChart({
  data,
  index,
  categories,
  colors = ["#0070D2", "#1A85FF", "#44A4F2"],
  valueFormatter = (value: number) => value.toString(),
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  showAnimation = true,
  className,
}: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis />}
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {payload[0].payload[index]}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {valueFormatter(payload[0].value as number)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        {showLegend && (
          <Legend
            verticalAlign="top"
            height={40}
            content={({ payload }) => {
              if (payload && payload.length) {
                return (
                  <div className="flex justify-center gap-4">
                    {payload.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }
              return null
            }}
          />
        )}
        {categories.map((category, i) => (
          <Bar
            key={category}
            dataKey={category}
            fill={colors[i % colors.length]}
            radius={[4, 4, 0, 0]}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsBarChart>
    </div>
  )
}

export function LineChart({
  data,
  index,
  categories,
  colors = ["#0070D2", "#1A85FF", "#44A4F2"],
  valueFormatter = (value: number) => value.toString(),
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  showGridLines = true,
  showAnimation = true,
  className,
}: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
        {showXAxis && <XAxis dataKey={index} />}
        {showYAxis && <YAxis />}
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        {payload[0].payload[index]}
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {valueFormatter(payload[0].value as number)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        {showLegend && (
          <Legend
            verticalAlign="top"
            height={40}
            content={({ payload }) => {
              if (payload && payload.length) {
                return (
                  <div className="flex justify-center gap-4">
                    {payload.map((entry, index) => (
                      <div key={`item-${index}`} className="flex items-center gap-1">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-xs text-muted-foreground">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )
              }
              return null
            }}
          />
        )}
        {categories.map((category, i) => (
          <Line
            key={category}
            type="monotone"
            dataKey={category}
            stroke={colors[i % colors.length]}
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsLineChart>
    </div>
  )
}

export function PieChart({
  data,
  index,
  categories,
  colors = ["#0070D2", "#1A85FF", "#44A4F2", "#76C6FF", "#A8DAFF"],
  valueFormatter = (value: number) => value.toString(),
  showAnimation = true,
  className,
}: ChartProps) {
  return (
    <div className={cn("w-full h-full", className)}>
      <RechartsPieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col">
                    <span className="text-[0.70rem] uppercase text-muted-foreground">{payload[0].name}</span>
                    <span className="font-bold text-muted-foreground">
                      {valueFormatter(payload[0].value as number)}
                    </span>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Legend
          verticalAlign="bottom"
          height={40}
          content={({ payload }) => {
            if (payload && payload.length) {
              return (
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  {payload.map((entry, index) => (
                    <div key={`item-${index}`} className="flex items-center gap-1">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span className="text-xs text-muted-foreground">{entry.value}</span>
                    </div>
                  ))}
                </div>
              )
            }
            return null
          }}
        />
        <Pie
          data={data}
          dataKey={categories[0]}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          isAnimationActive={showAnimation}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </div>
  )
}

