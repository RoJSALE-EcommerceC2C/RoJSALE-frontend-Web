
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const citiesData = [
  { name: 'Mumbai', users: 5 },
  { name: 'Delhi', users: 4.5 },
  { name: 'Bangalore', users: 4 },
  { name: 'Chennai', users: 3 },
  { name: 'Kolkata', users: 2.5 },
  { name: 'Pune', users: 2 },
];

const cityPerformance = [
    { name: 'Mumbai', users: '9800 users', ads: 1200 },
    { name: 'Delhi', users: '7600 users', ads: 980 },
    { name: 'Bangalore', users: '7200 users', ads: 850 },
    { name: 'Chennai', users: '5800 users', ads: 720 },
    { name: 'Kolkata', users: '4200 users', ads: 620 },
    { name: 'Pune', users: '3500 users', ads: 550 },
]

export function GeographicDistribution() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">Geographic Distribution</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-sm mb-4 text-primary">Top Cities by Users</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={citiesData} layout="vertical" margin={{ left: -15 }}>
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--primary))', fontSize: 12}} width={80} />
              <Bar dataKey="users" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="font-semibold text-sm mb-4 text-primary">City Performance Metrics</h3>
          <div className="space-y-3">
              {cityPerformance.map(item => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                          <p className="font-medium text-sm text-primary">{item.name}</p>
                          <p className="text-xs text-primary">{item.users}</p>
                      </div>
                      <div className="text-right">
                          <p className="font-semibold text-sm text-primary">{item.ads}</p>
                          <p className="text-xs text-primary">ads posted</p>
                      </div>
                  </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
