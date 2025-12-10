'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Filter, Plus, Search } from 'lucide-react';
import { LocationStatCard } from './location-stat-card';
import { LocationCard } from './location-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

// ===============================
// 📌 INLINE MOCK LOCATION DATA
// ===============================

const MOCK_LOCATIONS: Array<{ id: string; name: string; status: 'Active' | 'Inactive'; adCount: number; cities: number; users: number; popularCities: string[]; growth: number }> = [
  {
    id: 'loc_001',
    name: 'Maharashtra',
    status: 'Active',
    adCount: 2847,
    cities: 156,
    users: 8923,
    popularCities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    growth: 12,
  },
  {
    id: 'loc_002',
    name: 'Karnataka',
    status: 'Active',
    adCount: 1923,
    cities: 89,
    users: 6547,
    popularCities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
    growth: 8,
  },
  {
    id: 'loc_003',
    name: 'Tamil Nadu',
    status: 'Active',
    adCount: 1765,
    cities: 127,
    users: 5894,
    popularCities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    growth: 5,
  },
  {
    id: 'loc_004',
    name: 'Gujarat',
    status: 'Active',
    adCount: 1456,
    cities: 73,
    users: 4723,
    popularCities: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    growth: 9,
  },
  {
    id: 'loc_005',
    name: 'Rajasthan',
    status: 'Active',
    adCount: 1234,
    cities: 64,
    users: 3892,
    popularCities: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
    growth: 7,
  },
  {
    id: 'loc_006',
    name: 'Uttar Pradesh',
    status: 'Active',
    adCount: 1127,
    cities: 118,
    users: 4156,
    popularCities: ['Lucknow', 'Kanpur', 'Agra', 'Varanasi'],
    growth: 6,
  },
];

// ===============================
// 📄 PAGE COMPONENT
// ===============================

export default function LocationsPage() {
  const totalStates = MOCK_LOCATIONS.length;
  const totalCities = MOCK_LOCATIONS.reduce((acc, loc) => acc + loc.cities, 0);
  const totalAds = MOCK_LOCATIONS.reduce((acc, loc) => acc + loc.adCount, 0);
  const topState = MOCK_LOCATIONS.reduce((prev, current) =>
    prev.adCount > current.adCount ? prev : current
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Location Management" description="Manage states, cities, and geographical coverage">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </PageHeader>

      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <LocationStatCard
          title="Total States"
          value={totalStates.toString()}
          footer="Active coverage"
          badge="+2"
          icon="Globe"
        />
        <LocationStatCard
          title="Total Cities"
          value={totalCities.toLocaleString()}
          footer="Cities covered"
          badge="+23"
          icon="MapPin"
        />
        <LocationStatCard
          title="Active Ads"
          value={totalAds.toLocaleString()}
          footer="Across all locations"
          badge="+8%"
          icon="BarChart2"
        />
        <LocationStatCard
          title="Top State"
          value={topState.name}
          footer="By ad volume"
          badge="Top performer"
          badgeColor="bg-sky-100 text-sky-700"
          icon="TrendingUp"
        />
      </div>

      {/* TABS */}
      <Tabs defaultValue="states" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted">
          <TabsTrigger value="states">States</TabsTrigger>
          <TabsTrigger value="top-cities">Top Cities</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* STATES TAB */}
        <TabsContent value="states">
          <div className="mt-6 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
              <Input placeholder="Search states..." className="pl-10" />
            </div>
            <Button variant="outline" className="text-primary">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {MOCK_LOCATIONS.map((loc) => (
              <LocationCard key={loc.id} location={loc} />
            ))}
          </div>
        </TabsContent>

        {/* FUTURE TABS */}
        <TabsContent value="top-cities">
          <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Top Cities view coming soon.</p>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
            <p className="text-primary">Activity view coming soon.</p>
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
