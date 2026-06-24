
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { RouterPush } from "../RouterPush";
import { useHotelStore } from "@/store/hotel.store";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

export type Item = {
  title: string;
  location?: string;
  image: string | StaticImageData;
  href: string;
};

type Props = {
  type: "cabs" | "adventures" | "tours" | "bikes" | "hotels";
  tagline?: string;
  items: Item[];
  isLoading?: boolean;
  icon?: React.ReactNode;
};

export const OnlyCarousel = ({ type, tagline, items, isLoading, icon }: Props) => {
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const { setCity } = useHotelStore();

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (el) {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setCanLeft(scrollLeft > 5);
      setCanRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  }, []);

  // Shared logic to handle redirection for "See All"
  const handleSeeAll = () => {
    if (tagline) {
      // Extract city name from tagline (e.g., "Hotels in Indore" -> "indore")
      const lastWord = tagline.split(" ").pop() || "indore";
      setCity(lastWord.toLowerCase());
    }
    RouterPush(router, "/hotels/find");
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.addEventListener("resize", updateScrollButtons);
    };
  }, [items, updateScrollButtons]);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!isLoading && items.length === 0) return null;

  return (
    <div className="relative group bg-transparent max-w-screen">
      <div className="mb-4 flex items-center justify-between px-2 md:px-0 ">
        <h2 className="text-md md:text-xl capitalize flex gap-2 items-center text-nowrap truncate font-medium">
          {tagline}
        </h2>

        <div className="flex gap-2">
          <CarouselButton
            onClick={() => scroll("left")}
            disabled={!canLeft}
            icon={<ChevronLeft className="h-4 w-4" />}
          />
          <CarouselButton
            onClick={() => scroll("right")}
            disabled={!canRight}
            icon={<ChevronRight className="h-4 w-4" />}
          />
        </div>
      </div>

      <div
        ref={scrollRef}
        className={cn(
          "flex gap-1 md:gap-3 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide scroll-smooth pt-2 pr-3 ",
          isLoading && "pl-1"
        )}
      >
        {isLoading ? (
          Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-[170px] md:w-[216px] flex-none h-[165px] gap-1 flex flex-col md:h-[195px] rounded-xl"
            >
              <Skeleton className="aspect-video w-full" />
              <div className="mt-2.5 md:mt-3 space-y-1 px-1 flex flex-col gap-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))
        ) : (
          <>
            {items.map((item, i) => (
              <Card
                icon
                key={`${item.title}-${i}`}
                item={item}
                onClick={() => RouterPush(router, item.href)}
              />
            ))}

            <div className="w-[170px] md:w-[216px] flex-none snap-start cursor-pointer pl-1">
              <GalleryCard
                onClick={handleSeeAll}
                images={[
                  "/hotels/room1.png",
                  "/hotels/room2.png",
                  "/hotels/room3.png",
                ]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CarouselButton = ({ onClick, disabled, icon }: { onClick: () => void; disabled: boolean; icon: React.ReactNode }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={cn(
      "rounded-full border border-border bg-background p-2.5 shadow-sm transition-all",
      "hover:bg-accent hover:text-accent-foreground",
      "disabled:opacity-40 disabled:cursor-not-allowed"
    )}
  >
    {icon}
  </button>
);

const Card = React.memo(({ item, onClick, icon }: { item: Item, icon: React.ReactNode; onClick: () => void }) => {
  return (
    <div onClick={onClick} className="pl-1 w-[170px] md:w-[216px] flex-none snap-start cursor-pointer group/card">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-card border border-border shadow-sm max-h-[155px]">
        <Image
          width={220}
          height={155}
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover/card:scale-105"
        />
      </div>
      <div className="mt-2.5 md:mt-3 space-y-1 px-1">
        <h3 className="text-sm font-semibold line-clamp-1 text-card-foreground">{item.title}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          {item.location && <MapPin className="h-3 w-3 shrink-0" />}
          <span className="line-clamp-1 ">{item.location}</span>
        </div>
      </div>
    </div>
  );
});

interface GalleryCardProps {
  images: string[];
  label?: string;
  className?: string;
  onClick?: () => void;
}

export function GalleryCard({ images = [], label = "See all", className = "", onClick }: GalleryCardProps) {
  const displayImages = images.slice(0, 3);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-neutral-900/60 to-black/80",
        "shadow-sm transition-all hover:shadow-md hover:scale-[1.02]",
        "aspect-[4/3] w-full max-h-[155px]",
        className
      )}
      onClick={onClick}
    >
      <div className="relative h-full w-full">
        {displayImages[0] && (
          <Image src={displayImages[0]} alt="Background" fill className="object-cover blur-sm brightness-50" />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2 px-3">
          {displayImages.map((src, idx) => (
            <div
              key={idx}
              className="relative aspect-[4/5] w-[30%] overflow-hidden rounded-lg border border-white/20 shadow-md transition-transform duration-300 group-hover:scale-105"
              style={{ transform: `rotate(${idx === 0 ? "-8deg" : idx === 2 ? "8deg" : "0deg"})` }}
            >
              <Image src={src} alt={`Room view ${idx + 1}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span className="rounded-full bg-black/70 px-4 py-1 text-xs font-medium text-white backdrop-blur-md transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}