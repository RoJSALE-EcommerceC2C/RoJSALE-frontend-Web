
import { PageHeader } from '@/components/page-header';
import { UsersTable } from './users-table';
import { Button } from '@/components/ui/button';
import { MOCK_USERS } from '@/lib/mock-data';
import { Filter, Search, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserStatCard } from './user-stat-card';

export default function UsersPage() {
  const totalUsers = MOCK_USERS.length;
  const activeUsers = MOCK_USERS.filter(u => u.status === 'Active').length;
  const pendingUsers = MOCK_USERS.filter(u => u.status === 'Pending').length;
  const suspendedUsers = MOCK_USERS.filter(u => u.status === 'Suspended').length;

  return (
    <div className="space-y-6">
      <PageHeader title="User Management" description="Manage and monitor all platform users">
        <Button className="bg-accent text-primary hover:bg-accent/90">
          <Upload className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </PageHeader>
      
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
          <Input placeholder="Search by name, email, or phone..." className="pl-10" />
        </div>
        <div className='flex gap-2 w-full sm:w-auto'>
            <Select>
                <SelectTrigger className="flex-1 sm:w-[180px] text-primary">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
            </Select>
            <Button variant="outline" className='hidden sm:flex text-primary'>
                <Filter className="mr-2 h-4 w-4" />
                More Filters
            </Button>
        </div>
      </div>

      <UsersTable data={MOCK_USERS} />

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <UserStatCard 
            icon="Users"
            iconColor="text-blue-500"
            iconBg="bg-blue-100"
            title="Total Users"
            value={totalUsers.toLocaleString()}
            footer="+12% this month"
            footerColor="text-sky-600"
        />
        <UserStatCard 
            icon="UserCheck"
            iconColor="text-primary"
            iconBg="bg-primary/10"
            title="Active Users"
            value={activeUsers.toLocaleString()}
            footer={`${Math.round((activeUsers / totalUsers) * 100)}% active`}
        />
        <UserStatCard 
            icon="UserPen"
            iconColor="text-sky-500"
            iconBg="bg-sky-100"
            title="Pending Verification"
            value={pendingUsers.toLocaleString()}
            footer="Needs review"
            footerColor="text-primary/80"
        />
        <UserStatCard 
            icon="UserX"
            iconColor="text-primary"
            iconBg="bg-primary/10"
            title="Suspended"
            value={suspendedUsers.toLocaleString()}
            footer="Action required"
            footerColor="text-primary"
            footerBg="bg-primary/10"
        />
      </div>
    </div>
  );
}
