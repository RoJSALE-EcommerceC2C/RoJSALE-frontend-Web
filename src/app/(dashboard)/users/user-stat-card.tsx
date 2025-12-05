
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import * as Lucide from 'lucide-react';

type UserStatCardProps = {
    icon: keyof typeof Lucide;
    iconColor: string;
    iconBg: string;
    title: string;
    value: string;
    footer: string;
    footerColor?: string;
    footerBg?: string;
}

export function UserStatCard({ icon, iconColor, iconBg, title, value, footer, footerColor, footerBg}: UserStatCardProps) {
    const IconComponent = Lucide[icon] as Lucide.LucideIcon;

    return (
        <Card className="p-5 shadow-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-0 flex flex-col items-center text-center">
                <div className={cn("rounded-full p-3 mb-4", iconBg)}>
                    {IconComponent && <IconComponent className={cn("h-6 w-6", iconColor)} />}
                </div>
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground text-primary">{title}</p>
                <div className={cn("text-xs font-medium mt-2 px-2 py-0.5 rounded-full text-primary", footerBg)}>
                    {footer}
                </div>
            </CardContent>
        </Card>
    )
}
