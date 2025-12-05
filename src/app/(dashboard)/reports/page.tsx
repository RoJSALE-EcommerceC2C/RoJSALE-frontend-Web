
'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileDown } from 'lucide-react';
import { ReportStatCard } from './components/report-stat-card';
import { UserGrowthChart } from './components/user-growth-chart';
import { ConversionChart } from './components/conversion-chart';
import { CategoryPerformance } from './components/category-performance';
import { GeographicDistribution } from './components/geographic-distribution';
import { ExportReports } from './components/export-reports';

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
};

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics">
        <div className="flex items-center gap-2">
            <Select>
                <SelectTrigger className="w-[180px] text-primary">
                    <SelectValue placeholder="Last 30 Days" />
                </SelectTrigger>
                <SelectContent className="text-primary">
                    <SelectItem className="text-primary" value="30">Last 30 Days</SelectItem>
                    <SelectItem className="text-primary" value="60">Last 60 Days</SelectItem>
                    <SelectItem className="text-primary" value="90">Last 90 Days</SelectItem>
                </SelectContent>
            </Select>
            <Button>
                <FileDown className="mr-2 h-4 w-4" />
                Report Report
            </Button>
        </div>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ReportStatCard title="Total Users" value="25,847" growth="+10% growth" icon="Users" />
        <ReportStatCard title="Total Ads" value="8,342" growth="+8% growth" icon="FileText" />
        <ReportStatCard title="Conversion Rate" value="14.2%" growth="+1.1% improvement" icon="TrendingUp" />
        <ReportStatCard title="Active Cities" value="127" growth="+5 new cities" icon="Globe" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserGrowthChart />
        <ConversionChart />
      </div>

      <CategoryPerformance />
      <GeographicDistribution />
      <ExportReports />

    </div>
  );
}
