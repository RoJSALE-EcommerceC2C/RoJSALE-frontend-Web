"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { UsersTable } from "./users-table";
import { Button } from "@/components/ui/button";
import { Filter, Search, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserStatCard } from "./user-stat-card";
import { getAllUsers } from "@/lib/adminApi";
type BackendUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  location?: string;
  createdAt?: string;
  _count?: {
    products?: number;
  };
};
export default function UsersPage() {
  // UI State
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); // "active" | "pending" | "suspended"
  const [loading, setLoading] = useState(true);

  // Counts
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [pendingUsers, setPendingUsers] = useState(0);
  const [suspendedUsers, setSuspendedUsers] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);

    const res = await getAllUsers(1, 200, search, status); // load first 200 users

    if (res.success) {
      const backendUsers = res.data.users.map((u: any) => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        mobile: u.phone,
        status:
          u.status === "active"
            ? "Active"
            : u.status === "pending"
            ? "Pending"
            : u.status === "suspended"
            ? "Suspended"
            : "Active",
        registered: u.createdAt?.split("T")[0] ?? "-",
        avatar: "",
        location: u.location ?? "Unknown",
        adsPosted: u._count?.products ?? 0,
        rating: 0,
      }));

      // Update table
      setUsers(backendUsers);

      // Update counts
      setActiveUsers(
        backendUsers.filter((u: any) => u.status === "Active").length
      );
      setPendingUsers(
        backendUsers.filter((u: any) => u.status === "Pending").length
      );
      setSuspendedUsers(
        backendUsers.filter((u: any) => u.status === "Suspended").length
      );
    }

    setLoading(false);
  };

  // Load on mount + refresh every 1 minute
  useEffect(() => {
    fetchUsers();

    const interval = setInterval(() => {
      fetchUsers();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [search, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="Manage and monitor all platform users"
      >
        <Button className="bg-accent text-primary hover:bg-accent/90">
          <Upload className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </PageHeader>

      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input
            placeholder="Search by name, email, or phone..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          {/* STATUS FILTER */}
          <Select onValueChange={(v) => setStatus(v === "all" ? "" : v)}>
            <SelectTrigger className="flex-1 sm:w-[180px] text-primary">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="hidden sm:flex text-primary">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>

      {/* USERS TABLE */}
      {loading ? (
        <p className="text-center py-10 text-primary">Loading users…</p>
      ) : (
        <UsersTable data={users} />
      )}

      {/* STAT CARDS */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <UserStatCard
          icon="Users"
          iconColor="text-blue-500"
          iconBg="bg-blue-100"
          title="Total Users"
          value={totalUsers.toLocaleString()}
          footer="+12% this month"
          footerColor="text-sky-600"
        />

        <UserStatCard
          icon="UserCheck"
          iconColor="text-primary"
          iconBg="bg-primary/10"
          title="Active Users"
          value={activeUsers.toLocaleString()}
          footer={`${
            totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0
          }% active`}
        />

        <UserStatCard
          icon="UserPen"
          iconColor="text-sky-500"
          iconBg="bg-sky-100"
          title="Pending Verification"
          value={pendingUsers.toLocaleString()}
          footer="Needs review"
          footerColor="text-primary/80"
        />

        <UserStatCard
          icon="UserX"
          iconColor="text-primary"
          iconBg="bg-primary/10"
          title="Suspended"
          value={suspendedUsers.toLocaleString()}
          footer="Action required"
          footerColor="text-primary"
          footerBg="bg-primary/10"
        />
      </div>
    </div>
  );
}
