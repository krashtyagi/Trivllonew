'use client'
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { PopularDestinationCarousel } from "../carousel/tabs-carousel";
import { ImagesSliderDemo } from "../addimage/middle-ads-image";
import { useGetNewHotels } from "@/services/hotel/querys";
import type { Item } from "../carousel/onlyColursel";
import { hoteldata, HotelFramePageProps } from "@/app/(home)/(categories)/hotels/page";
import { MapPin } from "lucide-react";
import FrameColursals from "./frame_coloursals";

// No tabs in this design → so we pass tabs={undefined}
type SectionConfig = {
  tagline: string;
  city: string;
  limit?: number;
};

const POPULAR_SECTIONS: SectionConfig[] = [
  { tagline: "Luxury in Indore", city: "Indore" },
  { tagline: "Popular Homes In South Goa", city: "Goa" },
  { tagline: "Best in Delhi", city: "Delhi" },
  { tagline: "Popular Stays In Bengaluru", city: "Bengaluru" },
  { tagline: "Popular Homes In Rishikesh", city: "Rishikesh" },
  { tagline: "Luxury in Mumbai", city: "Mumbai" },

  { tagline: "Villas & Resorts in Udaipur", city: "Udaipur" },
  { tagline: "Stays in Jaipur", city: "Jaipur" },
  { tagline: "Luxury Rentals in Lonavala", city: "Lonavala" },
  { tagline: "Popular Stays in Manali", city: "Manali" },
  { tagline: "Heritage Homes in Mysore", city: "Mysore" },
  { tagline: "Coastal Villas in Kochi", city: "Kochi" },
  { tagline: "Stays in Shimla", city: "Shimla" },
  { tagline: "Hospitality Hub of Hyderabad", city: "Hyderabad" },
  { tagline: "Beachfront Stays in Pondicherry", city: "Pondicherry" },
  { tagline: "Villas in Alibaug", city: "Alibaug" },
];

const MainFramePage = ({ className, type, popularTrends }: HotelFramePageProps) => {
  const { data, isLoading, error } = useGetNewHotels();


  // 1. Group once (optional but efficient if many sections)
  const groupedByCity = useMemo(() => {
    if (!data?.data) return {};

    return data.data.reduce((acc: Record<string, hoteldata[]>, hotel: hoteldata) => {
      const city = hotel.city?.trim();
      if (!city) return acc;
      acc[city] = acc[city] || [];
      acc[city].push(hotel);
      return acc;
    }, {} as Record<string, hoteldata[]>);
  }, [data?.data]);
  // let allciti =
  // 2. Prepare carousel items for each section
  const sectionItems = useMemo(() => {
    return POPULAR_SECTIONS.map((section) => {
      const hotelsInCity = groupedByCity[section.city] || [];

      // Optional: sort by some criteria (e.g. newest first if _id is chronological)
      // hotelsInCity.sort((a, b) => b._id.localeCompare(a._id)); 

      const sliced = section.limit ? hotelsInCity.slice(0, section.limit) : hotelsInCity;

      return sliced.map((hotel: hoteldata): Item => ({
        title: hotel.name,
        location: `${hotel.city}, India`,
        image: hotel.image,
        href: `/hotels/${hotel._id}`,
      }));
    });
  }, [groupedByCity]);

  return (
    <FrameColursals className={cn(className, " ")}>
      {POPULAR_SECTIONS.map((section, i) => {
        const items = sectionItems[i] || [];


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

            {i === 1 && (
              <div className="px-2 md:px-0 w-full">
                <ImagesSliderDemo images={[
                  '/hotels/img5.png',
                  '/hotels/img6.png',
                  '/hotels/img7.png',
                  '/hotels/img8.png',
                ]} title="Discover Asia" subtitle="Book now" description="Book your next adventure now" link="/hotels/find" />
              </div>
            )}
          </React.Fragment>
        );
      })}

      {error && (
        <p className="text-red-500 text-center">Failed to load hotels: {error.message}</p>
      )}
    </FrameColursals>
  );
};

export default MainFramePage;