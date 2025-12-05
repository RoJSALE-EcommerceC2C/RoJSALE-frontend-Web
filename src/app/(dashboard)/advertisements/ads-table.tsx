
'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal, Eye } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import type { Ad } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const getStatusBadge = (status: Ad['status']) => {
    switch (status) {
      case 'Active':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Active</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-accent text-primary border-accent-foreground/10">Pending</Badge>;
      case 'Expired':
        return <Badge variant="outline" className="bg-sky-100 text-sky-700 border-sky-200">Expired</Badge>;
      case 'Flagged':
        return <Badge className="bg-primary text-primary-foreground">Flagged</Badge>;
    }
  };

export const columns: ColumnDef<Ad>[] = [
  {
    accessorKey: 'title',
    header: 'Ad Details',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Image
          src={row.original.imageUrl}
          alt={row.original.title}
          width={40}
          height={40}
          className="rounded-md object-cover bg-muted"
          data-ai-hint="product marketing"
        />
        <div>
          <span className="font-medium text-primary">{row.getValue('title')}</span>
          <div className="text-xs text-primary flex items-center gap-1.5">
            <span>{row.original.category}</span>
            <span className='hidden sm:inline'>•</span>
            <span className='hidden sm:inline'>{row.original.location}</span>
            {row.original.isPaid && <Badge className="bg-sky-100 text-sky-800 border-sky-200 text-xs px-1.5 py-0.5">Paid</Badge>}
          </div>
           <div className="text-xs text-primary flex items-center gap-1.5 sm:hidden">
            <span>{row.original.location}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => (
        <div>
            <div className="font-medium text-primary">{row.original.user.name}</div>
            <div className="text-xs text-primary">{row.original.user.date}</div>
        </div>
    )
  },
  {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <span className="text-primary">{row.original.price}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
        <div className="flex items-center gap-2">
            {getStatusBadge(row.getValue('status'))}
            {row.original.status === 'Flagged' && row.original.flags && (
                <Badge className="bg-primary text-primary-foreground text-xs px-1.5 py-0.5 whitespace-nowrap">{row.original.flags} flags</Badge>
            )}
        </div>
    )
  },
  {
    accessorKey: 'engagement',
    header: 'Engagement',
    cell: ({ row }) => (
        <div className="flex items-center gap-1 text-primary">
            <Eye className="h-4 w-4" />
            <span>{row.getValue('engagement')}</span>
        </div>
    )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-primary">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View Ad</DropdownMenuItem>
          <DropdownMenuItem>Edit Ad</DropdownMenuItem>
          <DropdownMenuItem>Approve</DropdownMenuItem>
          <DropdownMenuItem>Decline</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

interface AdsTableProps {
  data: Ad[];
}

export function AdsTable({ data }: AdsTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const isMobile = useIsMobile();
  
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters },
  });

  React.useEffect(() => {
    const visibleColumns = {
        user: !isMobile,
        price: !isMobile,
        engagement: !isMobile,
    }
    table.getAllColumns().forEach(col => {
        if (Object.keys(visibleColumns).includes(col.id)) {
            col.toggleVisibility(visibleColumns[col.id as keyof typeof visibleColumns])
        }
    })

  }, [isMobile, table])

  return (
    <Card className="shadow-md rounded-xl">
        <CardHeader>
            <CardTitle className="text-base font-semibold text-primary">Ads ({data.length})</CardTitle>
        </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-gray-200">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-primary font-medium text-xs uppercase tracking-wider">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b-gray-200">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3 text-primary">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
