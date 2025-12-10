"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { AdsTable } from "./ads-table";
import { Button } from "@/components/ui/button";
import { Check, FileText, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatCard } from "../users/user-stat-card";
import { getAllProducts } from "@/lib/adminApi";

type AdItem = {
  id: string;
  title: string;
  category: string;
  location: string;
  user: {
    name: string;
    date: string;
  };
  price: string;
  status: string;
  engagement: number;
  isPaid: boolean;
  imageUrl: string;
  startDate: string;
  flags?: number;
};

export default function AdvertisementsPage() {
  // State
  const [ads, setAds] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // active | pending | flagged
  const [categoryFilter, setCategoryFilter] = useState(""); // category ID or ""
  const [loading, setLoading] = useState(true);

  // Stats
  const [totalAds, setTotalAds] = useState(0);
  const [activeAds, setActiveAds] = useState(0);
  const [pendingAds, setPendingAds] = useState(0);
  const [flaggedAds, setFlaggedAds] = useState(0);

  // Load ads from backend
  const fetchAds = async () => {
    setLoading(true);

    const res = await getAllProducts(
      1,
      200,
      search,
      statusFilter,
      categoryFilter
    );

    if (res.success) {
      const backendAds = res.data.products.map((p: any) => ({
        id: p.id,
        title: p.name,
        category: p.category?.name ?? "Unknown",
        location: p.seller?.location ?? "Unknown",
        user: {
          name:
            p.seller?.firstName && p.seller?.lastName
              ? `${p.seller.firstName} ${p.seller.lastName}`
              : "Unknown User",
          date: p.createdAt?.split("T")[0] ?? "-",
        },
        price: p.price ? `₹${p.price}` : "N/A",
        status: p.isActive ? "Active" : "Inactive",
        engagement: p.viewCount ?? 0,
        isPaid: p.isFeatured ?? false,
        imageUrl: p.images?.[0]?.url ?? "",
        startDate: p.createdAt?.split("T")[0] ?? "-",
        flags: p.flags ?? 0,
      }));

      // Update state
      setAds(backendAds);

      // Statistics
      setTotalAds(backendAds.length);
      setActiveAds(
        backendAds.filter((a: AdItem) => a.status === "Active").length
      );

      setPendingAds(
        backendAds.filter((a: AdItem) => a.status === "Pending").length
      );

      setFlaggedAds(
        backendAds.filter((a: AdItem) => (a.flags ?? 0) > 0).length
      );
    }

    setLoading(false);
  };

  // Load on mount + refresh every 1 min
  useEffect(() => {
    fetchAds();
    const interval = setInterval(fetchAds, 60 * 1000);
    return () => clearInterval(interval);
  }, [search, statusFilter, categoryFilter]);

  return (
    <div className="space-y-6">
      <PageHeader title="Ads Management">
        <div className="flex items-center gap-2">
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Bulk Approve
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Review Reports
          </Button>
        </div>
      </PageHeader>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            placeholder="Search ads by title or user..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {/* STATUS FILTER */}
          <Select onValueChange={(v) => setStatusFilter(v === "all" ? "" : v)}>
            <SelectTrigger className="flex-1 sm:w-[180px] text-primary">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-primary">
                All Status
              </SelectItem>
              <SelectItem value="active" className="text-primary">
                Active
              </SelectItem>
              <SelectItem value="inactive" className="text-primary">
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>

          {/* CATEGORY FILTER */}
          <Select
            onValueChange={(v) => setCategoryFilter(v === "all" ? "" : v)}
          >
            <SelectTrigger className="flex-1 sm:w-[180px] text-primary">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-primary">
                All Categories
              </SelectItem>
              <SelectItem value="electronics" className="text-primary">
                Electronics
              </SelectItem>
              <SelectItem value="vehicles" className="text-primary">
                Vehicles
              </SelectItem>
              <SelectItem value="real-estate" className="text-primary">
                Real Estate
              </SelectItem>
              <SelectItem value="fashion" className="text-primary">
                Fashion
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ADS TABLE */}
      {loading ? (
        <p className="text-center py-10 text-primary">Loading ads...</p>
      ) : (
        <AdsTable data={ads} />
      )}

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <UserStatCard
          icon="List"
          iconColor="text-blue-500"
          iconBg="bg-blue-100"
          title="Total Ads"
          value={totalAds.toLocaleString()}
          footer="+15% this month"
          footerColor="text-sky-600"
        />

        <UserStatCard
          icon="CheckCircle"
          iconColor="text-sky-500"
          iconBg="bg-sky-100"
          title="Active Ads"
          value={activeAds.toLocaleString()}
          footer={`${
            totalAds > 0 ? Math.round((activeAds / totalAds) * 100) : 0
          }% of total`}
        />

        <UserStatCard
          icon="Clock"
          iconColor="text-primary"
          iconBg="bg-primary/10"
          title="Pending Approval"
          value={pendingAds.toLocaleString()}
          footer="Needs review"
          footerColor="text-primary/80"
        />

        <UserStatCard
          icon="Flag"
          iconColor="text-primary"
          iconBg="bg-primary/10"
          title="Flagged Ads"
          value={flaggedAds.toLocaleString()}
          footer="Action required"
          footerColor="text-primary"
          footerBg="bg-primary/10"
        />
      </div>
    </div>
  );
}
