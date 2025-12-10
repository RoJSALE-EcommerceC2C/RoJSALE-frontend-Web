"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

type User = {
  location?: string;
};

type Product = {
  location?: string;
};

export function GeographicDistribution({
  users,
  products,
}: {
  users: User[];
  products: Product[];
}) {
  if (!users) users = [];
  if (!products) products = [];

  // ===================================================
  // GROUP USERS BY CITY
  // ===================================================
  const userCityMap: Record<string, number> = {};

  users.forEach((u) => {
    const loc = u.location?.split(",")[0]?.trim(); // Extract City only
    if (!loc) return;

    userCityMap[loc] = (userCityMap[loc] || 0) + 1;
  });

  // Convert to array and sort (top 6)
  const userCities = Object.keys(userCityMap)
    .map((city) => ({
      name: city,
      users: userCityMap[city],
    }))
    .sort((a, b) => b.users - a.users)
    .slice(0, 6);

  // ===================================================
  // GROUP PRODUCTS BY CITY
  // ===================================================
  const adCityMap: Record<string, number> = {};

  products.forEach((p) => {
    const loc = p.location?.split(",")[0]?.trim();
    if (!loc) return;

    adCityMap[loc] = (adCityMap[loc] || 0) + 1;
  });

  // Convert to performance metrics list
  const cityPerformance = Object.keys(adCityMap)
    .map((city) => ({
      name: city,
      users: `${userCityMap[city] || 0} users`,
      ads: adCityMap[city],
    }))
    .sort((a, b) => b.ads - a.ads)
    .slice(0, 6);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">
          Geographic Distribution
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* -------------------- TOP CITIES CHART -------------------- */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-primary">
            Top Cities by Users
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userCities} layout="vertical" margin={{ left: 15 }}>
              <XAxis type="number" hide />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={80}
                tick={{ fill: "hsl(var(--primary))", fontSize: 12 }}
              />
              <Bar
                dataKey="users"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* -------------------- CITY PERFORMANCE LIST -------------------- */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-primary">
            City Performance Metrics
          </h3>

          <div className="space-y-3">
            {cityPerformance.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div>
                  <p className="font-medium text-sm text-primary">{item.name}</p>
                  <p className="text-xs text-primary">{item.users}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-sm text-primary">{item.ads}</p>
                  <p className="text-xs text-primary">ads posted</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
