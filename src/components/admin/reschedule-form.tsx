"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClientCourse } from "@/lib/types";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "sonner";
import { rescheduleRegistration } from "@/app/actions/registration-actions";
import { Loader2 } from "lucide-react";

interface RescheduleFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  registrationId: string;
  availableCourses: ClientCourse[];
}

export function RescheduleForm({ isOpen, setIsOpen, registrationId, availableCourses }: RescheduleFormProps) {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedCourseId) {
      toast.error("Selecteer een nieuwe cursusdatum.");
      return;
    }
    setIsLoading(true);
    const result = await rescheduleRegistration(registrationId, selectedCourseId);
    if (result.error) {
      toast.error("Verzetten mislukt", { description: result.error });
    } else {
      toast.success("Aanmelding succesvol verzet!");
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aanmelding Verzetten</DialogTitle>
          <DialogDescription>
            Kies een nieuwe cursusdatum voor deze aanmelding. De leerling wordt hier niet automatisch van op de hoogte gesteld.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select onValueChange={setSelectedCourseId}>
            <SelectTrigger>
              <SelectValue placeholder="Selecteer een nieuwe cursus..." />
            </SelectTrigger>
            <SelectContent>
              {availableCourses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {format(new Date(course.courseDate), "d MMMM yyyy", { locale: nl })} ({course.spotsAvailable} plekken)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Annuleren</Button>
          <Button onClick={handleSubmit} disabled={isLoading || !selectedCourseId}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Verzetten
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}