export type Course = {
  id: string;
  course_date: string;
  start_time: string;
  end_time: string;
  base_price: number;
  exam_fee: number;
  spots_available: number;
  location_id: string;
  location: { name: string } | null;
  category_id: string;
  category: { name: string } | null;
};

export type Location = {
  id: string;
  name: string;
};

export type Category = {
  id: string;
  name: string;
};