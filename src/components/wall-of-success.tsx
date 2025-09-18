"use client";

import Image from "next/image";

const students = [
  { name: "Max", src: "https://source.unsplash.com/500x500/?portrait,man,happy", width: 500, height: 500 },
  { name: "Lisa", src: "https://source.unsplash.com/500x600/?portrait,woman,smiling", width: 500, height: 600 },
  { name: "Tom", src: "https://source.unsplash.com/500x700/?portrait,young,man", width: 500, height: 700 },
  { name: "Eva", src: "https://source.unsplash.com/500x550/?portrait,woman,joy", width: 500, height: 550 },
  { name: "Sem", src: "https://source.unsplash.com/500x650/?portrait,student,male", width: 500, height: 650 },
  { name: "Noa", src: "https://source.unsplash.com/500x520/?portrait,student,female", width: 500, height: 520 },
  { name: "Daan", src: "https://source.unsplash.com/500x580/?portrait,guy,happy", width: 500, height: 580 },
  { name: "Zoe", src: "https://source.unsplash.com/500x510/?portrait,girl,smiling", width: 500, height: 510 },
];

// A generic, lightweight SVG to use as a blur placeholder.
const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJibHVyRmlsdGVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI1IiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIGZpbHRlcj0idXJsKCNibHVyRmlsdGVyKSIvPjwvc3ZnPg==";

export function WallOfSuccess() {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {students.map((student, index) => (
        <div
          key={student.name + index}
          className="group relative overflow-hidden rounded-xl shadow-soft transition-all duration-300 hover:shadow-lg hover:scale-105 break-inside-avoid"
        >
          <Image
            src={`${student.src}&sig=${index}`} // Add sig to get unique images from unsplash
            alt={`Geslaagde leerling ${student.name}`}
            width={student.width}
            height={student.height}
            placeholder="blur"
            blurDataURL={blurDataURL}
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