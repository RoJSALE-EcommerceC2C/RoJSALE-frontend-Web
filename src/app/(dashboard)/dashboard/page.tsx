
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { PageHeader } from '@/components/page-header';
import { StatCard } from './stat-card';
import { OverviewChart } from './overview-chart';
import { IncomeChart } from './income-chart';
import { type ChartConfig } from '@/components/ui/chart';

const chartConfig = {
  revenue: {
    label: 'Revenue',
  },
  'Package Sales': {
    label: 'Package Sales',
    color: 'hsl(var(--chart-2))',
  },
  'Ad Revenue': {
    label: 'Ad Revenue',
    color: 'hsl(var(--chart-1))',
  },
  Sponsorships: {
    label: 'Sponsorships',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="DASHBOARD" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Users" value="0" />
        <StatCard title="Total Buyers" value="0" />
        <StatCard title="Total Advertisement" value="0" />
        <StatCard title="Active Packages" value="34" progress={75} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-semibold text-primary">Traffic Sources</CardTitle>
                <CardDescription className="text-primary">An overview of your website traffic.</CardDescription>
            </CardHeader>
            <CardContent>
                <OverviewChart chartConfig={chartConfig}/>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-semibold text-primary">Income</CardTitle>
                <CardDescription className="text-primary">A breakdown of your income sources.</CardDescription>
            </CardHeader>
            <CardContent>
                <IncomeChart chartConfig={chartConfig} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
