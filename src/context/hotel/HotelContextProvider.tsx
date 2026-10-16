'use client'

import React, { useEffect, useState } from "react"
import {
  useQueryStates,
  parseAsArrayOf,
  parseAsString,
  parseAsInteger,
} from "nuqs"
import { useSearchParams } from "next/navigation"
import { useGetHotelsByFiltersDemo, useHotelSearch } from "@/services/hotel/querys"
import { Hotel } from "@/types"
import { useHotelStore } from "@/store/hotel.store"
import { useNuqsContext } from "../NuqsContentProvider"

type HotelContextProps = {
  hotels: Hotel[]
  isLoading: boolean
  total: number
  page: number
  setPage: (page: number) => void
}

export const HotelContext = React.createContext<HotelContextProps | null>(null);

export const HotelContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { filters, setFilters, page, setPage } = useNuqsContext()
  const searchParams = useSearchParams()
  const queryCity = searchParams.get("city")
  const { guests, city, setCity, date } = useHotelStore()

  useEffect(() => {
    if (queryCity && queryCity.trim() && queryCity.toLowerCase() !== city?.toLowerCase()) {
      setCity(queryCity.trim())
    }
  }, [queryCity, city, setCity])

  const activeCity = queryCity?.trim() || city

  function formatDate(dateValue: any) {
    if (!dateValue) return undefined;
    const d = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
    if (isNaN(d.getTime())) return undefined;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  const combinedFilters = React.useMemo(() => ({
    ...filters,
    city: activeCity,
    adults: guests.adults,
    children: guests.children,
    date: {
      checkIn: formatDate(date?.from),
      checkOut: formatDate(date?.to)
    }
  }), [filters, guests, activeCity, date]);

  const debouncedFilters = useDebounce(combinedFilters, 400)
  const debouncedPage = useDebounce(page, 300)
  // console.log(guests, city, date);

  // const { data: d } = useHotelSearch({
  //   destination: city,
  //   checkIn: date?.from,
  //   checkOut: date?.to,
  //   adults: guests.adults,
  //   children: guests.children
  // })
  // const hotelss: Hotel[] = d?.data ?? []
  const { data, isLoading } = useGetHotelsByFiltersDemo(debouncedFilters as any, debouncedPage)
  // const c = 
  const hotels: Hotel[] = data?.data ?? []
  const total: number = data?.total ?? 0
  // console.log(, hotels);


  return (
    <HotelContext.Provider value={{ hotels, isLoading, total, page, setPage }}>
      {children}
    </HotelContext.Provider>
  )
}

export const useHotelContext = () => {
  const ctx = React.useContext(HotelContext)
  if (!ctx) {
    throw new Error("useHotelContext must be used inside HotelContextProvider")
  }
  return ctx
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)

    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}