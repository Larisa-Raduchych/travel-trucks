import axios from "axios";
import {
  Camper,
  CamperListResponse,
  FiltersResponse,
  Review,
  BookingRequest,
} from "@/types/camper";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export interface GetCampersParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}

export async function getCampers(
  params: GetCampersParams
): Promise<CamperListResponse> {

  const cleanParams: Record<string, string | number> = {};
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== undefined) {
      cleanParams[key] = value;
    }
  });

  const { data } = await api.get<CamperListResponse>("/campers", { params: cleanParams, });
  return data;
}

export async function getFilters(): Promise<FiltersResponse> {
  const { data } = await api.get<FiltersResponse>("/campers/filters");
  return data;
}

export async function getCamperById(id: string): Promise<Camper> {
  const { data } = await api.get<Camper>(`/campers/${id}`);
  return data;
}

export async function getCamperReviews(id: string): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/campers/${id}/reviews`);
  return data;
}

export async function createBooking(
  id: string,
  booking: BookingRequest
): Promise<{ message: string }> {
  const { data } = await api.post(`/campers/${id}/booking-requests`, booking);
  return data;
}