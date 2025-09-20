"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UploadCloud, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload mislukt");
      }

      onChange(data.url);
      toast.success("Afbeelding succesvol geüpload!");
    } catch (error) {
      toast.error("Upload mislukt", {
        description: error instanceof Error ? error.message : "Probeer het opnieuw.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative group">
          <Image
            src={value}
            alt="Geüploade afbeelding"
            width={200}
            height={120}
            className="rounded-md object-cover w-full h-32"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <>
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold">Klik om te uploaden</span> of sleep
                </p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/jpeg, image/jpg, image/webp"
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}