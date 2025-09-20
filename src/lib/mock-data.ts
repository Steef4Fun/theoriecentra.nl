import { Course, Location, Category, Registration, Profile, Setting, InstructorProfile } from '@/lib/types';
import { User } from '@prisma/client';

export const mockLocations: Location[] = [
  { id: 'clxne618g000008l5he0f508j', name: 'Eindhoven' },
  { id: 'clxne618h000108l5b38j391j', name: 'Venlo' },
  { id: 'clxne618i000208l5e9aj2h4k', name: 'Maastricht' },
];

export const mockCategories: Category[] = [
  { id: 'clxne6a8k000308l5d0f3g7h2', name: 'Auto', icon: 'Car' },
  { id: 'clxne6a8l000408l5h2j4k1l3', name: 'Motor', icon: 'Motorcycle' },
];

export const mockUsers: User[] = [
    { id: 'user-admin', email: 'admin@test.com', password: 'hashedpassword', role: 'admin', name: 'Admin User', emailVerified: null, image: null, passwordResetToken: null, passwordResetExpires: null, title: null, bio: null, passRate: null, imageUrl: null },
    { id: 'user-instructor-1', email: 'instructor1@test.com', password: 'hashedpassword', role: 'instructor', name: 'Instructor One', emailVerified: null, image: null, passwordResetToken: null, passwordResetExpires: null, title: 'Hoofdinstructeur', bio: 'Bio voor instructeur 1', passRate: '95%', imageUrl: '' },
    { id: 'user-instructor-2', email: 'instructor2@test.com', password: 'hashedpassword', role: 'instructor', name: 'Instructor Two', emailVerified: null, image: null, passwordResetToken: null, passwordResetExpires: null, title: 'Theorie-expert', bio: 'Bio voor instructeur 2', passRate: '92%', imageUrl: '' },
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
    instructor: { email: mockUsers[1].email!, name: mockUsers[1].name },
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
    instructor: { email: mockUsers[1].email!, name: mockUsers[1].name },
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
    instructor: { email: mockUsers[2].email!, name: mockUsers[2].name },
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
        phoneNumber: '0612345678',
        dateOfBirth: new Date('1999-01-01').toISOString(),
        paymentOption: 'full',
        molliePaymentId: 'tr_12345',
        courseId: mockCourses[0].id,
    },
    {
        id: 'reg2',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        firstName: 'Eva',
        lastName: 'de Boer',
        email: 'eva@test.com',
        paymentStatus: 'pending',
        course: mockCourses[1],
        phoneNumber: '0687654321',
        dateOfBirth: new Date('2001-05-10').toISOString(),
        paymentOption: 'deposit',
        molliePaymentId: 'tr_67890',
        courseId: mockCourses[1].id,
    }
];

export const mockProfiles: Profile[] = mockUsers.map(u => ({
    id: u.id,
    role: u.role,
    title: u.title,
    bio: u.bio,
    passRate: u.passRate,
    imageUrl: u.imageUrl,
    user: { 
        email: u.email!,
        name: u.name
    }
}));

export const mockSettings: Setting[] = [
    { key: 'imageUrlHero', value: '/hero-image.jpg' },
    { key: 'imageUrlHowItWorks1', value: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop' },
    { key: 'imageUrlHowItWorks2', value: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop' },
    { key: 'imageUrlHowItWorks3', value: 'https://images.unsplash.com/photo-1579636597202-3317e7b3c5f4?q=80&w=800&auto=format&fit=crop' },
];

export const mockInstructorProfiles: InstructorProfile[] = [
    {
        id: 'ip1',
        name: 'Jan de Vries',
        title: 'Hoofdinstructeur',
        bio: 'Jan heeft 15 jaar ervaring en helpt je met plezier slagen.',
        passRate: '94%',
        imageUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Jan',
        isActive: true,
        order: 1,
    },
    {
        id: 'ip2',
        name: 'Fatima El Idrissi',
        title: 'Theorie-expert',
        bio: 'Fatima kent alle ins en outs van het CBR-examen en deelt haar kennis graag.',
        passRate: '96%',
        imageUrl: 'https://api.dicebear.com/8.x/adventurer/svg?seed=Fatima',
        isActive: true,
        order: 2,
    }
];