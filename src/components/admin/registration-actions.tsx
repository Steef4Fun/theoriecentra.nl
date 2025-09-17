"use client";

import { Button } from "@/components/ui/button";
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
import { cancelRegistration } from "@/app/actions/registration-actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Course } from "@/lib/types";
import { RescheduleForm } from "./reschedule-form";

interface RegistrationActionsProps {
  registrationId: string;
  isCancelled: boolean;
  availableCourses: Course[];
}

export function RegistrationActions({ registrationId, isCancelled, availableCourses }: RegistrationActionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

  const handleCancel = async () => {
    setIsLoading(true);
    const result = await cancelRegistration(registrationId);
    if (result.error) {
      toast.error("Annuleren mislukt", { description: result.error });
    } else {
      toast.success("Aanmelding geannuleerd");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex gap-2 mt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" disabled={isCancelled || isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Annuleer Aanmelding
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
              <AlertDialogDescription>
                Hiermee wordt de aanmelding geannuleerd. Als de cursus al betaald was, wordt er een plek vrijgemaakt. Deze actie kan niet ongedaan worden gemaakt.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Terug</AlertDialogCancel>
              <AlertDialogAction onClick={handleCancel} className="bg-destructive hover:bg-destructive/90">
                Ja, annuleer
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button variant="outline" onClick={() => setIsRescheduleOpen(true)} disabled={isCancelled}>
          Verzetten
        </Button>
      </div>
      <RescheduleForm
        isOpen={isRescheduleOpen}
        setIsOpen={setIsRescheduleOpen}
        registrationId={registrationId}
        availableCourses={availableCourses}
      />
    </>
  );
}