
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import * as Lucide from 'lucide-react';
import React from 'react';

type PaymentStatCardProps = {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: keyof typeof Lucide;
};

export function PaymentStatCard({ title, value, change, changeType, icon }: PaymentStatCardProps) {
  const IconComponent = Lucide[icon];

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-primary">{title}</p>
            <p className="text-2xl font-bold text-primary">{value}</p>
          </div>
          {IconComponent && <IconComponent className="h-5 w-5 text-primary" />}
        </div>
        <p className={cn(
            "text-xs mt-2",
            changeType === 'increase' ? 'text-sky-600' : 'text-blue-600'
        )}>
            {change}
        </p>
      </CardContent>
    </Card>
  );
}
