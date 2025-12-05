
'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', conversion: 120 },
  { name: 'Feb', conversion: 180 },
  { name: 'Mar', conversion: 200 },
  { name: 'Apr', conversion: 220 },
  { name: 'May', conversion: 250 },
  { name: 'Jun', conversion: 320 },
];

export function ConversionChart() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">Free to Paid Conversion</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{fill: 'hsl(var(--primary))', fontSize: 12}}/>
            <YAxis tickLine={false} axisLine={false} domain={[0, 320]} tick={{fill: 'hsl(var(--primary))', fontSize: 12}}/>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                border: '1px solid hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Line type="monotone" dataKey="conversion" stroke="hsl(var(--accent))" strokeWidth={2} dot={{r: 4}} activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey={() => 0} stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
