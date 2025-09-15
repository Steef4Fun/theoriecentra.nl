"use client";

import Image from "next/image";

const students = [
  { name: "Max", src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644", width: 2000, height: 1333 },
  { name: "Lisa", src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f", width: 2000, height: 1333 },
  { name: "Tom", src: "https://images.unsplash.com/photo-1571260899241-312d1cabc05f", width: 1365, height: 2048 },
  { name: "Eva", src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655", width: 2000, height: 1333 },
  { name: "Sem", src: "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78", width: 1500, height: 1000 },
  { name: "Noa", src: "https://images.unsplash.com/photo-1580582932707-520aed93a943", width: 1333, height: 2000 },
  { name: "Daan", src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1", width: 2000, height: 1333 },
  { name: "Zoe", src: "https://images.unsplash.com/photo-1549490102-420358e332c4", width: 1333, height: 2000 },
];

export function WallOfFame() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {students.map((student) => (
        <div
          key={student.name}
          className="group relative overflow-hidden rounded-xl shadow-soft transition-all duration-300 hover:shadow-md hover:!scale-105 break-inside-avoid"
        >
          <Image
            src={student.src}
            alt={`Geslaagde leerling ${student.name}`}
            width={student.width}
            height={student.height}
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-2 left-3 font-bold text-white text-sm md:text-base text-shadow-sm bg-black/20 px-2 py-1 rounded-md">
            {student.name}
          </p>
        </div>
      ))}
    </div>
  );
}