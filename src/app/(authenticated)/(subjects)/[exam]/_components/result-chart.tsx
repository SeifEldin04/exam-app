"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  TooltipProps,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface ResultChartProps {
  correct?: number;
  incorrect?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  size?: "sm" | "md" | "lg";
  colorScheme?: "default" | "vibrant" | "pastel";
}

export function ResultChart({
  correct = 20,
  incorrect = 25,
  showLegend = true,
  showTooltip = true,
  size = "md",
  colorScheme = "default",
}: ResultChartProps) {
  const data = [
    {
      name: "Correct",
      value: correct,
      percentage: Math.round((correct / (correct + incorrect)) * 100),
    },
    {
      name: "Incorrect",
      value: incorrect,
      percentage: Math.round((incorrect / (correct + incorrect)) * 100),
    },
  ];

  const colorSchemes = {
    default: ["#10b981", "#ef4444"], // emerald-500, red-500
    vibrant: ["#06d6a0", "#f72585"], // bright green, bright pink
    pastel: ["#a7f3d0", "#fecaca"], // emerald-200, red-200
  };

  const colors = colorSchemes[colorScheme];

  const sizeConfig = {
    sm: { width: 150, height: 150, innerRadius: 40, outerRadius: 60 },
    md: { width: 200, height: 200, innerRadius: 50, outerRadius: 80 },
    lg: { width: 300, height: 300, innerRadius: 70, outerRadius: 120 },
  };

  const config = sizeConfig[size];

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-gray-600">
            {data.value} questions ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  type LabelProps = {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  };

  const renderCustomLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: LabelProps) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="font-semibold text-sm"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="w-fit">
      {/* <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-center">Quiz Results</CardTitle>
            </CardHeader> */}
      <CardContent className="px-4 py-28">
        <div style={{ width: config.width, height: config.height }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={config.outerRadius}
                innerRadius={config.innerRadius}
                fill="#8884d8"
                dataKey="value"
                strokeWidth={2}
                stroke="#ffffff"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && (
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  formatter={(value, entry) => (
                    <span
                      style={{ color: entry.color }}
                      className="font-medium"
                    >
                      {value}: {entry.payload?.value}
                    </span>
                  )}
                />
              )}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
