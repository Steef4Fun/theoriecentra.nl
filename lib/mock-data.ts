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

export const mockUsers: User[] = [
    { id: 'user-admin', email: 'admin@test.com', password: 'hashedpassword', role: 'admin', name: 'Admin User', emailVerified: null, image: null },
    { id: 'user-instructor-1', email: 'instructor1@test.com', password: 'hashedpassword', role: 'instructor', name: 'Instructor One', emailVerified: null, image: null },
    { id: 'user-instructor-2', email: 'instructor2@test.com', password: 'hashedpassword', role: 'instructor', name: 'Instructor Two', emailVerified: null, image: null },
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
    instructorId: mockUsers[1].id,
    instructor: { email: mockUsers[1].email! },
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
    instructorId: mockUsers[1].id,
    instructor: { email: mockUsers[1].email! },
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
    instructorId: mockUsers[2].id,
    instructor: { email: mockUsers[2].email! },
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

export const mockProfiles: Profile[] = mockUsers.map(u => ({
    id: u.id,
    role: u.role,
    user: { email: u.email! }
}));