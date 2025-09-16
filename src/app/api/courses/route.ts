import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const locationId = searchParams.get("locationId");
  const categoryId = searchParams.get("categoryId");

  if (!locationId || !categoryId) {
    return NextResponse.json({ error: "Locatie en categorie zijn verplicht." }, { status: 400 });
  }

  try {
    const courses = await prisma.course.findMany({
      where: {
        locationId,
        categoryId,
        courseDate: {
          gte: new Date(),
        },
      },
      include: {
        location: true,
        category: true,
      },
      orderBy: {
        courseDate: 'asc',
      }
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: "Kon cursussen niet ophalen." }, { status: 500 });
  }
}