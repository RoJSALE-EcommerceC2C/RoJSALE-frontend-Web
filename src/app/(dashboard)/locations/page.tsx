
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Filter, Plus, Search } from 'lucide-react';
import { MOCK_LOCATIONS } from '@/lib/mock-data';
import { LocationStatCard } from './location-stat-card';
import { LocationCard } from './location-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

export default function LocationsPage() {
  const totalStates = MOCK_LOCATIONS.length;
  const totalCities = MOCK_LOCATIONS.reduce((acc, loc) => acc + loc.cities, 0);
  const totalAds = MOCK_LOCATIONS.reduce((acc, loc) => acc + loc.adCount, 0);
  const topState = MOCK_LOCATIONS.reduce((prev, current) => (prev.adCount > current.adCount) ? prev : current);

  return (
    <div className="space-y-6">
      <PageHeader title="Location Management" description="Manage states, cities, and geographical coverage">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </PageHeader>
      
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

      <Tabs defaultValue="states" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-4 bg-muted">
          <TabsTrigger value="states">States</TabsTrigger>
          <TabsTrigger value="top-cities">Top Cities</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
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
                <p className="text-primary">Settings view coming soon.</p>
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
