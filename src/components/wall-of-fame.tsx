"use client";

import Image from "next/image";

const students = [
  { name: "Max", src: "https://api.dicebear.com/8.x/adventurer/svg?seed=Max", width: 500, height: 500 },
  { name: "Lisa", src: "https://api.dicebear.com/8.x/adventurer/svg?seed=Lisa", width: 500, height: 500 },
  { name: "Tom", src: "https://api.dicebear.com/8.x/adventurer/svg?seed=Tom", width: 500, height: 500 },
  { name: "Eva", src: "https://api.dicebear.com/8.x/adventurer/svg?seed=Eva", width: 500, height: 500 },
  { name: "Sem", src: "https://api.dicebear.com/8.x/adventurer/svg?seed=Sem", width: 500, height: 500 },
  { name: "Noa", src: "https://api.dicebear.com/8.x/adventurer/svg?seed=Noa", width: 500, height: 500 },
  { name: "Daan", src: "https://api.dicebear.com/8.x/adventurer/svg?seed=Daan", width: 500, height: 500 },
  { name: "Zoe", src: "https://api.dicebear.com/8.x/adventurer/svg?seed=Zoe", width: 500, height: 500 },
];

// A generic, lightweight SVG to use as a blur placeholder.
const blurDataURL = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZmlsdGVyIGlkPSJibHVyRmlsdGVyIj48ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSI1IiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNjY2MiIGZpbHRlcj0idXJsKCNibHVyRmlsdGVyKSIvPjwvc3ZnPg==";

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