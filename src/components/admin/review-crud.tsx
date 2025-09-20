"use client";

import { useState } from "react";
import { Review } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { ReviewForm } from "./review-form";
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
import { deleteReview } from "@/app/actions/review-actions";
import { Badge } from "../ui/badge";

export function ReviewCrud({ reviews }: { reviews: Review[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const handleAddNew = () => {
    setSelectedReview(null);
    setIsFormOpen(true);
  };

  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteReview(id);
    if (result.error) {
      toast.error("Verwijderen mislukt", { description: result.error });
    } else {
      toast.success("Review succesvol verwijderd.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>Beheer de reviews die op de website worden getoond.</CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Nieuwe Review
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="flex items-center justify-between p-2 rounded-md border gap-4">
              <div className="flex-grow">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{review.name}</p>
                  {review.isFeatured && <Badge variant="outline">Uitgelicht</Badge>}
                </div>
                <p className="text-sm text-muted-foreground truncate">{review.text}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(review)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
                      <AlertDialogDescription>Deze actie kan niet ongedaan worden gemaakt.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuleren</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(review.id)} className="bg-destructive hover:bg-destructive/90">
                        Verwijderen
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <ReviewForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        review={selectedReview}
      />
    </Card>
  );
}