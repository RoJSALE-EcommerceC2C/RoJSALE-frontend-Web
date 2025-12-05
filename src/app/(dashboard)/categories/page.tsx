
import { PageHeader } from '@/components/page-header';
import { CategoriesTable } from './categories-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PlusCircle } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/lib/mock-data';
import { StatCard } from '@/components/stat-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CategoryPerformanceCard = ({ category }: { category: (typeof MOCK_CATEGORIES)[0] }) => {
  const avgPerSub = category.subcategories.length > 0 ? Math.round(category.adCount / category.subcategories.length) : 0;
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="p-4">
        <p className="font-semibold mb-3 text-primary">{category.name}</p>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-primary">Total Ads:</span>
          <span className="text-primary">{category.adCount}</span>
        </div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-primary">Subcategories:</span>
          <span className="text-primary">{category.subcategories.length}</span>
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-primary">Avg per Sub:</span>
          <span className="text-primary">{avgPerSub}</span>
        </div>
        
      </CardContent>
    </Card>
  )
}

export default function CategoriesPage() {
  const totalCategories = MOCK_CATEGORIES.length;
  const totalSubcategories = MOCK_CATEGORIES.reduce((acc, cat) => acc + cat.subcategories.length, 0);
  const totalAds = MOCK_CATEGORIES.reduce((acc, cat) => acc + cat.adCount, 0);
  const highestCategory = MOCK_CATEGORIES.reduce((prev, current) => (prev.adCount > current.adCount) ? prev : current);

  return (
    <div className="space-y-6">
      <PageHeader title="Category Management">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Categories" value={totalCategories.toString()} />
        <StatCard title="Subcategories" value={totalSubcategories.toString()} />
        <StatCard title="Total Ads" value={totalAds.toLocaleString()} titleClassName="text-primary" />
        <StatCard title="Highest Category" value={highestCategory.adCount.toLocaleString()} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input placeholder="Category name..." className="flex-1" />
            <Button>Add Category</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Categories & Subcategories</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesTable data={MOCK_CATEGORIES} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="text-primary">Category Performance</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CATEGORIES.map(cat => (
            <CategoryPerformanceCard key={cat.id} category={cat} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
