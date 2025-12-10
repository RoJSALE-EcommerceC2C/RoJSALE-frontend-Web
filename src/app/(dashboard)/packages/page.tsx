'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, Box, Users, Star } from 'lucide-react';
import { PackageStatCard } from './package-stat-card';
import { PackageCard } from './package-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// =======================================
// 📦 MOCK PACKAGE DATA (LOCAL TO THIS FILE)
// =======================================
type PackageType = {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  status: 'Active' | 'Archived';
  description: string;
  subscribers: number;
  revenue: number;
};

const MOCK_PACKAGES: PackageType[] = [
  {
    id: 'pkg_001',
    name: 'Basic Boost',
    price: 99,
    duration: '7 days',
    features: ['Featured listing', 'Priority in search', 'Basic analytics'],
    status: 'Active',
    description: 'Perfect for individual sellers wanting more visibility',
    subscribers: 342,
    revenue: 33858,
  },
  {
    id: 'pkg_002',
    name: 'Premium Plus',
    price: 199,
    duration: '15 days',
    features: ['Featured listing', 'Top of category', 'Advanced analytics', 'Priority support'],
    status: 'Active',
    description: 'Ideal for businesses and frequent sellers',
    subscribers: 156,
    revenue: 31044,
  },
  {
    id: 'pkg_003',
    name: 'Super Seller',
    price: 399,
    duration: '30 days',
    features: [
      'Homepage placement',
      'Category spotlight',
      'Premium analytics',
      'Dedicated support',
      'Social media boost',
    ],
    status: 'Active',
    description: 'Maximum exposure for serious sellers',
    subscribers: 89,
    revenue: 35511,
  },
  {
    id: 'pkg_004',
    name: 'Quick Sale',
    price: 49,
    duration: '3 days',
    features: ['Urgent badge', 'Quick contact', 'Mobile notifications'],
    status: 'Active',
    description: 'For sellers who need quick results',
    subscribers: 234,
    revenue: 11466,
  },
];

// =======================================
// 📄 PAGE COMPONENT
// =======================================

export default function PackagesPage() {
  const totalRevenue = MOCK_PACKAGES.reduce((acc, pkg) => acc + pkg.revenue, 0);
  const totalSubscribers = MOCK_PACKAGES.reduce((acc, pkg) => acc + pkg.subscribers, 0);
  const activePackages = MOCK_PACKAGES.filter((p) => p.status === 'Active').length;

  return (
    <div className="space-y-6">
      <PageHeader title="Package Management" description="Manage promotional packages and pricing plans" />

      {/* CREATE BUTTON */}
      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Package
        </Button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <PackageStatCard
          icon={DollarSign}
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          footer="This month"
          badge="+18%"
        />

        <PackageStatCard
          icon={Box}
          title="Total Packages"
          value={MOCK_PACKAGES.length.toString()}
          footer="Available packages"
          badge={`${activePackages} active`}
          badgeColor="bg-sky-500"
        />

        <PackageStatCard
          icon={Users}
          title="Total Subscribers"
          value={totalSubscribers.toLocaleString()}
          footer="Active subscriptions"
          badge="+25%"
        />

        <PackageStatCard
          icon={Star}
          title="Conversion Rate"
          value="12.3%"
          footer="Package purchases"
          badge="+3.2%"
        />
      </div>

      {/* TABS */}
      <Tabs defaultValue="all-packages" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
          <TabsTrigger value="all-packages">All Packages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* ALL PACKAGES LIST */}
        <TabsContent value="all-packages">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {MOCK_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics">
          <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Analytics coming soon.</p>
          </div>
        </TabsContent>

        {/* SETTINGS TAB */}
        <TabsContent value="settings">
          <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Settings coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
