"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type User = {
  createdAt: string;
  location?: string;
  [key: string]: any;
};

export function UserGrowthChart({ users }: { users: User[] }) {
  if (!users) users = [];

  // ==============================
  // GROUP USERS BY MONTH
  // ==============================
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const growthMap: Record<string, number> = {};

  users.forEach((u) => {
    if (!u.createdAt) return;

    const date = new Date(u.createdAt);
    const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

    growthMap[key] = (growthMap[key] || 0) + 1;
  });

  // Convert into a sorted list for Recharts
  const data = Object.keys(growthMap)
    .sort((a, b) => {
      const da = new Date(a);
      const db = new Date(b);
      return da.getTime() - db.getTime();
    })
    .map((month) => ({
      name: month,
      users: growthMap[month],
    }));

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">
          User Growth Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>

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
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
                color: "hsl(var(--primary))",
              }}
            />

            <Area
              type="monotone"
              dataKey="users"
              stroke="hsl(var(--primary))"
              fill="url(#colorUsers)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
