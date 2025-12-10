'use client';

import { PageHeader } from '@/components/page-header';
import { PaymentsTable } from './payments-table';
import { Button } from '@/components/ui/button';
import {
  FileText,
  RefreshCw,
  Search,
  Calendar as CalendarIcon,
  Users,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { PaymentStatCard } from './payment-stat-card';
import { RevenueTrendsChart } from './revenue-trends-chart';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { PaymentMethodsPerformance } from './payment-methods-performance';
import { Card, CardContent } from '@/components/ui/card';

// =======================================================
// 📌 TYPE DEFINITIONS
// =======================================================

interface Payment {
  id: string;
  user: { name: string; email: string };
  package: string;
  amount: number;
  status: 'Completed' | 'Failed' | 'Pending';
  date: string;
  transactionId: { short: string; full: string };
  method: string;
}

// =======================================================
// 📌 INLINE MOCK PAYMENT DATA (BUG FIXED)
// =======================================================

const MOCK_PAYMENTS: Payment[] = [
  {
    id: 'pay_001',
    user: { name: 'Rajesh Kumar', email: 'rajesh.kumar@example.com' },
    package: '30 Days Premium',
    amount: 299,
    status: 'Completed',
    date: '2024-03-20',
    transactionId: { short: 'TXN001', full: 'UPI202403201234' },
    method: 'UPI',
  },
  {
    id: 'pay_002',
    user: { name: 'Priya Sharma', email: 'priya.sharma@example.com' },
    package: '60 Days Premium',
    amount: 499,
    status: 'Completed',
    date: '2024-03-19',
    transactionId: { short: 'TXN002', full: 'CC202403195678' },
    method: 'Credit Card',
  },
  {
    id: 'pay_003',
    user: { name: 'Amit Singh', email: 'amit.singh@example.com' },
    package: '90 Days Premium',
    amount: 699,
    status: 'Failed',
    date: '2024-03-18',
    transactionId: { short: 'TXN003', full: 'NB202403189012' },
    method: 'Net Banking',
  },
  {
    id: 'pay_004',
    user: { name: 'Sneha Patel', email: 'sneha.patel@example.com' },
    package: 'Featured Ad Boost',
    amount: 149,
    status: 'Pending',
    date: '2024-03-17',
    transactionId: { short: 'TXN004', full: 'WL202403173456' },
    method: 'Wallet',
  },
  {
    id: 'pay_005',
    user: { name: 'Vikash Gupta', email: 'vikash.gupta@example.com' },
    package: '45 Days Premium',
    amount: 399,
    status: 'Completed',
    date: '2024-03-16',
    transactionId: { short: 'TXN005', full: 'UPI202403167890' },
    method: 'UPI',
  },
];

// =======================================================
// 📄 PAGE COMPONENT
// =======================================================

export default function PaymentsPage() {
  const totalTransactions = MOCK_PAYMENTS.length;
  const pendingPayments = MOCK_PAYMENTS.filter(p => p.status === 'Pending').length;
  const failedTransactions = MOCK_PAYMENTS.filter(p => p.status === 'Failed').length;

  const monthlyRevenue = MOCK_PAYMENTS.reduce(
    (acc, p) => (p.status === 'Completed' ? acc + p.amount : acc),
    0
  );

  return (
    <div className="space-y-6">
      <PageHeader title="Payments & Finance">
        <div className="flex items-center gap-2">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Payments
          </Button>
        </div>
      </PageHeader>

      {/* STATS */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <PaymentStatCard
          title="Monthly Revenue"
          value={`₹${monthlyRevenue.toLocaleString()}`}
          change="+15% from last month"
          changeType="increase"
          icon="BarChart2"
        />
        <PaymentStatCard
          title="Total Transactions"
          value={totalTransactions.toLocaleString()}
          change="+8% from last month"
          changeType="increase"
          icon="Users"
        />
        <PaymentStatCard
          title="Pending Payments"
          value={pendingPayments.toLocaleString()}
          change="-12% from last month"
          changeType="decrease"
          icon="Clock"
        />
        <PaymentStatCard
          title="Failed Transactions"
          value={failedTransactions.toLocaleString()}
          change="-5% from last month"
          changeType="decrease"
          icon="AlertCircle"
        />
      </div>

      {/* CHART */}
      <RevenueTrendsChart />

      {/* FILTER BAR */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <Input placeholder="Search by user or transaction ID..." className="pl-10" />
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] text-primary">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal text-primary">
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  <span className="text-primary">Date Range</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 text-primary">
                <Calendar className="text-primary" mode="range" />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* TABLE */}
      <PaymentsTable data={MOCK_PAYMENTS} />

      {/* PAYMENT METHOD PERFORMANCE */}
      <PaymentMethodsPerformance />
    </div>
  );
}
