export type Course = {
  id: string;
  course_date: string;
  start_time: string;
  end_time: string;
  base_price: number;
  exam_fee: number;
  spots_available: number;
  instructor_number: string;
  location_id: string;
  location: { id: string; name: string } | null;
  category_id: string;
  category: { id: string; name: string } | null;
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
    created_at: string;
    first_name: string;
    last_name: string;
    email: string;
    payment_status: string;
    course: {
        course_date: string;
        category: {
            name: string;
        } | null;
    } | null;
};

export type Profile = {
  id: string;
  role: string;
  instructor_number: string | null;
  user: {
    email: string;
    created_at: string;
  } | null;
};