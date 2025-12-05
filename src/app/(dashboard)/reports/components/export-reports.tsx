
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, BarChart, FileText } from 'lucide-react';

const reportTypes = [
    { title: "Daily Reports", description: "User activity, ad stats", icon: Sheet, },
    { title: "Analytics Dashboard", description: "Charts and trends", icon: BarChart, },
    { title: "Custom Report", description: "Generate CSV/PDF", icon: FileText, },
]

export function ExportReports() {
    return (
        <Card className="shadow-md">
            <CardContent className="p-6">
                <h3 className="font-semibold text-base mb-4 text-primary">Export Reports</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {reportTypes.map(report => (
                        <div key={report.title} className="border rounded-lg p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer">
                            <report.icon className="h-6 w-6 text-primary" />
                            <div>
                                <p className="font-semibold text-sm text-primary">{report.title}</p>
                                <p className="text-xs text-primary">{report.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
