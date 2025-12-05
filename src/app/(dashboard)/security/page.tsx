
'use client';
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Shield, BarChart, CircleDot } from 'lucide-react';
import { SecurityStatCard } from './security-stat-card';
import { SecurityForm } from './security-form';

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Security Settings" description="Manage platform security and access controls">
        <div className="flex items-center gap-2">
          <Button variant="outline" className="text-primary">
            <BarChart className="mr-2 h-4 w-4" />
            Security Scan
          </Button>
          <Button>
            <CircleDot className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SecurityStatCard
          icon="Users"
          title="Active Users"
          value="25,847"
          footer="Currently online"
          badge="Online"
          badgeColor="bg-blue-600 text-white"
        />
        <SecurityStatCard
          icon="Shield"
          title="Blocked Attacks"
          value="1,247"
          footer="This month"
          badge="Blocked"
          badgeColor="bg-accent text-primary hover:bg-accent"
        />
        <SecurityStatCard
          icon="CheckCircle"
          title="Security Score"
          value="94%"
          footer="Overall rating"
          badge="Excellent"
          badgeColor="bg-sky-100 text-sky-700 hover:bg-sky-100"
        />
        <SecurityStatCard
          icon="AlertTriangle"
          title="Last Incident"
          value="15 days ago"
          footer="No recent threats"
          badge="Safe"
          badgeColor="bg-blue-100 text-blue-700 hover:bg-blue-100"
        />
      </div>

      <SecurityForm />
    </div>
  );
}
