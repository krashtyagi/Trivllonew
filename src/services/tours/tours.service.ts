import { axiosApi } from "@/lib/axios";
import { Tour } from "@/context/TourContextProvider";
import { toast } from "sonner";
import { Filters } from "@/context/NuqsContentProvider";
import qs from "qs";

export type TourResponse = {
  data: Tour[];
  total: number;
  count?: number;
};
export type TourCompanyItem = {
  _id: string;
  name: string;
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  city?: string;
  address?: string;
  logo?: string;
  images?: { url: string; public_id?: string; resource_type?: string }[];
  description?: string;
  features?: string[];
  rating?: { average: number; count: number };
  startingPrice?: number;
  totalTours?: number;
  isFeatured?: boolean;
};

import { orpc } from "@/lib/orpc";

export const getTourCompanies = async (params?: { city?: string; page?: number; limit?: number }) => {
  try {
    const res = await orpc.tour.getCompanies(params);
    return res;
  } catch (error) {
    console.error("Error fetching tour companies:", error);
    return { success: false, data: [] };
  }
};

export type RankedTourItem = {
  _id: string;
  name: string;
  city: string;
  image: string | null;
};

export type RankedTourResponse = {
  success: boolean;
  items: RankedTourItem[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

export const getRankedTourCompanies = async (rank: string, page: number = 1, limit: number = 10): Promise<RankedTourResponse> => {
  try {
    const res = await orpc.tour.getRanked({ rank, page, limit });
    return res as unknown as RankedTourResponse;
  } catch (error) {
    console.error("Error fetching ranked tour companies:", error);
    return { success: false, items: [], total: 0, page, limit, hasMore: false };
  }
};

export const getAllTours = async () => {
  try {
    const res = await orpc.tour.getTours({});
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error("something went wrong");
  }
};

export const getTourServiceDetails = async (id: string) => {
  try {
    const res = await orpc.tour.getServiceDetails({ id });
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error("something went wrong");
  }
};

export const getTourDetails = async (id: string) => {
  try {
    const res = await orpc.tour.getCompanyDetails({ id });
    return res.data;
  } catch (error) {
    console.error(error);
    toast.error("something went wrong");
  }
};

export const getTours = async (
  filters: Filters,
  page: number = 1,
  limit: number = 9,
): Promise<TourResponse> => {
  const params: Record<string, unknown> = { page, limit };

  const [minPrice, maxPrice] = filters.price ?? [0, 100000];
  if (minPrice > 0) params.minPrice = minPrice;
  if (maxPrice > 0 && maxPrice < 100000) params.maxPrice = maxPrice;

  if (filters.location?.length > 0) {
    params.city = filters.location[0];
  } else if ((filters as any).city) {
    params.city = (filters as any).city;
  }

  if (filters.score?.length > 0) {
    params.minRating = Math.min(...filters.score.map(Number));
  }

  if (filters.features?.length > 0) {
    params.features = filters.features;
  }

  if (filters.amenities?.length > 0) {
    params.amenities = filters.amenities;
  }

  if ((filters as any).tourType?.length > 0) {
    params.tourType = (filters as any).tourType;
  }

  if ((filters as any).adults) {
    params.adults = (filters as any).adults;
  }

  if ((filters as any).children) {
    params.children = (filters as any).children;
  }

  if ((filters as any).date?.checkIn)
    params.checkIn = (filters as any).date.checkIn;
  if ((filters as any).date?.checkOut)
    params.checkOut = (filters as any).date.checkOut;

  const res = await orpc.tour.getTours({
    city: params.city as string | undefined,
    minPrice: params.minPrice as number | undefined,
    maxPrice: params.maxPrice as number | undefined,
    minRating: params.minRating as number | undefined,
    features: params.features as string[] | undefined,
    amenities: params.amenities as string[] | undefined,
    tourType: params.tourType as string[] | undefined,
    adults: params.adults as number | undefined,
    children: params.children as number | undefined,
    checkIn: params.checkIn as string | undefined,
    checkOut: params.checkOut as string | undefined,
    page,
    limit,
  });

  const tourData = res.data as any;

  return {
    data: tourData?.tours ?? [],
    total: tourData?.pagination?.total ?? tourData?.pagination?.count ?? 0,
  };
};
