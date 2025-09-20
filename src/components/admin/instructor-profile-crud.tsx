"use client";

import { useState } from "react";
import { InstructorProfile } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { InstructorProfileForm } from "./instructor-profile-form";
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
import { deleteInstructorProfile } from "@/app/actions/instructor-profile-actions";
import Image from "next/image";

export function InstructorProfileCrud({ profiles }: { profiles: InstructorProfile[] }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<InstructorProfile | null>(null);

  const handleAddNew = () => {
    setSelectedProfile(null);
    setIsFormOpen(true);
  };

  const handleEdit = (profile: InstructorProfile) => {
    setSelectedProfile(profile);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    const result = await deleteInstructorProfile(id);
    if (result.error) {
      toast.error("Verwijderen mislukt", { description: result.error });
    } else {
      toast.success("Profiel succesvol verwijderd.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Instructeursprofielen</CardTitle>
            <CardDescription>Beheer de instructeurs die op de homepage worden getoond.</CardDescription>
          </div>
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> Nieuw Profiel
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profiles.map(profile => (
            <div key={profile.id} className="flex items-center justify-between p-2 rounded-md border gap-4">
              <div className="flex items-center gap-4">
                <Image src={profile.imageUrl} alt={profile.name} width={40} height={40} className="rounded-full object-cover" />
                <div>
                  <p className="font-medium">{profile.name}</p>
                  <p className="text-sm text-muted-foreground">{profile.title}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(profile)}>
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
                      <AlertDialogAction onClick={() => handleDelete(profile.id)} className="bg-destructive hover:bg-destructive/90">
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
      <InstructorProfileForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        profile={selectedProfile}
      />
    </Card>
  );
}