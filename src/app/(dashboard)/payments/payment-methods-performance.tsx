
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CreditCard, Landmark } from "lucide-react";

const performanceData = [
    { name: 'UPI Payments', percentage: '45%', icon: Wallet, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
    { name: 'Card Payments', percentage: '30%', icon: CreditCard, iconBg: 'bg-primary/10', iconColor: 'text-primary' },
    { name: 'Net Banking', percentage: '25%', icon: Landmark, iconBg: 'bg-sky-100', iconColor: 'text-sky-600' },
]

export function PaymentMethodsPerformance() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base font-semibold text-primary">Payment Methods Performance</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
                {performanceData.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div key={item.name} className="flex flex-col items-center text-center">
                            <div className={`relative rounded-full p-6 ${item.iconBg} mb-3`}>
                                <Icon className={`h-8 w-8 ${item.iconColor}`} />
                                <div className="absolute -bottom-2 -right-2 bg-background p-1 rounded-full">
                                    <div className="h-5 w-5 bg-blue-600 text-white flex items-center justify-center rounded-full text-xs font-bold">
                                        ₹
                                    </div>
                                </div>
                            </div>
                            <p className="text-lg font-bold text-primary">{item.percentage}</p>
                            <p className="text-sm text-primary">{item.name}</p>
                        </div>
                    )
                })}
            </CardContent>
        </Card>
    )
}
