"use client";

import Image from "next/image";

const students = [
  { name: "Max", width: 400, height: 500 },
  { name: "Lisa", width: 300, height: 400 },
  { name: "Tom", width: 500, height: 700 },
  { name: "Eva", width: 400, height: 400 },
  { name: "Sem", width: 400, height: 600 },
  { name: "Noa", width: 500, height: 400 },
  { name: "Daan", width: 300, height: 500 },
  { name: "Zoe", width: 400, height: 500 },
];

export function WallOfFame() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {students.map((student, index) => (
        <div
          key={student.name}
          className="group relative overflow-hidden rounded-xl shadow-soft transition-all duration-300 hover:shadow-md hover:!scale-105 break-inside-avoid"
        >
          <Image
            src={`https://source.unsplash.com/random/${student.width}x${student.height}?portrait,happy,student&sig=${index}`}
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