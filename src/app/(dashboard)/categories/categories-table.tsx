
'use client';

import * as React from 'react';
import * as Lucide from 'lucide-react';
import { MoreHorizontal, Edit, Trash, Plus, Folder, Dot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Category, Subcategory } from '@/lib/types';
import { Card } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from '@/components/ui/input';

const CategoryIcon = ({ iconName, className }: { iconName: string, className?: string }) => {
    const IconComponent = Lucide[iconName as keyof typeof Lucide] as Lucide.LucideIcon;
    if (!IconComponent) return <Folder className={className || "h-5 w-5 text-primary"} />;
    return <IconComponent className={className || "h-5 w-5 text-primary"} />;
};

const SubcategoryRow = ({ subcategory }: { subcategory: Subcategory }) => {
  return (
    <div className="flex items-center py-3 pl-10 pr-4 hover:bg-muted/50 rounded-md">
      <Dot className="h-5 w-5 text-primary mr-2" />
      <span className="flex-1 font-medium text-sm text-primary">{subcategory.name}</span>
      <Badge variant="outline" className="mr-4 bg-muted text-primary">{subcategory.adCount} ads</Badge>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4 text-primary" />
        </Button>
        <Button size="icon" className="h-8 w-8">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

const CategoryAccordionItem = ({ category }: { category: Category }) => {
  return (
    <AccordionItem value={category.id} className="border-b-0">
      <Card className="mb-2 shadow-sm">
        <AccordionTrigger className="p-4 hover:no-underline">
          <div className="flex items-center gap-3 flex-1">
            <CategoryIcon iconName={category.icon} className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-primary">{category.name}</span>
            <Badge variant="outline" className="bg-accent text-primary">{category.adCount} ads</Badge>
            <Badge>{category.subcategories.length} subcategories</Badge>
          </div>
          <MoreHorizontal className="h-5 w-5 text-primary" />
        </AccordionTrigger>
        <AccordionContent className="p-4 pt-0">
          <div className="space-y-2">
            {category.subcategories.map(sub => <SubcategoryRow key={sub.id} subcategory={sub} />)}
          </div>
          <div className="flex items-center gap-2 mt-4 pl-8">
            <Input placeholder="New subcategory..." className="flex-1" />
            <Button size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </AccordionContent>
      </Card>
    </AccordionItem>
  )
}


interface CategoriesTableProps {
  data: Category[];
}

export function CategoriesTable({ data }: CategoriesTableProps) {
  return (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {data.map(category => (
        <CategoryAccordionItem key={category.id} category={category} />
      ))}
    </Accordion>
  );
}
