import { Course, Location, Category, Registration, Profile } from './types';
import { User } from '@prisma/client';

export const mockLocations: Location[] = [
  { id: 'clxne618g000008l5he0f508j', name: 'Eindhoven' },
  { id: 'clxne618h000108l5b38j391j', name: 'Venlo' },
  { id: 'clxne618i000208l5e9aj2h4k', name: 'Maastricht' },
];

export const mockCategories: Category[] = [
  { id: 'clxne6a8k000308l5d0f3g7h2', name: 'Auto' },
  { id: 'clxne6a8l000408l5h2j4k1l3', name: 'Motor' },
];

export const mockInstructors: User[] = [
    { id: 'clxnf0t3m000008l5c3j4k2l1', email: 'instructor1@test.com', password: 'Hoi123', role: 'instructor', name: null, emailVerified: null },
    { id: 'clxnf0t3n000108l5d4k5l3m2', email: 'instructor2@test.com', password: '', role: 'instructor', name: null, emailVerified: null },
];

export const mockCourses: Course[] = [
  {
    id: 'course1',
    courseDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '08:00:00',
    endTime: '15:00:00',
    basePrice: 99.0,
    examFee: 48.75,
    spotsAvailable: 12,
    instructorNumber: '1234A5',
    locationId: mockLocations[0].id,
    location: mockLocations[0],
    categoryId: mockCategories[0].id,
    category: mockCategories[0],
    instructorId: mockInstructors[0].id,
    instructor: { email: mockInstructors[0].email! },
  },
  {
    id: 'course2',
    courseDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '08:00:00',
    endTime: '15:00:00',
    basePrice: 99.0,
    examFee: 48.75,
    spotsAvailable: 5,
    instructorNumber: '1234A5',
    locationId: mockLocations[0].id,
    location: mockLocations[0],
    categoryId: mockCategories[0].id,
    category: mockCategories[0],
    instructorId: mockInstructors[0].id,
    instructor: { email: mockInstructors[0].email! },
  },
  {
    id: 'course3',
    courseDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    startTime: '08:30:00',
    endTime: '15:30:00',
    basePrice: 105.0,
    examFee: 48.75,
    spotsAvailable: 8,
    instructorNumber: '6789B1',
    locationId: mockLocations[1].id,
    location: mockLocations[1],
    categoryId: mockCategories[1].id,
    category: mockCategories[1],
    instructorId: mockInstructors[1].id,
    instructor: { email: mockInstructors[1].email! },
  },
];

export const mockRegistrations: (Registration & { course: Course })[] = [
    {
        id: 'reg1',
        createdAt: new Date().toISOString(),
        firstName: 'Piet',
        lastName: 'Jansen',
        email: 'piet@test.com',
        paymentStatus: 'paid',
        course: mockCourses[0],
    },
    {
        id: 'reg2',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        firstName: 'Eva',
        lastName: 'de Boer',
        email: 'eva@test.com',
        paymentStatus: 'pending',
        course: mockCourses[1],
    }
];

export const mockUsers: User[] = [
    { id: 'user1', email: 'admin@theoriecentra.nl', password: 'hashedpassword', role: 'admin', name: null, emailVerified: null },
    ...mockInstructors,
];

export const mockProfiles: Profile[] = mockUsers.map(u => ({
    id: u.id,
    role: u.role,
    user: { email: u.email! }
}));