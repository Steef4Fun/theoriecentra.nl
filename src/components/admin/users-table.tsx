"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import { Profile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { UserForm } from "./user-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteUser } from "@/app/actions/user-actions";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";

export function UsersTable({ profiles }: { profiles: Profile[] }) {
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedProfile, setSelectedProfile] = React.useState<Profile | null>(null);
  const router = useRouter();

  const handleDelete = async (userId: string) => {
    const result = await deleteUser(userId);
    if (result.error) {
      toast.error("Verwijderen mislukt", { description: result.error });
    } else {
      toast.success("Gebruiker succesvol verwijderd.");
      router.refresh();
    }
  };

  const columns: ColumnDef<Profile>[] = [
    {
      accessorKey: "user.name",
      header: "Naam",
      cell: ({ row }) => row.original.user?.name || "N/A",
    },
    {
      accessorKey: "user.email",
      header: "Email",
      cell: ({ row }) => row.original.user?.email || "N/A",
    },
    {
      accessorKey: "role",
      header: "Rol",
      cell: ({ row }) => <Badge variant="secondary" className="capitalize">{row.getValue("role")}</Badge>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const profile = row.original;
        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Acties</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => { setSelectedProfile(profile); setIsFormOpen(true); }}>
                  <Edit className="mr-2 h-4 w-4" /> Bewerken
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-50">
                    <Trash2 className="mr-2 h-4 w-4" /> Verwijderen
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
                <AlertDialogDescription>
                  Deze actie kan niet ongedaan worden gemaakt. Dit zal de gebruiker en alle gerelateerde data permanent verwijderen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(profile.id)} className="bg-destructive hover:bg-destructive/90">
                  Verwijderen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
    },
  ];

  const table = useReactTable({
    data: profiles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gebruikers</h1>
          <p className="text-muted-foreground">Beheer hier de accounts van cursusleiders en beheerders.</p>
        </div>
        <Button variant="primary" onClick={() => { setSelectedProfile(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" /> Gebruiker Toevoegen
        </Button>
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
                  Geen gebruikers gevonden.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <UserForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        profile={selectedProfile}
      />
    </div>
  );
}