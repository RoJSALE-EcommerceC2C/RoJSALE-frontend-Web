'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ChartTooltipContent, ChartConfig, ChartContainer } from '@/components/ui/chart';

const data = [
  { name: 'Source 1', revenue: 250 },
  { name: 'Source 2', revenue: 480 },
  { name: 'Source 3', revenue: 580 },
  { name: 'Source 4', revenue: 490 },
  { name: 'Source 5', revenue: 250 },
  { name: 'Source 6', revenue: 600 },
  { name: 'Source 7', revenue: 520 },
  { name: 'Source 8', revenue: 450 },
];

export function OverviewChart({ chartConfig }: { chartConfig: ChartConfig }) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[250px] [&_.recharts-cartesian-axis-tick_text]:fill-primary">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={30}>
          
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'hsl(var(--primary))' }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            domain={[0, 600]}
            tick={{ fill: 'hsl(var(--primary))' }}
          />

          <Tooltip
            cursor={false}
            content={
              <ChartTooltipContent
                formatter={(value) => `${Number(value).toLocaleString()}`}
                indicator="dot"
                labelClassName="hidden"
                className="border-none shadow-none text-primary"
              />
            }
          />

          <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />

        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
