
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { NotificationStatCard } from './notification-stat-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RecentNotifications } from './recent-notifications';
import { MOCK_NOTIFICATIONS, MOCK_USERS } from '@/lib/mock-data';

export default function NotificationsPage() {
    const totalSent = 127893;
    const openRate = 64.2;
    const subscribers = MOCK_USERS.length;
    const templates = 12;

    return (
        <div className="space-y-6">
            <PageHeader title="Notifications Management" description="Send and manage platform notifications">
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Notification
                </Button>
            </PageHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <NotificationStatCard 
                    title="Total Sent"
                    value={totalSent.toLocaleString()}
                    footer="+12% from last month"
                    badge="This month"
                    icon="Send"
                />
                <NotificationStatCard 
                    title="Open Rate"
                    value={`${openRate}%`}
                    footer="+3.2% improvement"
                    badge="Average"
                    badgeColor="bg-sky-100 text-sky-700 hover:bg-sky-100"
                    icon="MailOpen"
                />
                <NotificationStatCard 
                    title="Subscribers"
                    value={subscribers.toLocaleString()}
                    footer="Total platform users"
                    badge="Active"
                    badgeColor="bg-blue-100 text-blue-700 hover:bg-blue-100"
                    icon="Users"
                />
                 <NotificationStatCard 
                    title="Templates"
                    value={templates.toString()}
                    footer="Active templates"
                    badge="Ready to use"
                    badgeColor="bg-sky-100 text-sky-700 hover:bg-sky-100"
                    icon="FileText"
                />
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full max-w-lg grid-cols-4 bg-muted">
                    <TabsTrigger value="all">All Notifications</TabsTrigger>
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="all">
                    <RecentNotifications notifications={MOCK_NOTIFICATIONS} />
                </TabsContent>
                <TabsContent value="templates">
                  <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
                    <p className="text-primary">Templates coming soon.</p>
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
                    <p className="text-primary">Settings coming soon.</p>
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="flex items-center justify-center h-64 border rounded-lg mt-6 bg-card">
                    <p className="text-primary">Analytics coming soon.</p>
                  </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}
