"use client";

import React, { useState, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronRight, X, Sparkles, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { amenityIconMap } from "@/components/ui/icons";
import { formatLabel } from "@/components/side-bar-filter/pillGroup";
import { cn } from "@/lib/utils";

type Props = {
  amenities: string[];
  title?: string;
  hotelName?: string;
  className?: string;
};

const AmenitiesValues = ({
  amenities = [],
  title = "Amenities",
  hotelName,
  className,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  const isOpen =
    searchParams.get("amenities") === "true" ||
    searchParams.get("features") === "true";

  const handleOpen = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("amenities", "true");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleClose = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("amenities");
    params.delete("features");
    const qs = params.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    setSearchTerm("");
  };

  const previewLimit = 8;
  const previewAmenities = amenities.slice(0, previewLimit);
  const hasMore = amenities.length > previewLimit;

  const filteredAmenities = useMemo(() => {
    if (!searchTerm.trim()) return amenities;
    const term = searchTerm.toLowerCase();
    return amenities.filter((a) =>
      formatLabel(a).toLowerCase().includes(term) || a.toLowerCase().includes(term)
    );
  }, [amenities, searchTerm]);

  const formattedTitle = title
    ? title.charAt(0).toUpperCase() + title.slice(1)
    : "";

  if (!amenities || amenities.length === 0) return null;

  return (
    <div className={cn("space-y-2", className)}>
      {formattedTitle && (
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold capitalize dark:text-zinc-400 text-zinc-800">
            {formattedTitle}
          </h3>
        </div>
      )}

      {/* 2-3 lines preview on the page */}
      <div className="flex flex-wrap gap-2 items-center">
        {previewAmenities.map((amenity) => {
          const iconKey = amenity.toLowerCase().replace(/\s+/g, "_");
          const Icon = amenityIconMap[iconKey] || amenityIconMap["breakfast"];

          return (
            <div
              key={amenity}
              className="inline-flex items-center gap-1.5 text-xs dark:bg-muted bg-gray-100 dark:text-zinc-200 text-zinc-800 px-2.5 py-1 rounded-full border border-border/50 cursor-default"
            >
              {Icon && <Icon className="h-3 w-3 text-muted-foreground shrink-0" />}
              <span className="truncate max-w-[140px]">
                {formatLabel(amenity.charAt(0).toUpperCase() + amenity.slice(1))}
              </span>
            </div>
          );
        })}
      </div>

      {/* Show full button */}
      <div>
        <button
          type="button"
          onClick={handleOpen}
          className="group inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-foreground hover:text-primary dark:hover:text-primary underline underline-offset-4 decoration-zinc-400 hover:decoration-primary transition-all cursor-pointer mt-1"
        >
          <span>
            {hasMore ? `Show full (${amenities.length} items)` : "Show full"}
          </span>
          <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Full Dialog synced with ?amenities=true */}
      <DialogPrimitive.Root
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) handleClose();
        }}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200" />
          <DialogPrimitive.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200] w-[calc(100%-1rem)] max-w-xl max-h-[88vh] rounded-2xl bg-background border border-border shadow-2xl flex flex-col overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-200 outline-none">
            {/* Header: compact padding <= 3, text xs/sm */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-background/95 backdrop-blur-sm shrink-0">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <DialogPrimitive.Title className="text-xs sm:text-sm font-bold text-foreground">
                  {title || "All Features & Amenities"}
                </DialogPrimitive.Title>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                  {amenities.length}
                </span>
              </div>

              <DialogPrimitive.Close
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </DialogPrimitive.Close>
            </div>

            <DialogPrimitive.Description className="sr-only">
              Complete list of features and amenities {hotelName ? `for ${hotelName}` : ""}
            </DialogPrimitive.Description>

            {/* Search Bar: compact padding <= 3, text xs */}
            {amenities.length > 6 && (
              <div className="px-3 pt-2.5 shrink-0">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search features..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-muted/40 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Scrollable Grid Body: padding <= 3, text xs */}
            <div className="flex-1 overflow-y-auto px-3 py-3">
              {filteredAmenities.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground text-xs">
                  No items found matching &ldquo;{searchTerm}&rdquo;
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {filteredAmenities.map((amenity) => {
                    const iconKey = amenity.toLowerCase().replace(/\s+/g, "_");
                    const Icon =
                      amenityIconMap[iconKey] || amenityIconMap["breakfast"];

                    return (
                      <div
                        key={amenity}
                        className="flex items-center gap-2 p-2 rounded-xl border border-border/70 bg-muted/20 hover:bg-muted/50 transition-colors"
                      >
                        <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          {Icon && <Icon className="h-3.5 w-3.5" />}
                        </div>
                        <span className="text-xs font-medium text-foreground truncate">
                          {formatLabel(
                            amenity.charAt(0).toUpperCase() + amenity.slice(1)
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer: compact padding <= 3 */}
            <div className="px-3 py-2 border-t border-border bg-muted/20 flex justify-end shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleClose}
                className="h-7 px-3 text-xs rounded-lg font-semibold"
              >
                Close
              </Button>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  );
};

export default AmenitiesValues;