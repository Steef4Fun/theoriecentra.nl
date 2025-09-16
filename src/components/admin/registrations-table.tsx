"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Registration } from "@/lib/types";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

export function RegistrationsTable({ registrations }: { registrations: Registration[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<Registration>[] = [
    {
      accessorKey: "created_at",
      header: "Aanmelddatum",
      cell: ({ row }) => format(new Date(row.getValue("created_at")), "d MMM yyyy HH:mm", { locale: nl }),
    },
    {
      accessorKey: "name",
      header: "Naam",
      cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`,
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "course",
      header: "Cursus",
      cell: ({ row }) => {
        const course = row.original.course;
        if (!course) return "N/A";
        return `${course.category?.name} - ${format(new Date(course.course_date), "d MMM yyyy", { locale: nl })}`;
      },
    },
    {
      accessorKey: "payment_status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("payment_status") as string;
        let variant: "default" | "secondary" | "destructive" | "outline" = "secondary";
        if (status === 'paid') variant = 'default';
        if (status === 'failed' || status === 'expired' || status === 'canceled') variant = 'destructive';
        return <Badge variant={variant} className="capitalize">{status}</Badge>;
      },
    },
  ];

  const table = useReactTable({
    data: registrations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aanmeldingen</h1>
          <p className="text-muted-foreground">Een overzicht van alle inschrijvingen.</p>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Geen resultaten.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Vorige
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Volgende
        </Button>
      </div>
    </div>
  );
}