"use client";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { getTours } from "./tours.service";
import { Filters } from "@/context/NuqsContentProvider";
import { orpc } from "@/lib/orpc";

export const useGetTourCompanies = (params?: { city?: string; page?: number; limit?: number }) => {
  return useQuery({
    queryKey: ["getTourCompanies", params],
    queryFn: () => orpc.tour.getCompanies(params),
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetRankedTourCompanies = (rank: string) => {
  return useInfiniteQuery({
    queryKey: ["ranked_tour_companies", rank],
    queryFn: ({ pageParam = 1 }) =>
      orpc.tour.getRanked({ rank, page: pageParam, limit: 10 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.hasMore) return lastPage.page + 1;
      return undefined;
    },
    enabled: !!rank,
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export const useGetToursByFiltersDemo = (val: Filters, page: number = 1) => {
  return useQuery({
    queryKey: ["tours_by_params", val, page],
    queryFn: () => getTours(val, page),
    staleTime: 30 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useTourServiceDetails = (id: string) => {
  return useQuery({
    queryKey: ["getTourServiceDetails", id],
    queryFn: async () => {
      const result = await orpc.tour.getServiceDetails({ id });
      return result;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false,
  });
};
export const useTourDetailsQuery = (id: string) => {
  return useQuery({
    queryKey: ["getTourDetails", id],
    queryFn: async () => {
      const result = await orpc.tour.getCompanyDetails({ id });
      return result;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: true,
    retry: false,
  });
};
