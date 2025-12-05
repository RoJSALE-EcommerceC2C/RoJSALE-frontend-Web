
import { PageHeader } from '@/components/page-header';
import { AdsTable } from './ads-table';
import { Button } from '@/components/ui/button';
import { Check, FileText, Search } from 'lucide-react';
import { MOCK_ADS } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserStatCard } from '../users/user-stat-card';


export default function AdvertisementsPage() {
  const totalAds = MOCK_ADS.length;
  const activeAds = MOCK_ADS.filter(ad => ad.status === 'Active').length;
  const pendingAds = MOCK_ADS.filter(ad => ad.status === 'Pending').length;
  const flaggedAds = MOCK_ADS.filter(ad => ad.status === 'Flagged').length;
  
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
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input placeholder="Search ads by title or user..." className="pl-10" />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Select>
            <SelectTrigger className="flex-1 sm:w-[180px] text-primary">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="text-primary">All Status</SelectItem>
              <SelectItem value="active" className="text-primary">Active</SelectItem>
              <SelectItem value="pending" className="text-primary">Pending</SelectItem>
              <SelectItem value="flagged" className="text-primary">Flagged</SelectItem>
              <SelectItem value="expired" className="text-primary">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Select>
              <SelectTrigger className="flex-1 sm:w-[180px] text-primary">
                  <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem value="all" className="text-primary">All Categories</SelectItem>
                  <SelectItem value="electronics" className="text-primary">Electronics</SelectItem>
                  <SelectItem value="vehicles" className="text-primary">Vehicles</SelectItem>
                  <SelectItem value="real-estate" className="text-primary">Real Estate</SelectItem>
                  <SelectItem value="fashion" className="text-primary">Fashion</SelectItem>
              </SelectContent>
          </Select>
        </div>
      </div>

      <AdsTable data={MOCK_ADS} />

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
            footer={`${Math.round((activeAds / totalAds) * 100)}% of total`}
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

