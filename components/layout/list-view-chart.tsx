"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

interface ListViewChartProps {
  metrics: MetricCardProps[];
  barChartData?: ChartData[];
  pieChartData?: ChartData[];
  lineChartData?: ChartData[];
  barChartTitle?: string;
  barChartDescription?: string;
  pieChartTitle?: string;
  pieChartDescription?: string;
  lineChartTitle?: string;
  lineChartDescription?: string;
  showBarChart?: boolean;
  showPieChart?: boolean;
  showLineChart?: boolean;
  className?: string;
  isVisible?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{label}</p>
        <p className="text-sm text-muted-foreground">
          Value:{" "}
          <span className="font-medium text-foreground">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm text-muted-foreground">
          Count:{" "}
          <span className="font-medium text-foreground">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

function MetricCard({
  title,
  value,
  description,
  trend,
  icon,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center pt-1">
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4 text-green-600" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-600" />
            )}
            <span
              className={cn(
                "text-xs ml-1",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ListViewChart({
  metrics,
  barChartData = [],
  pieChartData = [],
  lineChartData = [],
  barChartTitle = "Bar Chart",
  barChartDescription = "Chart description",
  pieChartTitle = "Pie Chart",
  pieChartDescription = "Chart description",
  lineChartTitle = "Line Chart",
  lineChartDescription = "Chart description",
  showBarChart = true,
  showPieChart = true,
  showLineChart = false,
  className,
  isVisible = true,
}: ListViewChartProps) {
  return (
    <div
      className={cn(
        "transition-all duration-500 ease-in-out overflow-hidden",
        isVisible
          ? "opacity-100 max-h-[2000px] transform translate-y-0"
          : "opacity-0 max-h-0 transform -translate-y-4",
        className
      )}
      style={{
        transitionProperty: "opacity, max-height, transform",
      }}
    >
      <div className="space-y-6">
        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="transition-all duration-300 ease-in-out"
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              <MetricCard {...metric} />
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Bar Chart */}
          {showBarChart && barChartData.length > 0 && (
            <Card
              className="transition-all duration-400 ease-in-out"
              style={{ transitionDelay: isVisible ? "400ms" : "0ms" }}
            >
              <CardHeader>
                <CardTitle className="text-lg">{barChartTitle}</CardTitle>
                <CardDescription>{barChartDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-muted"
                      />
                      <XAxis
                        dataKey="name"
                        className="text-xs fill-muted-foreground"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis
                        className="text-xs fill-muted-foreground"
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="value"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pie Chart */}
          {showPieChart && pieChartData.length > 0 && (
            <Card
              className="transition-all duration-400 ease-in-out"
              style={{ transitionDelay: isVisible ? "500ms" : "0ms" }}
            >
              <CardHeader>
                <CardTitle className="text-lg">{pieChartTitle}</CardTitle>
                <CardDescription>{pieChartDescription}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color || `hsl(${index * 45}, 70%, 50%)`}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomPieTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
