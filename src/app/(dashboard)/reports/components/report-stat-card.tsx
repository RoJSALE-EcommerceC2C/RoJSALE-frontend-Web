
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as Lucide from "lucide-react";

type ReportStatCardProps = {
    title: string;
    value: string;
    growth: string;
    icon: keyof typeof Lucide;
}

export function ReportStatCard({ title, value, growth, icon }: ReportStatCardProps) {
    const IconComponent = Lucide[icon] as Lucide.LucideIcon;
    return (
        <Card className="p-5 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-0 flex items-start gap-4">
                <div className="bg-blue-100 text-blue-600 rounded-md p-2">
                    {IconComponent && <IconComponent className="h-6 w-6" />}
                </div>
                <div className="flex flex-col">
                    <p className="text-2xl font-bold text-primary">{value}</p>
                    <p className="text-sm text-primary">{title}</p>
                    <p className="text-xs text-sky-600 mt-1">{growth}</p>
                </div>
            </CardContent>
        </Card>
    )
}
