
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type StatCardProps = {
  title: string;
  value: string;
  progress?: number;
  indicatorClassName?: string;
};

export function StatCard({ title, value, progress, indicatorClassName }: StatCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-primary mb-2">{value}</div>
        {progress !== undefined && (
          <div className="flex items-center gap-2">
             <Progress value={progress} indicatorClassName={indicatorClassName}/>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
