"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
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
import { MailLog } from "@prisma/client";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function MailLogsTable({ logs }: { logs: MailLog[] }) {
  const [previewHtml, setPreviewHtml] = React.useState<string | null>(null);

  const columns: ColumnDef<MailLog>[] = [
    {
      accessorKey: "sentAt",
      header: "Verzonden op",
      cell: ({ row }) => format(new Date(row.getValue("sentAt")), "d MMM yyyy HH:mm", { locale: nl }),
    },
    {
      accessorKey: "recipient",
      header: "Ontvanger",
    },
    {
      accessorKey: "subject",
      header: "Onderwerp",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <Badge variant={status === 'sent' ? 'default' : 'destructive'} className="capitalize">{status}</Badge>;
      },
    },
    {
      id: "actions",
      header: "Acties",
      cell: ({ row }) => {
        const log = row.original;
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewHtml(log.htmlBody)}
          >
            <Eye className="mr-2 h-4 w-4" /> Bekijk
          </Button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: logs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mail Logs</h1>
          <p className="text-muted-foreground">Een overzicht van recent verzonden e-mails.</p>
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
                <TableRow key={row.id}>
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
                  Geen logs gevonden.
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
      <Dialog open={!!previewHtml} onOpenChange={(isOpen) => !isOpen && setPreviewHtml(null)}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>E-mail Voorbeeld</DialogTitle>
          </DialogHeader>
          <div className="flex-grow border rounded-md overflow-hidden">
            <iframe
              srcDoc={previewHtml || ''}
              className="w-full h-full border-0"
              title="E-mail preview"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}