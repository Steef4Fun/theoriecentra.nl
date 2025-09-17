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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, PlusCircle, Trash2, Edit } from "lucide-react";
import { Course, Location, Category } from "@/lib/types";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { CourseForm } from "./course-form";
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
import { deleteCourse } from "@/app/actions/course-actions";

export function CoursesTable({ courses, locations, categories, instructors }: { courses: Course[], locations: Location[], categories: Category[], instructors: User[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);
  const router = useRouter();

  const handleDelete = async (courseId: string) => {
    const result = await deleteCourse(courseId);
    if (result.error) {
      toast.error("Verwijderen mislukt", { description: result.error });
    } else {
      toast.success("Cursus succesvol verwijderd.");
      router.refresh();
    }
  };

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "courseDate",
      header: "Datum",
      cell: ({ row }) => format(new Date(row.getValue("courseDate")), "d MMMM yyyy", { locale: nl }),
    },
    {
      accessorKey: "category.name",
      header: "Categorie",
      cell: ({ row }) => row.original.category?.name || "N/A",
    },
    {
      accessorKey: "location.name",
      header: "Locatie",
      cell: ({ row }) => row.original.location?.name || "N/A",
    },
    {
      accessorKey: "instructor.email",
      header: "Cursusleider",
      cell: ({ row }) => row.original.instructor?.email || "N/A",
    },
    {
      accessorKey: "spotsAvailable",
      header: "Plekken",
      cell: ({ row }) => {
        const spots = row.getValue("spotsAvailable") as number;
        return <Badge variant={spots > 0 ? "default" : "destructive"}>{spots}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const course = row.original;
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
                <DropdownMenuItem onClick={() => { setSelectedCourse(course); setIsFormOpen(true); }}>
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
                  Deze actie kan niet ongedaan worden gemaakt. Dit zal de cursus permanent verwijderen.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(course.id)} className="bg-destructive hover:bg-destructive/90">
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
    data: courses,
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
          <h1 className="text-3xl font-bold tracking-tight">Cursussen</h1>
          <p className="text-muted-foreground">Beheer hier alle geplande cursussen.</p>
        </div>
        <Button onClick={() => { setSelectedCourse(null); setIsFormOpen(true); }}>
          <PlusCircle className="mr-2 h-4 w-4" /> Cursus Toevoegen
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
      <CourseForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        course={selectedCourse}
        locations={locations}
        categories={categories}
        instructors={instructors}
      />
    </div>
  );
}