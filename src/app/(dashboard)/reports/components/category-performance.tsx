
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const adsData = [
  { name: 'Electronics', ads: 1250 },
  { name: 'Vehicles', ads: 890 },
  { name: 'Real Estate', ads: 650 },
  { name: 'Fashion', ads: 420 },
  { name: 'Furniture', ads: 380 },
];

const revenueData = [
    { name: 'Electronics', revenue: '₹95,000', ads: 1250, color: 'hsl(var(--chart-1))' },
    { name: 'Vehicles', revenue: '₹1,20,000', ads: 890, color: 'hsl(var(--chart-2))' },
    { name: 'Real Estate', revenue: '₹90,000', ads: 650, color: 'hsl(var(--chart-3))' },
    { name: 'Fashion', revenue: '₹45,000', ads: 420, color: 'hsl(var(--chart-4))' },
    { name: 'Furniture', revenue: '₹30,000', ads: 380, color: 'hsl(var(--chart-5))' },
];

export function CategoryPerformance() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">Category Performance</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-sm mb-4 text-primary">Ads by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={adsData} layout="vertical">
              <XAxis type="number" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--primary))', fontSize: 12}} />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--primary))', fontSize: 12}} width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
              />
              <Bar dataKey="ads" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-4 text-primary">Revenue by Category</h3>
          <div className="space-y-3">
              {revenueData.map(item => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                          <p className="font-medium text-sm text-primary">{item.name}</p>
                      </div>
                      <div className="text-right">
                          <p className="font-semibold text-sm text-primary">{item.revenue}</p>
                          <p className="text-xs text-primary">{item.ads} ads</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
