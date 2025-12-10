"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type Category = {
  id: string;
  name: string;
};

type Product = {
  categoryId: string;
  price?: number;
};

export function CategoryPerformance({
  categories,
  products,
}: {
  categories: Category[];
  products: Product[];
}) {
  if (!categories) categories = [];
  if (!products) products = [];

  // ===================================================
  // COUNT PRODUCTS PER CATEGORY
  // ===================================================
  const adsByCategory = categories.map((cat) => {
    const count = products.filter((p) => p.categoryId === cat.id).length;

    return {
      name: cat.name,
      ads: count,
    };
  });

  // Sort by ads descending (top performing categories)
  const sortedAds = adsByCategory.sort((a, b) => b.ads - a.ads);

  // ===================================================
  // REVENUE PER CATEGORY (Estimated)
  // Since backend does not provide revenue yet, we compute placeholder revenue:
  // sum of product prices or an estimated formula (count * avg-price fallback)
  // ===================================================

  const revenueList = categories.map((cat, index) => {
    const catProducts = products.filter((p) => p.categoryId === cat.id);

    // If price exists, sum it, otherwise fallback formula
    const revenue =
      catProducts.length > 0
        ? catProducts.reduce((sum, p) => sum + (p.price || 0), 0)
        : catProducts.length * 1000; // fallback estimated revenue

    return {
      name: cat.name,
      revenue: `₹${revenue.toLocaleString()}`,
      ads: catProducts.length,
      color: `hsl(var(--chart-${(index % 5) + 1}))`,
    };
  });

  const sortedRevenue = revenueList.sort((a, b) => b.ads - a.ads);

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">
          Category Performance
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* ---------------------- ADS BY CATEGORY ---------------------- */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-primary">
            Ads by Category
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sortedAds} layout="vertical">
              <XAxis
                type="number"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--primary))", fontSize: 12 }}
              />
              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "hsl(var(--primary))", fontSize: 12 }}
                width={90}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Bar
                dataKey="ads"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ---------------------- REVENUE LIST ---------------------- */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-primary">
            Revenue by Category
          </h3>

          <div className="space-y-3">
            {sortedRevenue.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <p className="font-medium text-sm text-primary">{item.name}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-sm text-primary">
                    {item.revenue}
                  </p>
                  <p className="text-xs text-primary">{item.ads} ads</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
