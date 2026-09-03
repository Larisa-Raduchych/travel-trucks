// Зручності кемпера
export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  gallery: CamperImage[];
  coverImage?: string;
  totalReviews: number;
}

// Картка кемпера в каталозі (коротша)
export interface CamperListItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  form: string;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: string;
  amenities: string[];
  coverImage: string;
  totalReviews: number;
}

// Зображення в галереї
export interface CamperImage {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

// Відповідь каталогу (зі списком + пагінацією)
export interface CamperListResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItem[];
}

// Доступні фільтри
export interface FiltersResponse {
  forms: string[];
  transmissions: string[];
  engines: string[];
}

// Відгук
export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

// Запит на бронювання
export interface BookingRequest {
  name: string;
  email: string;
}