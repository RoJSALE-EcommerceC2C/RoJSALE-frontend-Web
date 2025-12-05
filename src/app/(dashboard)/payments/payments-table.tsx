
'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Eye, Pencil, X, Wallet, CreditCard, Landmark } from 'lucide-react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Payment } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const getStatusBadge = (status: Payment['status']) => {
  switch (status) {
    case 'Completed':
      return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Completed</Badge>;
    case 'Pending':
        return <Badge variant="outline" className="bg-accent text-primary border-accent-foreground/10">Pending</Badge>;
    case 'Failed':
      return <Badge className="bg-primary text-primary-foreground">Failed</Badge>;
  }
};

const getMethodIcon = (method: Payment['method']) => {
    switch (method) {
        case 'UPI':
            return <Wallet className="h-4 w-4 text-primary" />;
        case 'Credit Card':
            return <CreditCard className="h-4 w-4 text-primary" />;
        case 'Net Banking':
            return <Landmark className="h-4 w-4 text-primary" />;
        case 'Wallet':
            return <Wallet className="h-4 w-4 text-primary" />;
    }
}


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'transactionId',
    header: 'Transaction ID',
    cell: ({ row }) => (
        <div>
            <div className="font-medium text-primary">{row.original.transactionId.short}</div>
            <div className="text-xs text-primary hidden sm:block">{row.original.transactionId.full}</div>
        </div>
    )
  },
  {
    accessorKey: 'user.name',
    header: 'User',
    cell: ({ row }) => <span className="font-medium text-primary">{row.original.user.name}</span>,
  },
  {
    accessorKey: 'package',
    header: 'Package',
    cell: ({ row }) => <span className="text-primary">{row.original.package}</span>
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <span className="text-primary">{`₹${row.original.amount.toFixed(2)}`}</span>,
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => (
        <div className="flex items-center gap-2">
            {getMethodIcon(row.original.method)}
            <span className="hidden md:inline text-primary">{row.original.method}</span>
        </div>
    )
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => getStatusBadge(row.original.status),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => <span className="text-primary">{new Date(row.original.date).toISOString().split('T')[0]}</span>,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
        </Button>
        {row.original.status === 'Pending' && (
            <>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                </Button>
                <Button size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                </Button>
            </>
        )}
      </div>
    ),
  },
];

interface PaymentsTableProps {
  data: Payment[];
}

export function PaymentsTable({ data }: PaymentsTableProps) {
  const isMobile = useIsMobile();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  React.useEffect(() => {
    const visibleColumns = {
        package: !isMobile,
        amount: !isMobile,
        date: !isMobile,
    }
    table.getAllColumns().forEach(col => {
        if (Object.keys(visibleColumns).includes(col.id)) {
            col.toggleVisibility(visibleColumns[col.id as keyof typeof visibleColumns])
        }
    })

  }, [isMobile, table])

  return (
    <Card className="shadow-sm">
       <CardHeader>
        <CardTitle className="text-base font-semibold text-primary">Recent Transactions ({data.length})</CardTitle>
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
                <TableCell colSpan={columns.length} className="h-24 text-center text-primary">
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
