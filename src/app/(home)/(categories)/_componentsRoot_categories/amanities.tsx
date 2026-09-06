
"use client";

import { amenityIconMap } from "@/components/ui/icons";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { formatLabel } from "@/components/side-bar-filter/pillGroup";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  amenities: string[];
  title?: string;
};

const AmenitiesValues = ({ amenities = [], title = "Amenities" }: Props) => {
  const [showAll, setShowAll] = useState(false);

  const hasMore = amenities.length > 15;
  const displayedAmenities = hasMore && !showAll ? amenities.slice(0, 15) : amenities;

  return (
    <Card className="w-full bg-transparent border-none shadow-none p-0 gap-2 py-2 ">
      {title && (
        <CardHeader className="px-0 ">
          <h3 className="text-xl font-bold dark:text-zinc-400 text-zinc-800">{title}</h3>
        </CardHeader>
      )}
      <CardContent className="flex flex-wrap gap-4 p-0 items-center">
        {displayedAmenities.map((amenity) => {
          const iconKey = amenity.toLowerCase().replace(/\s+/g, "_");
          const Icon = amenityIconMap[iconKey] || amenityIconMap["breakfast"];

          return (
            <div
              key={amenity}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm dark:bg-muted bg-gray-200 px-2 py-1 sm:px-4 sm:py-2 rounded-full cursor-default"
            >
              {Icon && title === "Amenities" && <Icon className="h-3 w-3 sm:h-4 sm:w-4" />}
              <span>{formatLabel(amenity.charAt(0).toUpperCase() + amenity.slice(1))}</span>
            </div>
          );
        })}

        {hasMore && (
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-all active:scale-95 cursor-pointer shadow-sm"
          >
            <span>{showAll ? "View Less" : `Show More (+${amenities.length - 15})`}</span>
            {showAll ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default AmenitiesValues;