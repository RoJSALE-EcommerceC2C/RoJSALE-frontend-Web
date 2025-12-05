
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as Lucide from 'lucide-react';
import type { Notification } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const NotificationItem = ({ notification }: { notification: Notification }) => {
    const IconComponent = Lucide[notification.icon as keyof typeof Lucide] as Lucide.LucideIcon;

    const getBadgeClass = (type: string) => {
        switch(type) {
            case 'announcement': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
            case 'reminder': return 'bg-sky-100 text-sky-700';
            case 'system': return 'bg-accent text-primary';
            case 'report': return 'bg-muted text-primary';
            default: return 'bg-muted';
        }
    }

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex items-start gap-4">
                {IconComponent && <IconComponent className="h-5 w-5 mt-1 text-primary" />}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-primary">{notification.title}</h4>
                        <Badge variant="outline" className={cn("text-xs capitalize", getBadgeClass(notification.type))}>
                            {notification.type}
                        </Badge>
                    </div>
                    <p className="text-sm text-primary mb-2">{notification.description}</p>
                    <div className="flex items-center gap-4 text-xs text-primary">
                        <span>{notification.recipients} recipients</span>
                        {notification.openRate && <span>{notification.openRate}% open rate</span>}
                        <span>{notification.status}</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Lucide.Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                        <Lucide.Send className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}


export function RecentNotifications({ notifications }: { notifications: Notification[] }) {
    return (
        <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold text-primary">Recent Notifications</CardTitle>
                <Button variant="link" className="text-primary">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {notifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                ))}
            </CardContent>
        </Card>
    )
}
