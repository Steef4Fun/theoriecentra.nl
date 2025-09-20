import { mockCourses, mockLocations, mockCategories, mockRegistrations, mockUsers, mockSettings, mockInstructorProfiles } from './mock-data';
import { Course, Location, Category, Registration } from './types';
import { User } from '@prisma/client';

const mockPrisma = {
  location: {
    findMany: async () => mockLocations,
    create: async (data: any) => {
      const newItem = { id: `new_${Math.random()}`, ...data.data };
      mockLocations.push(newItem);
      return newItem;
    },
    update: async (data: any) => {
      const index = mockLocations.findIndex((i: Location) => i.id === data.where.id);
      if (index > -1) mockLocations[index].name = data.data.name;
      return mockLocations[index];
    },
    delete: async (data: any) => {
      const index = mockLocations.findIndex((i: Location) => i.id === data.where.id);
      if (index > -1) mockLocations.splice(index, 1);
      return { id: data.where.id };
    },
  },
  category: {
    findMany: async () => mockCategories,
    create: async (data: any) => {
      const newItem = { id: `new_${Math.random()}`, ...data.data };
      mockCategories.push(newItem);
      return newItem;
    },
    update: async (data: any) => {
      const index = mockCategories.findIndex((i: Category) => i.id === data.where.id);
      if (index > -1) mockCategories[index].name = data.data.name;
      return mockCategories[index];
    },
    delete: async (data: any) => {
      const index = mockCategories.findIndex((i: Category) => i.id === data.where.id);
      if (index > -1) mockCategories.splice(index, 1);
      return { id: data.where.id };
    },
  },
  course: {
    findMany: async (query: any) => {
        if (query?.where?.locationId && query?.where?.categoryId) {
            return mockCourses.filter((c: Course) => c.locationId === query.where.locationId && c.categoryId === query.where.categoryId);
        }
        return mockCourses;
    },
    findUnique: async (query: any) => mockCourses.find((c: Course) => c.id === query.where.id) || null,
    count: async () => mockCourses.length,
    create: async (data: any) => {
        const newCourse = { id: `new_${Math.random()}`, ...data.data };
        mockCourses.push(newCourse as any);
        return newCourse;
    },
    update: async (data: any) => {
        const index = mockCourses.findIndex((c: Course) => c.id === data.where.id);
        if (index > -1) Object.assign(mockCourses[index], data.data);
        return mockCourses[index];
    },
    delete: async (data: any) => {
        const index = mockCourses.findIndex((c: Course) => c.id === data.where.id);
        if (index > -1) mockCourses.splice(index, 1);
        return { id: data.where.id };
    }
  },
  registration: {
    findMany: async () => mockRegistrations,
    count: async () => mockRegistrations.length,
    findUnique: async (query: any) => mockRegistrations.find((r: Registration) => r.id === query.where.id) || null,
  },
  user: {
    findMany: async (query?: any) => {
      if (query?.where?.role) {
        return mockUsers.filter((u: User) => u.role === query.where.role);
      }
      return mockUsers;
    },
    findUnique: async (query: any) => mockUsers.find((u: User) => u.email === query.where.email) || null,
    create: async (data: any) => {
      const newUser = { id: `new_${Math.random()}`, ...data.data };
      mockUsers.push(newUser);
      return newUser;
    },
    update: async (data: any) => {
      const index = mockUsers.findIndex((u: User) => u.id === data.where.id);
      if (index > -1) Object.assign(mockUsers[index], data.data);
      return mockUsers[index];
    },
    delete: async (data: any) => {
      const index = mockUsers.findIndex((u: User) => u.id === data.where.id);
      if (index > -1) mockUsers.splice(index, 1);
      return { id: data.where.id };
    },
  },
  auditLog: {
    findMany: async () => [],
    create: async () => {},
  },
  mailLog: {
    findMany: async () => [],
  },
  mailTemplate: {
    findMany: async () => [],
  },
  setting: {
    findUnique: async (query: any) => mockSettings.find((s) => s.key === query.where.key) || null,
    findMany: async (query?: any) => {
        if (query?.where?.key?.startsWith) {
            return mockSettings.filter(s => s.key.startsWith(query.where.key.startsWith));
        }
        return mockSettings;
    },
    upsert: async (data: any) => {
        const index = mockSettings.findIndex(s => s.key === data.where.key);
        if (index > -1) {
            mockSettings[index].value = data.update.value;
            return mockSettings[index];
        } else {
            const newSetting = { key: data.create.key, value: data.create.value };
            mockSettings.push(newSetting);
            return newSetting;
        }
    }
  },
  instructorProfile: {
      findMany: async (query?: any) => {
          if (query?.where?.isActive) {
              return mockInstructorProfiles.filter(p => p.isActive === query.where.isActive);
          }
          return mockInstructorProfiles;
      },
      create: async (data: any) => {
          const newProfile = { id: `new_ip_${Math.random()}`, ...data.data };
          mockInstructorProfiles.push(newProfile);
          return newProfile;
      },
      update: async (data: any) => {
          const index = mockInstructorProfiles.findIndex(p => p.id === data.where.id);
          if (index > -1) Object.assign(mockInstructorProfiles[index], data.data);
          return mockInstructorProfiles[index];
      },
      delete: async (data: any) => {
          const index = mockInstructorProfiles.findIndex(p => p.id === data.where.id);
          if (index > -1) mockInstructorProfiles.splice(index, 1);
          return { id: data.where.id };
      }
  }
};

export default mockPrisma as any;