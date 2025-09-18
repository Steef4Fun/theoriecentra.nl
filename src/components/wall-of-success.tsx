import Image from "next/image";

// In a real application, these would come from a CMS or database.
const imageUrls = Array.from(
  { length: 35 },
  (_, i) => `https://source.unsplash.com/random/400x${Math.floor(Math.random() * (600 - 400 + 1)) + 400}?portrait,happy,person&sig=${i}`
);

export function WallOfSuccess() {
  return (
    <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4">
      {imageUrls.map((url, index) => (
        <div key={index} className="break-inside-avoid">
          <Image
            src={url}
            alt={`Geslaagde leerling ${index + 1}`}
            width={400}
            height={600}
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
}