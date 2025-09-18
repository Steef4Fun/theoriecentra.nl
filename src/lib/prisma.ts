import { PrismaClient } from '@prisma/client';
import mockPrisma from './prisma-mock';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

let prisma: PrismaClient | typeof mockPrisma;

if (process.env.MOCK_DB === 'true') {
  console.log("✅ Using MOCK Prisma client for local development.");
  prisma = mockPrisma;
} else {
  prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

  if (process.env.NODE_ENV !== 'production') {
    globalThis.prismaGlobal = prisma as PrismaClient;
  }
}

export default prisma as PrismaClient;