"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { CategoriesTable } from "./categories-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllCategories, createCategory } from "@/lib/adminApi";
import { toast } from "sonner";
import type { Category as CategoryTypeFromLib } from "@/lib/types";


type Category = {
  id: string;
  name: string;
  description?: string;
  adCount?: number;
  children?: Category[];
};

export default function CategoriesPage() {
 const [categories, setCategories] = useState<CategoryTypeFromLib[]>([]);
  const [loading, setLoading] = useState(true);

  const [newCategory, setNewCategory] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await getAllCategories(1, 200);

    if (res.success) {
      const cats = res.data.categories.map((c: any) => ({
        id: c.id,
        name: c.name,
        icon: c.icon ?? "Folder", // backend has icon field
        adCount: c._count?.products ?? 0,
        subcategories: (c.children || []).map((child: any) => ({
          id: child.id,
          name: child.name,
        })),
      }));

      setCategories(cats);
    }

    setLoading(false);
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    setAdding(true);

    const res = await createCategory({
      name: newCategory,
      description: "",
      isActive: true,
      sortOrder: 1,
      parentId: null,
      metadata: null,
    });

    if (res.success) {
      toast.success("Category created successfully!");
      setNewCategory("");
      fetchCategories();
    } else {
      toast.error(res.message || "Failed to create category");
    }

    setAdding(false);
  };

  // Auto refresh every minute
  useEffect(() => {
    fetchCategories();
    const interval = setInterval(fetchCategories, 60000);
    return () => clearInterval(interval);
  }, []);

  // Derived stats
  const totalCategories = categories.length;
  const totalSubcategories = categories.reduce(
    (acc, cat) => acc + (cat.subcategories?.length || 0),
    0
  );
  const totalAds = categories.reduce((acc, cat) => acc + (cat.adCount || 0), 0);
  const highestCategory =
    categories.reduce(
      (prev, current) =>
        (prev.adCount || 0) > (current.adCount || 0) ? prev : current,
      categories[0]
    ) || {};

  const CategoryPerformanceCard = ({ category }: { category: Category }) => {
    const avgPerSub =
      (category.children?.length || 0) > 0
        ? Math.round((category.adCount || 0) / category.children!.length)
        : 0;

    return (
      <Card className="rounded-lg shadow-sm">
        <CardContent className="p-4">
          <p className="font-semibold mb-3 text-primary">{category.name}</p>

          <div className="flex justify-between text-sm mb-1">
            <span className="text-primary">Total Ads:</span>
            <span className="text-primary">{category.adCount || 0}</span>
          </div>

          <div className="flex justify-between text-sm mb-1">
            <span className="text-primary">Subcategories:</span>
            <span className="text-primary">
              {category.children?.length || 0}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-primary">Avg per Sub:</span>
            <span className="text-primary">{avgPerSub}</span>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Category Management">
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </PageHeader>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Categories" value={String(totalCategories)} />
        <StatCard title="Subcategories" value={String(totalSubcategories)} />
        <StatCard title="Total Ads" value={totalAds.toLocaleString()} />
        <StatCard
          title="Highest Category"
          value={(highestCategory.adCount || 0).toLocaleString()}
        />
      </div>

      {/* Add new category */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Add New Category</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Category name..."
              className="flex-1"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button disabled={adding} onClick={handleAddCategory}>
              {adding ? "Adding..." : "Add Category"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">
            Categories & Subcategories
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-primary text-center py-6">
              Loading categories...
            </p>
          ) : (
            <CategoriesTable data={categories} />
          )}
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Category Performance</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryPerformanceCard key={cat.id} category={cat} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
