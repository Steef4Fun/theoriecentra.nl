import { mockCourses, mockLocations, mockCategories, mockRegistrations, mockUsers, mockProfiles } from './mock-data';

const mockPrisma = {
  location: {
    findMany: async () => mockLocations,
    create: async (data: any) => {
      const newItem = { id: `new_${Math.random()}`, ...data.data };
      mockLocations.push(newItem);
      return newItem;
    },
    update: async (data: any) => {
      const index = mockLocations.findIndex(i => i.id === data.where.id);
      if (index > -1) mockLocations[index].name = data.data.name;
      return mockLocations[index];
    },
    delete: async (data: any) => {
      const index = mockLocations.findIndex(i => i.id === data.where.id);
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
      const index = mockCategories.findIndex(i => i.id === data.where.id);
      if (index > -1) mockCategories[index].name = data.data.name;
      return mockCategories[index];
    },
    delete: async (data: any) => {
      const index = mockCategories.findIndex(i => i.id === data.where.id);
      if (index > -1) mockCategories.splice(index, 1);
      return { id: data.where.id };
    },
  },
  course: {
    findMany: async (query: any) => {
        if (query?.where?.locationId && query?.where?.categoryId) {
            return mockCourses.filter(c => c.locationId === query.where.locationId && c.categoryId === query.where.categoryId);
        }
        return mockCourses;
    },
    findUnique: async (query: any) => mockCourses.find(c => c.id === query.where.id) || null,
    count: async () => mockCourses.length,
    create: async (data: any) => {
        const newCourse = { id: `new_${Math.random()}`, ...data.data };
        mockCourses.push(newCourse as any);
        return newCourse;
    },
    update: async (data: any) => {
        const index = mockCourses.findIndex(c => c.id === data.where.id);
        if (index > -1) Object.assign(mockCourses[index], data.data);
        return mockCourses[index];
    },
    delete: async (data: any) => {
        const index = mockCourses.findIndex(c => c.id === data.where.id);
        if (index > -1) mockCourses.splice(index, 1);
        return { id: data.where.id };
    }
  },
  registration: {
    findMany: async () => mockRegistrations,
    count: async () => mockRegistrations.length,
    findUnique: async (query: any) => mockRegistrations.find(r => r.id === query.where.id) || null,
  },
  user: {
    findMany: async () => mockUsers,
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
    findUnique: async () => null,
  }
};

export default mockPrisma as any;