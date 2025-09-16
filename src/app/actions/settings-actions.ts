'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type TableName = "location" | "category";

export async function createSetting(tableName: TableName, name: string, icon?: string | null) {
  try {
    if (tableName === 'location') {
      await prisma.location.create({ data: { name } });
    } else if (tableName === 'category') {
      await prisma.category.create({ data: { name, icon } });
    } else {
      return { error: "Ongeldige tabelnaam." };
    }
    revalidatePath("/admin/instellingen");
    return { error: null };
  } catch (error) {
    return { error: "Kon item niet aanmaken. Mogelijk bestaat de naam al." };
  }
}

export async function updateSetting(tableName: TableName, id: string, name: string, icon?: string | null) {
  try {
    if (tableName === 'location') {
      await prisma.location.update({ where: { id }, data: { name } });
    } else if (tableName === 'category') {
      await prisma.category.update({ where: { id }, data: { name, icon } });
    } else {
      return { error: "Ongeldige tabelnaam." };
    }
    revalidatePath("/admin/instellingen");
    return { error: null };
  } catch (error) {
    return { error: "Kon item niet bijwerken." };
  }
}

export async function deleteSetting(tableName: TableName, id: string) {
  try {
    if (tableName === 'location') {
      await prisma.location.delete({ where: { id } });
    } else if (tableName === 'category') {
      await prisma.category.delete({ where: { id } });
    } else {
      return { error: "Ongeldige tabelnaam." };
    }
    revalidatePath("/admin/instellingen");
    return { error: null };
  } catch (error) {
    return { error: "Kon item niet verwijderen. Mogelijk is het nog in gebruik door een cursus." };
  }
}