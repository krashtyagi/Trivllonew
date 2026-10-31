"use client";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { PopularDestinationCarousel } from "../carousel/tabs-carousel";
import { useGetNewHotels } from "@/services/hotel/querys";
import type { Item } from "../carousel/onlyColursel";
import {
  hoteldata,
  HotelFramePageProps,
} from "@/app/(home)/(categories)/hotels/page";
import { MapPin } from "lucide-react";
import FrameColursals from "./frame_coloursals";
import RankedBanner from "../addimage/RankedBanner";

type SectionConfig = {
  tagline: string;
  city: string;
  limit?: number;
  aliases?: string[];
};

// Known localities / sub-areas mapped to their parent city
const LOCALITY_TO_CITY: Record<string, string> = {
  // Shimla
  sanjauli: "shimla",
  kufri: "shimla",
  mashobra: "shimla",
  "chotta shimla": "shimla",
  shoghi: "shimla",
  "summer hill": "shimla",
  dhalli: "shimla",
  jakhoo: "shimla",
  totu: "shimla",
  boileauganj: "shimla",
  kasumpti: "shimla",
  bhattakufer: "shimla",
  chakrayal: "shimla",
  "new shimla": "shimla",
  "lakkar bazar": "shimla",

  // Manali
  siyal: "manali",
  simsa: "manali",
  vashisht: "manali",
  solang: "manali",
  "solang valley": "manali",
  naggar: "manali",
  prini: "manali",
  aleo: "manali",
  "old manali": "manali",

  // Goa
  "south goa": "goa",
  "north goa": "goa",
  calangute: "goa",
  candolim: "goa",
  baga: "goa",
  anjuna: "goa",
  panaji: "goa",
  panjim: "goa",
  vasco: "goa",
  morjim: "goa",
  arambol: "goa",
  colva: "goa",
  benaulim: "goa",
  vagator: "goa",
  mapusa: "goa",
  margao: "goa",

  // Rishikesh
  tapovan: "rishikesh",
  shivpuri: "rishikesh",
  "laxman jhula": "rishikesh",
  "ram jhula": "rishikesh",

  // Srinagar
  "dal lake": "srinagar",
  "lal chowk": "srinagar",
  dalgate: "srinagar",
  nishat: "srinagar",
  shalimar: "srinagar",
  rajbagh: "srinagar",

  // Bengaluru
  bangalore: "bengaluru",
  whitefield: "bengaluru",
  koramangala: "bengaluru",
  indiranagar: "bengaluru",
  "electronic city": "bengaluru",

  // Mumbai
  "navi mumbai": "mumbai",
  thane: "mumbai",
  andheri: "mumbai",
  bandra: "mumbai",
  juhu: "mumbai",
  colaba: "mumbai",

  // Delhi
  "new delhi": "delhi",
  "delhi ncr": "delhi",
  "south delhi": "delhi",
  dwarka: "delhi",
  rohini: "delhi",
};

const POPULAR_SECTIONS: SectionConfig[] = [
  {
    tagline: "Popular Stays in Manali",
    city: "Manali",
    aliases: ["Siyal", "Simsa", "Old Manali", "Solang", "Vashisht", "Aleo"],
  },
  {
    tagline: "Popular Stays in Shimla",
    city: "Shimla",
    aliases: ["Sanjauli", "Kufri", "Mashobra", "Chotta Shimla", "Bhattakufer"],
  },
  {
    tagline: "Popular Stays in Srinagar",
    city: "Srinagar",
    aliases: ["Dal Lake", "Lal Chowk", "Dalgate", "Nishat"],
  },
  { tagline: "Luxury in Indore", city: "Indore" },

  {
    tagline: "Popular Homes In South Goa",
    city: "Goa",
    aliases: ["South Goa", "North Goa", "Calangute", "Candolim", "Baga", "Anjuna", "Panaji"],
  },
  {
    tagline: "Best in Delhi",
    city: "Delhi",
    aliases: ["New Delhi", "Delhi NCR", "South Delhi", "Dwarka"],
  },
  {
    tagline: "Popular Stays In Bengaluru",
    city: "Bengaluru",
    aliases: ["Bangalore", "Whitefield", "Koramangala", "Indiranagar"],
  },
  {
    tagline: "Popular Homes In Rishikesh",
    city: "Rishikesh",
    aliases: ["Tapovan", "Laxman Jhula", "Ram Jhula", "Shivpuri"],
  },
  {
    tagline: "Luxury in Mumbai",
    city: "Mumbai",
    aliases: ["Navi Mumbai", "Thane", "Andheri", "Bandra", "Juhu", "Colaba"],
  },
  { tagline: "Stays in Gwalior", city: "Gwalior" },

  { tagline: "Villas & Resorts in Udaipur", city: "Udaipur" },
  { tagline: "Stays in Jaipur", city: "Jaipur" },
  {
    tagline: "Luxury Rentals in Lonavala",
    city: "Lonavala",
    aliases: ["Khandala"],
  },

  { tagline: "Heritage Homes in Mysore", city: "Mysore" },
  { tagline: "Coastal Villas in Kochi", city: "Kochi" },
  { tagline: "Hospitality Hub of Hyderabad", city: "Hyderabad" },
  { tagline: "Beachfront Stays in Pondicherry", city: "Pondicherry" },
  { tagline: "Villas in Alibaug", city: "Alibaug" },
];

const escapeRegex = (str: string) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const matchesText = (haystack: string, needle: string): boolean => {
  const h = haystack.toLowerCase().trim();
  const n = needle.toLowerCase().trim();
  if (!h || !n) return false;
  if (h === n) return true;

  // Word/delimiter boundary match
  const regex = new RegExp(`(?:^|[\\s,/-])${escapeRegex(n)}(?:$|[\\s,/-])`, "i");
  if (regex.test(h)) return true;

  // Reverse match (e.g. section "South Goa" vs hotel city "Goa")
  const revRegex = new RegExp(`(?:^|[\\s,/-])${escapeRegex(h)}(?:$|[\\s,/-])`, "i");
  if (revRegex.test(n)) return true;

  return false;
};

const matchesSectionCity = (
  hotel: hoteldata,
  section: SectionConfig,
): boolean => {
  const targetCity = section.city.toLowerCase().trim();
  const aliases = (section.aliases || []).map((a) => a.toLowerCase().trim());

  // Extract all searchable location texts from hotel
  const locationStrings: string[] = [
    hotel.city,
    (hotel as any).address?.city,
    (hotel as any).address?.areaName,
    (hotel as any).address?.district,
    (hotel as any).address?.formattedAddress,
    (hotel as any).address?.streetAddress,
    (hotel as any).address?.landmark,
  ].filter((s): s is string => typeof s === "string" && s.trim().length > 0);

  for (const locStr of locationStrings) {
    // 1. Direct or word-boundary match with section city
    if (matchesText(locStr, targetCity)) return true;

    // 2. Direct or word-boundary match with explicit aliases
    for (const alias of aliases) {
      if (matchesText(locStr, alias)) return true;
    }

    // 3. Token-based locality dictionary lookup
    const tokens = locStr
      .toLowerCase()
      .split(/[,/-]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    for (const token of tokens) {
      if (token === targetCity) return true;
      if (LOCALITY_TO_CITY[token] === targetCity) return true;
      if (aliases.includes(token)) return true;
    }

    // 4. Known localities check within location string
    for (const [locality, parentCity] of Object.entries(LOCALITY_TO_CITY)) {
      if (parentCity === targetCity) {
        const locRegex = new RegExp(
          `(?:^|[\\s,/-])${escapeRegex(locality)}(?:$|[\\s,/-])`,
          "i",
        );
        if (locRegex.test(locStr)) return true;
      }
    }
  }

  return false;
};

// Banner positions: after index 2, 5, 8 (gap of ~3 carousels between banners)
const BANNER_POSITIONS: Record<number, "A" | "B" | "C"> = {
  2: "A",
  5: "B",
  8: "C",
};

const MainFramePage = ({
  className,
  type,
  popularTrends,
}: HotelFramePageProps) => {
  const { data, isLoading, error } = useGetNewHotels();

  const activeSectionsWithItems = useMemo(() => {
    if (isLoading) {
      // Render 2 clean skeleton carousels while loading
      return POPULAR_SECTIONS.slice(0, 2).map((section) => ({
        section,
        items: [] as Item[],
      }));
    }

    const allHotels: hoteldata[] = data?.data || [];

    return POPULAR_SECTIONS.map((section) => {
      const hotelsInCity = allHotels.filter((hotel) =>
        matchesSectionCity(hotel, section),
      );

      const sliced = section.limit
        ? hotelsInCity.slice(0, section.limit)
        : hotelsInCity;

      const items: Item[] = sliced.map(
        (hotel: hoteldata): Item => ({
          id: hotel._id,
          _id: hotel._id,
          title: hotel.name,
          location: `${hotel.city}, ${hotel.country || "India"}`,
          image: hotel.image,
          href: `/hotels/${hotel._id}`,
          price: hotel.startingPrice ?? null,
          rating: (hotel as any).rating,
          numReviews: (hotel as any).numReviews,
          amenities: (hotel as any).amenities,
          isFavorite: (hotel as any).isFavorite,
        }),
      );
      return { section, items };
    }).filter(({ items }) => items.length > 0);
  }, [isLoading, data?.data]);

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
        <p className="text-red-500 text-center">
          Failed to load hotels: {error.message}
        </p>
      )}
    </FrameColursals>
  );
};

export default MainFramePage;
