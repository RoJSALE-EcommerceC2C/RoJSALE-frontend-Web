
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
        <StatCard title="New User" value="+234" progress={58} />
        <StatCard title="Total Expenses" value="71%" progress={62} indicatorClassName="bg-accent" />
        <StatCard title="Advertisements" value="$1.45M" progress={81} />
        <StatCard title="Package" value="+34" progress={62} indicatorClassName="bg-accent" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-semibold text-primary">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent>
                <OverviewChart chartConfig={chartConfig}/>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-semibold text-primary">Income</CardTitle>
            </CardHeader>
            <CardContent>
                <IncomeChart chartConfig={chartConfig} />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
