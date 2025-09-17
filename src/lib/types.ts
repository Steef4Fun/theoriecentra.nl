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
  category: { id: string; name: string } | null;
  instructorId?: string | null;
  instructor: {
    email: string;
  } | null;
};

export type Location = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Registration = {
    id: string;
    createdAt: string;
    firstName: string;
    lastName: string;
    email: string;
    paymentStatus: string;
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
  user: {
    email: string;
  } | null;
};