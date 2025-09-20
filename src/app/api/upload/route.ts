import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join, dirname } from "path";
import { randomUUID } from "crypto";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};

export async function POST(req: NextRequest) {
  const data = await req.formData();
  const file: File | null = data.get("file") as unknown as File;

  if (!file) {
    return NextResponse.json({ error: "Geen bestand geüpload." }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const extension = file.name.split('.').pop();
  const filename = `${randomUUID()}.${extension}`;
  const path = join(process.cwd(), "public/uploads", filename);
  const dir = dirname(path);

  try {
    // Zorg ervoor dat de map bestaat voordat we schrijven
    await mkdir(dir, { recursive: true });
    
    await writeFile(path, buffer);
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Fout bij opslaan van bestand:", error);
    return NextResponse.json({ error: "Kon bestand niet opslaan." }, { status: 500 });
  }
}