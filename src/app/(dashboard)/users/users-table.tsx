
'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Star, Info, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { User } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const getStatusBadge = (status: User['status']) => {
    switch (status) {
      case 'Active':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Active</Badge>;
      case 'Suspended':
        return <Badge className="bg-accent text-primary hover:bg-accent">Suspended</Badge>;
      case 'Pending':
        return <Badge variant="outline" className="bg-accent text-primary border-accent-foreground/10">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'User',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10 bg-blue-100 text-blue-600">
          <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
            <div className="font-medium text-primary">{row.getValue('name')}</div>
            <div className="text-xs text-primary flex items-center gap-1.5 mt-1">
                <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span>{row.original.email}</span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="hidden sm:flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{row.original.mobile}</span>
                </div>
            </div>
             <div className="text-xs text-primary flex items-center gap-1 sm:hidden mt-1">
                <Phone className="h-3 w-3" />
                <span>{row.original.mobile}</span>
            </div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => <span className="text-primary">{row.original.location}</span>,
  },
  {
      accessorKey: 'adsPosted',
      header: 'Ads Posted',
      cell: ({ row }) => <Badge variant="secondary" className="bg-sky-100 text-sky-700">{row.getValue('adsPosted')}</Badge>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.getValue('status')),
  },
  {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({row}) => (
          <div className="flex items-center gap-1 text-primary">
              <Star className="h-4 w-4 text-accent fill-accent" />
              <span>{row.getValue('rating')}</span>
          </div>
      )
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 text-primary">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View details</DropdownMenuItem>
            <DropdownMenuItem>Edit user</DropdownMenuItem>
            <DropdownMenuItem>Suspend user</DropdownMenuItem>
            <DropdownMenuItem>Delete user</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface UsersTableProps {
  data: User[];
}

export function UsersTable({ data }: UsersTableProps) {
  const isMobile = useIsMobile();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    const visibleColumns = {
        location: !isMobile,
        adsPosted: !isMobile,
        rating: !isMobile,
    }
    table.getAllColumns().forEach(col => {
        if (Object.keys(visibleColumns).includes(col.id)) {
            col.toggleVisibility(visibleColumns[col.id as keyof typeof visibleColumns])
        }
    })

  }, [isMobile, table])

  return (
    <Card className="shadow-md border rounded-xl">
        <CardHeader>
            <CardTitle className="text-base font-semibold text-primary">Users ({data.length})</CardTitle>
        </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-gray-200">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-primary font-medium text-xs uppercase tracking-wider">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b-gray-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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
