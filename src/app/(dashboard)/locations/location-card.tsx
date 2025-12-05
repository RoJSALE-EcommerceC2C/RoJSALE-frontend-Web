
'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Globe, Edit, Trash2 } from 'lucide-react';
import type { Location } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LocationCardProps {
  location: Location;
}

const StatItem = ({ value, label }: { value: string; label: string }) => (
    <div className="text-center">
      <p className="text-xl font-bold text-primary">{value}</p>
      <p className="text-xs text-primary">{label}</p>
    </div>
  );

export function LocationCard({ location }: LocationCardProps) {
  return (
    <Card className="bg-card shadow-md rounded-xl overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Globe className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-primary">{location.name}</h3>
          <Badge className={cn('text-xs', location.status === 'Active' ? 'bg-blue-600 text-white' : 'bg-muted text-primary')}>
            {location.status}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-accent">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="grid grid-cols-3 gap-4 mb-6">
            <StatItem value={location.cities.toLocaleString()} label="Cities" />
            <StatItem value={location.adCount.toLocaleString()} label="Ads" />
            <StatItem value={location.users.toLocaleString()} label="Users" />
        </div>
        
        <div>
            <h4 className="font-semibold text-sm mb-2 text-primary">Popular Cities:</h4>
            <div className="flex flex-wrap gap-2">
                {location.popularCities.map((city) => (
                    <Badge key={city} variant="outline" className="bg-sky-100 text-sky-700 border-sky-200">
                        {city}
                    </Badge>
                ))}
            </div>
        </div>
        
        <div className="flex items-center gap-2 mt-6 pt-6 border-t">
          <Button variant="outline" className="w-full text-primary">
            View Details
          </Button>
          <Button className="w-full">
            Manage Cities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
