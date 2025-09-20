export type Course = {
  id: string;
  courseDate: string;
  startTime: string;
  endTime: string;
  basePrice: number;
  examFee: number;
  spotsAvailable: number;
  instructorNumber: string;
  locationId: string;
  location: { id: string; name: string } | null;
  categoryId: string;
  category: { id: string; name: string; icon?: string | null } | null;
  instructorId?: string | null;
  instructor: {
    email: string;
    name: string | null;
  } | null;
};

export type Location = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
  icon?: string | null;
};

export type Registration = {
    id: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    paymentOption: string;
    paymentStatus: string;
    molliePaymentId: string | null;
    courseId: string | null;
    course: {
        courseDate: string;
        category: {
            name: string;
        } | null;
    } | null;
};

export type Profile = {
  id: string;
  role: string;
  title: string | null;
  bio: string | null;
  passRate: string | null;
  imageUrl: string | null;
  user: {
    email: string | null;
    name: string | null;
  } | null;
};