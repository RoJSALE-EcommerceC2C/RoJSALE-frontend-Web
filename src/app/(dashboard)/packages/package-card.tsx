
'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Package } from '@/lib/types';
import { Box, Clock, Edit, Trash, Eye } from 'lucide-react';

interface PackageCardProps {
  pkg: Package;
}

export function PackageCard({ pkg }: PackageCardProps) {
  return (
    <Card className="bg-card shadow-md rounded-xl overflow-hidden flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/30">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-sky-100 rounded-lg">
            <Box className="h-5 w-5 text-sky-600" />
          </div>
          <h3 className="font-semibold text-primary">{pkg.name}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary/80">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-3xl font-bold text-primary">₹{pkg.price}</p>
            <div className="flex items-center gap-1.5 text-sm text-primary">
              <Clock className="h-4 w-4" />
              <span>{pkg.duration}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-primary">{pkg.subscribers} subscribers</p>
            <p className="text-xs text-primary">
              ₹{pkg.revenue.toLocaleString()} revenue
            </p>
          </div>
        </div>

        <p className="text-sm text-primary mb-4 flex-grow">{pkg.description}</p>
        
        <div>
            <h4 className="font-semibold text-sm mb-2 text-primary">Features:</h4>
            <ul className="space-y-2 text-sm text-primary">
            {pkg.features.map((feature) => (
                <li key={feature} className="flex items-start">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>{feature}</span>
                </li>
            ))}
            </ul>
        </div>
        
        <div className="flex flex-col items-center gap-2 mt-6 pt-6 border-t">
          <Button variant="outline" className="w-full text-primary">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
          <Button className="w-full">
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
