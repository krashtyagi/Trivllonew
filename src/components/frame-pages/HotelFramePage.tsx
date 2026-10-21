'use client'
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { PopularDestinationCarousel } from "../carousel/tabs-carousel";
import { useGetNewHotels } from "@/services/hotel/querys";
import type { Item } from "../carousel/onlyColursel";
import { hoteldata, HotelFramePageProps } from "@/app/(home)/(categories)/hotels/page";
import { MapPin } from "lucide-react";
import FrameColursals from "./frame_coloursals";
import RankedBanner from "../addimage/RankedBanner";


type SectionConfig = {
  tagline: string;
  city: string;
  limit?: number;
};

const POPULAR_SECTIONS: SectionConfig[] = [
  { tagline: "Popular Stays in Manali", city: "Manali" },
  { tagline: "Luxury in Indore", city: "Indore" },
  { tagline: "Popular Homes In South Goa", city: "Goa" },
  { tagline: "Best in Delhi", city: "Delhi" },
  { tagline: "Popular Stays In Bengaluru", city: "Bengaluru" },
  { tagline: "Popular Homes In Rishikesh", city: "Rishikesh" },
  { tagline: "Luxury in Mumbai", city: "Mumbai" },
  { tagline: "Stays in Gwalior", city: "Gwalior" },

  { tagline: "Villas & Resorts in Udaipur", city: "Udaipur" },
  { tagline: "Stays in Jaipur", city: "Jaipur" },
  { tagline: "Luxury Rentals in Lonavala", city: "Lonavala" },
  
  { tagline: "Heritage Homes in Mysore", city: "Mysore" },
  { tagline: "Coastal Villas in Kochi", city: "Kochi" },
  { tagline: "Stays in Shimla", city: "Shimla" },
  { tagline: "Hospitality Hub of Hyderabad", city: "Hyderabad" },
  { tagline: "Beachfront Stays in Pondicherry", city: "Pondicherry" },
  { tagline: "Villas in Alibaug", city: "Alibaug" },
];

// Banner positions: after index 2, 5, 8 (gap of ~3 carousels between banners)
const BANNER_POSITIONS: Record<number, "A" | "B" | "C"> = {
  2: "A",
  5: "B",
  8: "C",
};

const MainFramePage = ({ className, type, popularTrends }: HotelFramePageProps) => {
  const { data, isLoading, error } = useGetNewHotels();

  const groupedByCity = useMemo(() => {
    if (!data?.data) return {};

    return data.data.reduce((acc: Record<string, hoteldata[]>, hotel: hoteldata) => {
      const city = hotel.city?.trim();
      if (!city) return acc;
      const key = city.toLowerCase();
      acc[key] = acc[key] || [];
      acc[key].push(hotel);
      return acc;
    }, {} as Record<string, hoteldata[]>);
  }, [data?.data]);

  const activeSectionsWithItems = useMemo(() => {
    if (isLoading) {
      // Render 2 clean skeleton carousels while loading
      return POPULAR_SECTIONS.slice(0, 2).map((section) => ({
        section,
        items: [] as Item[],
      }));
    }

    return POPULAR_SECTIONS.map((section) => {
      const hotelsInCity = groupedByCity[section.city.toLowerCase()] || [];
      const sliced = section.limit ? hotelsInCity.slice(0, section.limit) : hotelsInCity;
      const items: Item[] = sliced.map((hotel: hoteldata): Item => ({
        id: hotel._id,
        _id: hotel._id,
        title: hotel.name,
        location: `${hotel.city}, ${hotel.country || 'India'}`,
        image: hotel.image,
        href: `/hotels/${hotel._id}`,
        price: hotel.startingPrice ?? null,
        rating: (hotel as any).rating,
        numReviews: (hotel as any).numReviews,
        amenities: (hotel as any).amenities,
        isFavorite: (hotel as any).isFavorite,
      }));
      return { section, items };
    }).filter(({ items }) => items.length > 0);
  }, [isLoading, groupedByCity]);

  return (
    <FrameColursals className={cn(className, "w-full ")}>
      {activeSectionsWithItems.map(({ section, items }, i) => {
        // Place banners cleanly after first and subsequent active carousels
        const bannerRank = i === 0 ? "A" : i === 2 ? "B" : i === 4 ? "C" : null;

        return (
          <React.Fragment key={section.tagline}>
            <PopularDestinationCarousel
              tagline={section.tagline}
              tabs={popularTrends?.[0]?.tabs || undefined}
              type={type}
              items={items}
              isLoading={isLoading}
              icon={<MapPin className="h-3 w-3 shrink-0" />}
            />

            {/* Ranked Banner between active carousels */}
            {bannerRank && (
              <RankedBanner rank={bannerRank} entityType="hotel" />
            )}
          </React.Fragment>
        );
      })}

      {!isLoading && activeSectionsWithItems.length === 1 && (
        <RankedBanner rank="B" entityType="hotel" />
      )}

      {error && (
        <p className="text-red-500 text-center">Failed to load hotels: {error.message}</p>
      )}
    </FrameColursals>
  );
};

export default MainFramePage;