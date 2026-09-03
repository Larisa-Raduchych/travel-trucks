import axios from "axios";
import {
  Camper,
  CamperListResponse,
  FiltersResponse,
  Review,
  BookingRequest,
} from "@/types/camper";

// axios-інстанс
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Параметри для каталогу (пагінація + фільтри)
export interface GetCampersParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}

// Отримати список кемперів (з фільтрами й пагінацією)
export async function getCampers(
  params: GetCampersParams
): Promise<CamperListResponse> {
  const { data } = await api.get<CamperListResponse>("/campers", { params });
  return data;
}

// Отримати доступні фільтри
export async function getFilters(): Promise<FiltersResponse> {
  const { data } = await api.get<FiltersResponse>("/campers/filters");
  return data;
}

// Отримати один кемпер за id
export async function getCamperById(id: string): Promise<Camper> {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
}

// Отримати відгуки кемпера
export async function getCamperReviews(id: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/campers/${id}/reviews`);
  return data;
}

// Створити бронювання
export async function createBooking(
  id: string,
  booking: BookingRequest
): Promise<{ message: string }> {
  const { data } = await api.post(`/campers/${id}/booking-requests`, booking);
  return data;
}