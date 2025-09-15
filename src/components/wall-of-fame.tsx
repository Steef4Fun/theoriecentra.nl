"use client";

import Image from "next/image";

const students = [
  "Max", "Lisa", "Tom", "Eva", "Sem", "Noa", "Daan", "Zoe",
  "Luuk", "Mila", "Bram", "Saar", "Finn", "Tess", "Mees", "Fleur"
];

export function WallOfFame() {
  return (
    <div className="grid grid-cols-4 gap-4 md:grid-cols-8">
      {students.map((student) => (
        <div key={student} className="group aspect-square overflow-hidden rounded-full border-2 border-border transition-all hover:scale-105 hover:shadow-lg">
          <Image
            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${student}`}
            alt={`Geslaagde leerling ${student}`}
            width={150}
            height={150}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
      ))}
    </div>
  );
}