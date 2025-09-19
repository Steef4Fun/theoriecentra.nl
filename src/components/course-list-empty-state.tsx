"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchX } from "lucide-react";

interface CourseListEmptyStateProps {
  resetFilters: () => void;
}

export function CourseListEmptyState({ resetFilters }: CourseListEmptyStateProps) {
  return (
    <Card className="text-center p-12 bg-muted/30 border-dashed">
      <CardContent className="flex flex-col items-center">
        <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold">Geen Cursussen Gevonden</h3>
        <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
          Helaas, er zijn geen cursussen die aan je criteria voldoen. Probeer je zoekopdracht aan te passen of reset de filters.
        </p>
        <Button onClick={resetFilters} className="mt-6">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  );
}