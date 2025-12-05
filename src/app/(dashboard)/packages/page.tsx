
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus, DollarSign, Box, Users, Star } from 'lucide-react';
import { MOCK_PACKAGES } from '@/lib/mock-data';
import { PackageStatCard } from './package-stat-card';
import { PackageCard } from './package-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PackagesPage() {
  const totalRevenue = MOCK_PACKAGES.reduce((acc, pkg) => acc + pkg.revenue, 0);
  const totalSubscribers = MOCK_PACKAGES.reduce((acc, pkg) => acc + pkg.subscribers, 0);
  const activePackages = MOCK_PACKAGES.filter(p => p.status === 'Active').length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Package Management"
        description="Manage promotional packages and pricing plans"
      />
      <div className="flex justify-end">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Package
        </Button>
      </div>

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

      <Tabs defaultValue="all-packages" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 bg-muted">
          <TabsTrigger value="all-packages">All Packages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="all-packages">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
            {MOCK_PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="analytics">
          <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Analytics coming soon.</p>
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Settings coming soon.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
