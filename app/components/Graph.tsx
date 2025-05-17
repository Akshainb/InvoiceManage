"use client";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

// const d = [
//   {
//     date: "Nov 15",
//     amount: 500,
//   },
//   {
//     date: "Nov 16",
//     amount: 600,
//   },
// ];

export function Graph({ data }: { data: { date: string; amount: number }[] }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px]">
      <ResponsiveContainer width="100%" height={"100%"}>
        <LineChart data={data}>
          <XAxis dataKey={"date"} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="black"
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
