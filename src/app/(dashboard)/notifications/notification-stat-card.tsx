
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as Lucide from "lucide-react";
import { cn } from "@/lib/utils";

type NotificationStatCardProps = {
    title: string;
    value: string;
    footer: string;
    badge: string;
    badgeColor?: string;
    icon: keyof typeof Lucide;
}

export function NotificationStatCard({ title, value, footer, badge, badgeColor, icon }: NotificationStatCardProps) {
    const IconComponent = Lucide[icon] as Lucide.LucideIcon;
    return (
        <Card className="shadow-sm">
            <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-blue-100 rounded-md">
                        {IconComponent && <IconComponent className="h-5 w-5 text-blue-600" />}
                    </div>
                    <Badge className={cn("text-xs", badgeColor || 'bg-blue-600 text-white')}>{badge}</Badge>
                </div>
                <div>
                    <p className="text-xs text-primary">{title}</p>
                    <p className="text-2xl font-bold text-primary">{value}</p>
                    <p className="text-xs text-primary mt-1">{footer}</p>
                </div>
            </CardContent>
        </Card>
    )
}
