
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type PackageStatCardProps = {
  icon: LucideIcon;
  title: string;
  value: string;
  footer: string;
  badge: string;
  badgeColor?: string;
};

export function PackageStatCard({
  icon: Icon,
  title,
  value,
  footer,
  badge,
  badgeColor = 'bg-blue-600'
}: PackageStatCardProps) {
  return (
    <Card className="p-5 shadow-sm">
      <CardContent className="p-0 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-sky-100 text-sky-600 rounded-md">
            <Icon className="h-6 w-6" />
          </div>
          <Badge className={cn('text-white', badgeColor)}>{badge}</Badge>
        </div>
        <div>
          <p className="text-sm text-primary">{title}</p>
          <p className="text-2xl font-bold text-primary">{value}</p>
          <p className="text-xs text-primary">{footer}</p>
        </div>
      </CardContent>
    </Card>
  );
}
