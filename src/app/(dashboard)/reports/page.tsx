"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileDown } from "lucide-react";
import { ReportStatCard } from "./components/report-stat-card";
import { UserGrowthChart } from "./components/user-growth-chart";
import { ConversionChart } from "./components/conversion-chart";
import { CategoryPerformance } from "./components/category-performance";
import { GeographicDistribution } from "./components/geographic-distribution";
import { ExportReports } from "./components/export-reports";

// API functions
import {
  getAllUsersForReports,
  getAllProductsForReports,
  getCategoriesForReports,
  getDashboardStatsForReports,
} from "@/lib/adminApi";

export default function ReportsPage() {
  // ==============================
  // STATE
  // ==============================
  const [loading, setLoading] = useState(true);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalAds, setTotalAds] = useState(0);
  const [conversionRate, setConversionRate] = useState("0%");
  const [activeCities, setActiveCities] = useState(0);

  const [usersData, setUsersData] = useState<any[]>([]);
  const [productsData, setProductsData] = useState<any[]>([]);
  const [categoriesData, setCategoriesData] = useState<any[]>([]);

  // ==============================
  // FETCH REPORT DATA
  // ==============================
  const fetchReportData = async () => {
    setLoading(true);

    // ---- USERS ----
    const usersRes = await getAllUsersForReports();
    const users = usersRes?.data?.users || [];
    setUsersData(users);
    setTotalUsers(users.length);

    // Unique city count
    const citySet = new Set(users.map((u: any) => u.location));
    setActiveCities(citySet.size);

    // ---- PRODUCTS ----
    const productsRes = await getAllProductsForReports();
    const products = productsRes?.data?.products || [];
    setProductsData(products);
    setTotalAds(products.length);

    // ---- CATEGORIES ----
    const catRes = await getCategoriesForReports();
    const cats = catRes?.data?.categories || [];
    setCategoriesData(cats);

    // ---- CONVERSION RATE ----
    // If you define conversion as: (active ads / total users)
    const activeAds = products.filter((p: any) => p.isActive).length;
    const conv =
      totalUsers > 0 ? ((activeAds / users.length) * 100).toFixed(1) + "%" : "0%";
    setConversionRate(conv);

    setLoading(false);
  };

  // Load data + refresh every 60 seconds
  useEffect(() => {
    fetchReportData();
    const interval = setInterval(fetchReportData, 60_000);
    return () => clearInterval(interval);
  }, []);

  // ==============================
  // UI RENDER
  // ==============================

  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics">
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-[180px] text-primary">
              <SelectValue placeholder="Last 30 Days" />
            </SelectTrigger>
            <SelectContent className="text-primary">
              <SelectItem value="30">Last 30 Days</SelectItem>
              <SelectItem value="60">Last 60 Days</SelectItem>
              <SelectItem value="90">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>

          <Button>
            <FileDown className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </PageHeader>

      {loading ? (
        <p className="text-center text-primary py-10">Loading report data...</p>
      ) : (
        <>
          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ReportStatCard
              title="Total Users"
              value={totalUsers.toLocaleString()}
              growth="+10% growth"
              icon="Users"
            />

            <ReportStatCard
              title="Total Ads"
              value={totalAds.toLocaleString()}
              growth="+8% growth"
              icon="FileText"
            />

            <ReportStatCard
              title="Conversion Rate"
              value={conversionRate}
              growth="+1.1% improvement"
              icon="TrendingUp"
            />

            <ReportStatCard
              title="Active Cities"
              value={activeCities.toString()}
              growth="+5 new cities"
              icon="Globe"
            />
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UserGrowthChart users={usersData} />
            <ConversionChart users={usersData} products={productsData} />
          </div>

          <CategoryPerformance categories={categoriesData} products={productsData} />

          <GeographicDistribution users={usersData} products={productsData} />

        </>
      )}
    </div>
  );
}
