"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash2, Edit, X, Check } from "lucide-react";
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
import { updateSetting, deleteSetting } from "@/app/actions/settings-actions";

interface Item {
  id: string;
  name: string;
}

interface SettingsCrudRowProps {
  item: Item;
  tableName: "location" | "category";
  title: string;
}

export function SettingsCrudRow({ item, tableName, title }: SettingsCrudRowProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(item.name);

  const onUpdate = async () => {
    if (!name.trim()) {
      toast.error("Naam mag niet leeg zijn.");
      return;
    }
    const result = await updateSetting(tableName, item.id, name);
    if (result.error) {
      toast.error("Bijwerken mislukt", { description: result.error });
    } else {
      toast.success(`${title.slice(0, -1)} succesvol bijgewerkt.`);
      setIsEditing(false);
      router.refresh();
    }
  };

  const onDelete = async () => {
    const result = await deleteSetting(tableName, item.id);
    if (result.error) {
      toast.error("Verwijderen mislukt", { description: result.error });
    } else {
      toast.success(`${title.slice(0, -1)} succesvol verwijderd.`);
      router.refresh();
    }
  };

  const handleEditClick = () => {
    setName(item.name);
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-between p-2 rounded-md border">
      {isEditing ? (
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-8"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') onUpdate();
            if (e.key === 'Escape') handleCancelClick();
          }}
        />
      ) : (
        <span>{item.name}</span>
      )}
      <div className="flex gap-1">
        {isEditing ? (
          <>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onUpdate}>
              <Check className="h-4 w-4 text-green-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCancelClick}>
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleEditClick}>
              <Edit className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Weet je het zeker?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Deze actie kan niet ongedaan worden gemaakt. Dit zal de {title.toLowerCase().slice(0, -1)} permanent verwijderen.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Annuleren</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete} className="bg-destructive hover:bg-destructive/90">
                    Verwijderen
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </div>
    </div>
  );
}