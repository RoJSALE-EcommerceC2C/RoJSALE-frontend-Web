
'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as Lucide from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  titleClassName?: string;
  icon?: keyof typeof Lucide;
};

export function StatCard({ title, value, titleClassName, icon }: StatCardProps) {
  const IconComponent = icon ? (Lucide[icon] as Lucide.LucideIcon) : null;
  return (
    <Card className="shadow-sm border">
      <CardContent className="p-4 flex flex-col items-center text-center">
        {IconComponent && (
            <div className="rounded-full p-3 mb-4 bg-blue-100">
                <IconComponent className="h-6 w-6 text-blue-500" />
            </div>
        )}
        <p className="text-2xl font-semibold text-center text-primary">{value}</p>
        <CardTitle className={cn("text-sm text-center text-primary", titleClassName)}>{title}</CardTitle>
      </CardContent>
    </Card>
  );
}
