"use client";
import React, { useState, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import { AcordionItemType } from "@/constants/filter-constants";
import { cn } from "@/lib/utils";
import { HotelContext } from "@/context/hotel/HotelContextProvider";
import { MapPin, Compass } from "lucide-react";
// Dynamically import MapLeaf with SSR disabled
const MapLeaf = dynamic(() => import("@/components/map/leaf-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[160px] rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse flex items-center justify-center">
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
        <MapPin className="w-4 h-4 text-emerald-500 animate-bounce" />
        <span>Loading map...</span>
      </div>
    </div>
  ),
});

import { useRouter, useSearchParams } from "next/navigation";

export const SideBarFilter = ({
  mapSrc,
  alt = "map preview",
  items,
  overlayTitle = "See Location on Map",
  className,
}: {
  mapSrc?: string;
  alt?: string;
  overlayTitle?: string;
  className?: string;
  items: AcordionItemType[];
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hotelCtx = useContext(HotelContext);
  const destinationHotels = hotelCtx?.hotels || [];

  const handleOpenFullMap = (mode?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("map-open", "true");
    if (mode) {
      params.set("mode", mode);
    }
    router.push(`/hotels/find?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-2 p-1 xl:min-w-[270px] w-full">
      <div className="relative group">
        <div
          onClick={() => handleOpenFullMap()}
          className={cn(
            "relative w-full h-40 rounded-xl overflow-hidden group cursor-pointer border border-border shadow-sm hover:shadow-md transition-all duration-300",
            className,
          )}
        >
          {/* Live Leaflet Map Preview */}
          <div className="absolute inset-0 w-full h-full pointer-events-none brightness-90 contrast-[1.05] transition-transform duration-500 group-hover:scale-105">
            <MapLeaf
              height="100%"
              width="100%"
              hotels={destinationHotels}
              interactive={false}
              zoom={12}
            />
          </div>

          {/* Gradient Mask & Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/55 transition-colors duration-300 backdrop-blur-[1px] p-3 text-center">
            <span className="flex items-center gap-1.5 text-white text-xs sm:text-sm font-semibold tracking-wide px-3.5 py-1.5 border border-white/40 rounded-xl bg-black/50 backdrop-blur-md shadow-xl group-hover:bg-zinc-900 group-hover:border-zinc-700 group-hover:scale-105 transition-all">
              <MapPin className="w-3.5 h-3.5 text-white/90" />
              {overlayTitle}
            </span>

            <span className="text-[10px] text-white/80 font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to open full page map
            </span>
          </div>
        </div>

        {/* Quick Action Button */}
        <button
          type="button"
          onClick={() => handleOpenFullMap()}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 active:scale-[0.99] text-white dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900 text-xs font-semibold shadow-sm transition-all cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600" />
          <span>Explore Stays on Full Map</span>
        </button>
      </div>

      <FilterAccordion items={items} />
      <div className="w-full h-[50px]"></div>
    </div>
  );
};

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useNuqsContext } from "@/context/NuqsContentProvider";

export function FilterAccordion({ items }: { items: AcordionItemType[] }) {
  const { setFilters } = useNuqsContext();
  const [openValues, setOpenValues] = React.useState<string[]>([]);

  const handleClear = () => {
    setFilters({
      price: null,
      typeOfPlace: null,
      Bedrooms: null,
      Beds: null,
      Bathrooms: null,
      roomSize: null,
      distance: null,
      amenities: null,
      essentials: null,
      features: null,
      onsite: null,
      roomsbeds: null,
      location: null,
      classification: null,
      score: null,
    } as any);
    setOpenValues([]);
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border bg-zinc-50 dark:bg-zinc-900">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <p className="text-sm font-medium">Filter by</p>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          Clear
        </Button>
      </div>

      <Accordion
        type="multiple"
        value={openValues}
        onValueChange={setOpenValues}
      >
        {items.map((item) => (
          <AccordionItem value={item.value} key={item.value}>
            <AccordionTrigger className="px-4">{item.trigger}</AccordionTrigger>
            <AccordionContent className="px-4">{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
