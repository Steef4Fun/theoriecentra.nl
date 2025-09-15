"use client";

import Image from "next/image";

const students = [
  { name: "Max", src: "/geslaagden-placeholder.jpg", width: 800, height: 1200 },
  { name: "Lisa", src: "/geslaagden-placeholder.jpg", width: 800, height: 1200 },
  { name: "Tom", src: "/geslaagden-placeholder.jpg", width: 800, height: 1200 },
  { name: "Eva", src: "/geslaagden-placeholder.jpg", width: 800, height: 1200 },
  { name: "Sem", src: "/geslaagden-placeholder.jpg", width: 800, height: 1200 },
  { name: "Noa", src: "/geslaagden-placeholder.jpg", width: 800, height: 1200 },
  { name: "Daan", src: "/geslaagden-placeholder.jpg", width: 800, height: 1200 },
  { name: "Zoe", src: "/geslaagden-placeholder.jpg", width: 800, height: 1200 },
];

export function WallOfFame() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {students.map((student) => (
        <div
          key={student.name}
          className="group relative overflow-hidden rounded-xl shadow-soft transition-all duration-300 hover:shadow-lg hover:scale-105 break-inside-avoid"
        >
          <Image
            src={student.src}
            alt={`Geslaagde leerling ${student.name}`}
            width={student.width}
            height={student.height}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-4 left-4 font-bold text-white text-sm md:text-base text-shadow-sm bg-black/40 px-3 py-1.5 rounded-lg">
            {student.name}
          </p>
        </div>
      ))}
    </div>
  );
}