"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Download, Filter, MoreHorizontal, RefreshCw, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { BarChart, LineChart, PieChart } from "@/components/ui/chart"
import { ResponsiveContainer } from "recharts"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const [dateRange, setDateRange] = useState("30days")
  const reportId = params.id

  // Find the report data based on the ID
  const report = getReportById(reportId)

  if (!report) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Report not found</h1>
        <p className="mb-6">The report you're looking for doesn't exist or has been removed.</p>
        <Link href="/reports">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Link href="/reports">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-[#032D60]">{report.name}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {report.folder}
              </Badge>
              <p className="text-xs text-muted-foreground">Last modified: {report.lastModified}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last quarter</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
              <SelectItem value="custom">Custom range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button className="bg-[#0070D2] hover:bg-[#005FB2]">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="chart" className="w-full">
        <TabsList className="mb-6 bg-background border">
          <TabsTrigger value="chart">Chart</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="settings">Report Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="mt-0 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-medium text-[#032D60]">{report.name}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download as PNG
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Download as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem>Print report</DropdownMenuItem>
                  <DropdownMenuItem>Add to dashboard</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  {report.type === "bar" && (
                    <BarChart
                      data={getChartData(report.type)}
                      index="category"
                      categories={["value"]}
                      colors={["#0070D2"]}
                      valueFormatter={(value) => `$${value.toLocaleString()}`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                      showGridLines
                    />
                  )}
                  {report.type === "line" && (
                    <LineChart
                      data={getChartData(report.type)}
                      index="period"
                      categories={["value"]}
                      colors={["#0070D2"]}
                      valueFormatter={(value) => `${value.toLocaleString()}`}
                      showLegend={false}
                      showXAxis
                      showYAxis
                      showGridLines
                    />
                  )}
                  {report.type === "pie" && (
                    <PieChart
                      data={getChartData(report.type)}
                      index="segment"
                      categories={["value"]}
                      colors={["#0070D2", "#1A85FF", "#44A4F2", "#76C6FF", "#A8DAFF"]}
                      valueFormatter={(value) => `$${value.toLocaleString()}`}
                      showAnimation
                    />
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-[#032D60]">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-1">Key Insights</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Total value across all categories: $245,000</li>
                    <li>Highest performing category: Software ($63,200)</li>
                    <li>15% increase compared to previous period</li>
                    <li>Services showing strongest growth at 22%</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">Recommendations</h4>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Focus marketing efforts on the Hardware category to improve performance</li>
                    <li>Investigate opportunities to expand the Training category</li>
                    <li>Continue successful strategies in the Software segment</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium text-[#032D60]">Report Data</CardTitle>
              <CardDescription>Raw data used to generate this report</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-3 border-b bg-muted/50 p-2 font-medium">
                  <div>Category</div>
                  <div>Value</div>
                  <div>% of Total</div>
                </div>
                <div className="divide-y">
                  {getTableData(report.type).map((row, i) => (
                    <div key={i} className="grid grid-cols-3 p-2">
                      <div>{row.label}</div>
                      <div>{row.value}</div>
                      <div>{row.percentage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Report settings will be displayed here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Mock data functions
function getReportById(id: string) {
  const reports = [
    {
      id: "1",
      name: "Monthly Sales Performance",
      type: "bar",
      description: "Bar chart showing monthly sales performance by product category",
      lastModified: "Today, 10:30 AM",
      folder: "Sales Reports",
    },
    {
      id: "2",
      name: "Customer Acquisition Trends",
      type: "line",
      description: "Line chart tracking new customer acquisition over the past 12 months",
      lastModified: "Yesterday, 3:15 PM",
      folder: "Marketing Analytics",
    },
    {
      id: "3",
      name: "Revenue Distribution by Region",
      type: "pie",
      description: "Pie chart showing revenue distribution across different geographical regions",
      lastModified: "Mar 15, 2023",
      folder: "Financial Reports",
    },
    {
      id: "4",
      name: "Support Ticket Analysis",
      type: "table",
      description: "Tabular report analyzing support ticket volume, resolution time, and satisfaction",
      lastModified: "Mar 12, 2023",
      folder: "Support Analytics",
    },
    {
      id: "5",
      name: "Project Completion Rates",
      type: "bar",
      description: "Bar chart comparing planned vs actual project completion rates",
      lastModified: "Mar 10, 2023",
      folder: "Project Management",
    },
    {
      id: "6",
      name: "Lead Conversion Pipeline",
      type: "line",
      description: "Line chart showing lead conversion rates through the sales pipeline",
      lastModified: "Mar 8, 2023",
      folder: "Sales Reports",
    },
  ]

  return reports.find((report) => report.id === id)
}

function getChartData(type: string) {
  if (type === "bar") {
    return [
      { category: "Hardware", value: 42500 },
      { category: "Software", value: 63200 },
      { category: "Services", value: 28700 },
      { category: "Training", value: 14300 },
      { category: "Support", value: 21800 },
    ]
  } else if (type === "line") {
    return [
      { period: "Jan", value: 120 },
      { period: "Feb", value: 150 },
      { period: "Mar", value: 180 },
      { period: "Apr", value: 220 },
      { period: "May", value: 270 },
      { period: "Jun", value: 310 },
      { period: "Jul", value: 370 },
      { period: "Aug", value: 390 },
      { period: "Sep", value: 420 },
      { period: "Oct", value: 450 },
      { period: "Nov", value: 470 },
      { period: "Dec", value: 490 },
    ]
  } else if (type === "pie") {
    return [
      { segment: "North America", value: 125000 },
      { segment: "Europe", value: 85000 },
      { segment: "Asia Pacific", value: 66000 },
      { segment: "Latin America", value: 35000 },
      { segment: "Africa", value: 18000 },
    ]
  }

  return []
}

function getTableData(type: string) {
  if (type === "bar") {
    return [
      { label: "Hardware", value: "$42,500", percentage: "24.9%" },
      { label: "Software", value: "$63,200", percentage: "37.1%" },
      { label: "Services", value: "$28,700", percentage: "16.8%" },
      { label: "Training", value: "$14,300", percentage: "8.4%" },
      { label: "Support", value: "$21,800", percentage: "12.8%" },
    ]
  } else if (type === "line") {
    return [
      { label: "Jan", value: "120", percentage: "3.2%" },
      { label: "Feb", value: "150", percentage: "4.0%" },
      { label: "Mar", value: "180", percentage: "4.8%" },
      { label: "Apr", value: "220", percentage: "5.9%" },
      { label: "May", value: "270", percentage: "7.2%" },
      { label: "Jun", value: "310", percentage: "8.3%" },
      { label: "Jul", value: "370", percentage: "9.9%" },
      { label: "Aug", value: "390", percentage: "10.4%" },
      { label: "Sep", value: "420", percentage: "11.2%" },
      { label: "Oct", value: "450", percentage: "12.0%" },
      { label: "Nov", value: "470", percentage: "12.5%" },
      { label: "Dec", value: "490", percentage: "13.1%" },
    ]
  } else if (type === "pie") {
    return [
      { label: "North America", value: "$125,000", percentage: "38.0%" },
      { label: "Europe", value: "$85,000", percentage: "25.8%" },
      { label: "Asia Pacific", value: "$66,000", percentage: "20.1%" },
      { label: "Latin America", value: "$35,000", percentage: "10.6%" },
      { label: "Africa", value: "$18,000", percentage: "5.5%" },
    ]
  }

  return []
}

