'use client';

import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { SidebarProvider, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

function DashboardApp({ children }: { children: React.ReactNode }) {
  const { open, isMobile } = useSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <div
        className={cn(
          'flex flex-col flex-1 transition-[margin-left] duration-300 ease-in-out',
          isMobile ? 'ml-0' : (open ? 'ml-64' : 'ml-20')
        )}
      >
        <DashboardHeader />
        <main className="p-4 sm:p-6 lg:p-8 flex-1 bg-muted/30">{children}</main>
      </div>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
      <DashboardApp>{children}</DashboardApp>
    </SidebarProvider>
  );
}
