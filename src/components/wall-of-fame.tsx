"use client";

import Image from "next/image";

const students = [
  "Max", "Lisa", "Tom", "Eva", "Sem", "Noa", "Daan", "Zoe",
  "Luuk", "Mila", "Bram", "Saar"
];

export function WallOfFame() {
  return (
    <div className="grid grid-cols-10 grid-rows-10 gap-4 h-[500px] md:h-[600px]">
      {students.map((student, index) => (
        <div
          key={student}
          className={`group relative overflow-hidden rounded-xl shadow-soft transition-all duration-300 hover:shadow-md hover:scale-105
            ${index === 0 ? 'col-start-1 row-start-1 col-span-3 row-span-3' : ''}
            ${index === 1 ? 'col-start-4 row-start-1 col-span-2 row-span-2' : ''}
            ${index === 2 ? 'col-start-6 row-start-1 col-span-4 row-span-4' : ''}
            ${index === 3 ? 'col-start-1 row-start-4 col-span-2 row-span-2' : ''}
            ${index === 4 ? 'col-start-3 row-start-4 col-span-3 row-span-3' : ''}
            ${index === 5 ? 'col-start-6 row-start-5 col-span-3 row-span-3' : ''}
            ${index === 6 ? 'col-start-9 row-start-5 col-span-2 row-span-2' : ''}
            ${index === 7 ? 'col-start-1 row-start-6 col-span-4 row-span-4' : ''}
            ${index === 8 ? 'col-start-5 row-start-7 col-span-3 row-span-3' : ''}
            ${index === 9 ? 'col-start-8 row-start-7 col-span-3 row-span-3' : ''}
            ${index === 10 ? 'col-start-1 row-start-10 col-span-2 row-span-1' : ''}
            ${index === 11 ? 'col-start-3 row-start-10 col-span-2 row-span-1' : ''}
          `}
        >
          <Image
            src={`https://api.dicebear.com/8.x/lorelei/svg?seed=${student}&backgroundColor=c0aede,b6e3f4,d1d4f9`}
            alt={`Geslaagde leerling ${student}`}
            fill
            sizes="(max-width: 768px) 20vw, 10vw"
            className="h-full w-full object-cover transition-transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <p className="absolute bottom-2 left-3 font-bold text-white text-sm md:text-base">{student}</p>
        </div>
      ))}
    </div>
  );
}