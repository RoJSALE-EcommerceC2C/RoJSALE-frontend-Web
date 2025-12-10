"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type User = { createdAt: string };
type Product = { createdAt: string; isActive: boolean };

export function ConversionChart({
  users,
  products,
}: {
  users: User[];
  products: Product[];
}) {
  if (!users) users = [];
  if (!products) products = [];

  // -----------------------------------------
  // Group Users by Month
  // -----------------------------------------
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const usersByMonth: Record<string, number> = {};
  const productsByMonth: Record<string, number> = {};

  users.forEach((u) => {
    if (!u.createdAt) return;
    const d = new Date(u.createdAt);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    usersByMonth[key] = (usersByMonth[key] || 0) + 1;
  });

  products.forEach((p) => {
    if (!p.createdAt || !p.isActive) return; // count only active ads
    const d = new Date(p.createdAt);
    const key = `${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    productsByMonth[key] = (productsByMonth[key] || 0) + 1;
  });

  // -----------------------------------------
  // Build the chart dataset
  // -----------------------------------------
  const allMonths = Array.from(
    new Set([...Object.keys(usersByMonth), ...Object.keys(productsByMonth)])
  ).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const data = allMonths.map((month) => {
    const users = usersByMonth[month] || 0;
    const activeAds = productsByMonth[month] || 0;

    const conversion =
      users > 0 ? Number(((activeAds / users) * 100).toFixed(1)) : 0;

    return {
      name: month,
      conversion,
    };
  });

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">
          Free to Paid Conversion
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--primary))", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "hsl(var(--primary))", fontSize: 12 }}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />

            <Line
              type="monotone"
              dataKey="conversion"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
