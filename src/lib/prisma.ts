import { Prisma, PrismaClient } from '@prisma/client';
import {
  mockCourses,
  mockLocations,
  mockCategories,
  mockRegistrations,
  mockUsers,
  mockSettings,
  mockInstructorProfiles,
} from './mock-data';

// --- Real Prisma Client Singleton ---
const prismaClientSingleton = () => {
  return new PrismaClient();
};
declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}
const realPrisma = globalThis.prismaGlobal ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = realPrisma;
}

// --- Mock Prisma Client ---
const mockPrisma = {
  course: {
    findMany: async (args?: any) => mockCourses.map(c => ({ ...c, _count: { registrations: mockRegistrations.filter(r => r.courseId === c.id).length } })),
    findUnique: async ({ where }: { where: { id: string } }) => mockCourses.find(c => c.id === where.id) || null,
    count: async () => mockCourses.length,
    create: async (args: any) => args.data,
    update: async (args: any) => args.data,
    delete: async (args: any) => args.where,
  },
  location: {
    findMany: async () => mockLocations,
    create: async (args: any) => args.data,
    update: async (args: any) => args.data,
    delete: async (args: any) => args.where,
  },
  category: {
    findMany: async () => mockCategories,
    create: async (args: any) => args.data,
    update: async (args: any) => args.data,
    delete: async (args: any) => args.where,
  },
  registration: {
    findMany: async () => mockRegistrations,
    findUnique: async ({ where }: { where: { id: string } }) => mockRegistrations.find(r => r.id === where.id) || null,
    count: async () => mockRegistrations.length,
    create: async (args: any) => args.data,
    update: async (args: any) => args.data,
  },
  user: {
    findMany: async () => mockUsers,
    findUnique: async ({ where }: { where: { email?: string, id?: string } }) => mockUsers.find(u => u.email === where.email || u.id === where.id) || null,
    create: async (args: any) => args.data,
    update: async (args: any) => args.data,
    delete: async (args: any) => args.where,
  },
  auditLog: {
    findMany: async () => [],
    create: async (args: any) => args.data,
  },
  mailLog: {
    findMany: async () => [],
    create: async (args: any) => args.data,
  },
  mailTemplate: {
    findMany: async () => [],
    findUnique: async () => null,
    update: async (args: any) => args.data,
  },
  setting: {
    findMany: async () => mockSettings,
    findUnique: async ({ where }: { where: { key: string } }) => mockSettings.find(s => s.key === where.key) || null,
    upsert: async (args: any) => args.update,
  },
  instructorProfile: {
    findMany: async () => mockInstructorProfiles,
    create: async (args: any) => args.data,
    update: async (args: any) => args.data,
    delete: async (args: any) => args.where,
  },
  $queryRaw: async (query: Prisma.Sql) => {
    // Mock for dashboard weekly registrations
    return [
      { week: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), count: 5n },
      { week: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), count: 12n },
      { week: new Date(), count: 8n },
    ];
  },
  $transaction: async (callback: any) => {
    return callback(mockPrisma);
  },
};

// --- Export correct client based on environment variable ---
const prisma = process.env.MOCK_DB === 'true' ? mockPrisma : realPrisma;

export default prisma as unknown as PrismaClient;