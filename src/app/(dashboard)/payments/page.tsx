
'use client';
import { PageHeader } from '@/components/page-header';
import { PaymentsTable } from './payments-table';
import { MOCK_PAYMENTS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { FileText, RefreshCw, Search, Calendar as CalendarIcon, Wallet, CreditCard, Landmark, Users, Clock, AlertCircle } from 'lucide-react';
import { PaymentStatCard } from './payment-stat-card';
import { RevenueTrendsChart } from './revenue-trends-chart';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { PaymentMethodsPerformance } from './payment-methods-performance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RupeeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m19 13-5 5-4-4-3 3" />
      <path d="M9 13h5" />
      <path d="M6 21h12" />
    </svg>
  );

export default function PaymentsPage() {
  const totalTransactions = MOCK_PAYMENTS.length;
  const pendingPayments = MOCK_PAYMENTS.filter(p => p.status === 'Pending').length;
  const failedTransactions = MOCK_PAYMENTS.filter(p => p.status === 'Failed').length;
  const monthlyRevenue = MOCK_PAYMENTS.reduce((acc, p) => p.status === 'Completed' ? acc + p.amount : acc, 0);

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

      <RevenueTrendsChart />

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
                      <SelectItem value="all" className="text-primary">All Status</SelectItem>
                      <SelectItem value="completed" className="text-primary">Completed</SelectItem>
                      <SelectItem value="pending" className="text-primary">Pending</SelectItem>
                      <SelectItem value="failed" className="text-primary">Failed</SelectItem>
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
      
      <PaymentsTable data={MOCK_PAYMENTS} />

      <PaymentMethodsPerformance />

    </div>
  );
}
