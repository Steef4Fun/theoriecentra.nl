import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      where: {
        courseDate: {
          gte: new Date(),
        },
        spotsAvailable: {
          gt: 0,
        },
      },
      include: {
        location: true,
        category: true,
      },
      orderBy: {
        courseDate: 'asc',
      },
      take: 5,
    });
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json({ error: "Kon aankomende cursussen niet ophalen." }, { status: 500 });
  }
}