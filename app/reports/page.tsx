import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BarChart, FileText, Filter, PieChart, Plus, Search, LineChart, ArrowUpDown, Download } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ReportsPage() {
  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#032D60]">Reports</h1>
          <p className="text-muted-foreground">View and manage your reports</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search reports..." className="pl-8 w-full md:w-[250px]" />
          </div>
          <Button className="bg-[#0070D2] hover:bg-[#005FB2]">
            <Plus className="mr-2 h-4 w-4" />
            New Report
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4 bg-background border">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
          <TabsTrigger value="created">Created by Me</TabsTrigger>
          <TabsTrigger value="shared">Shared with Me</TabsTrigger>
        </TabsList>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Filter className="h-3 w-3" />
              <span>Type: All</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
              <Filter className="h-3 w-3" />
              <span>Date Range: All Time</span>
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Last Modified</SelectItem>
                <SelectItem value="name">Report Name</SelectItem>
                <SelectItem value="type">Report Type</SelectItem>
                <SelectItem value="created">Created Date</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportItems.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportItems.slice(0, 3).map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="created" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportItems.slice(2, 5).map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="shared" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reportItems.slice(1, 4).map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface Report {
  id: string
  name: string
  type: "bar" | "line" | "pie" | "table"
  description: string
  lastModified: string
  folder: string
}

function ReportCard({ report }: { report: Report }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4 pb-2 bg-gray-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {report.type === "bar" && <BarChart className="h-5 w-5 text-[#0070D2]" />}
            {report.type === "line" && <LineChart className="h-5 w-5 text-[#0070D2]" />}
            {report.type === "pie" && <PieChart className="h-5 w-5 text-[#0070D2]" />}
            {report.type === "table" && <FileText className="h-5 w-5 text-[#0070D2]" />}
            <CardTitle className="text-base font-medium text-[#032D60]">{report.name}</CardTitle>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Download className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs mt-1">Last modified: {report.lastModified}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-xs">
            {report.folder}
          </Badge>
          <Link href={`/reports/${report.id}`}>
            <Button variant="link" className="h-auto p-0 text-[#0070D2]">
              View Report
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

const reportItems: Report[] = [
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

