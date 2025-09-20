import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

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

  try {
    await writeFile(path, buffer);
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url });
  } catch (error) {
    console.error("Fout bij opslaan van bestand:", error);
    return NextResponse.json({ error: "Kon bestand niet opslaan." }, { status: 500 });
  }
}