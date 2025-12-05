
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', users: 1200 },
  { name: 'Feb', users: 1500 },
  { name: 'Mar', users: 1800 },
  { name: 'Apr', users: 1900 },
  { name: 'May', users: 2100 },
  { name: 'Jun', users: 2400 },
];

export function UserGrowthChart() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">User Growth Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--primary))', fontSize: 12}}/>
            <YAxis tickLine={false} axisLine={false} domain={[0, 2400]} tick={{fill: 'hsl(var(--primary))', fontSize: 12}} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
                color: 'hsl(var(--primary))'
              }}
            />
            <Area type="monotone" dataKey="users" stroke="hsl(var(--primary))" fill="url(#colorUsers)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
