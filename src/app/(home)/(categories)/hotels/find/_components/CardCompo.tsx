
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React, { useState, useCallback } from "react";
import { StarRating } from "@/app/(home)/(categories)/_componentsRoot_categories/star-rating";
import { useRouter } from "next/navigation";
import { LikeIcon } from "@/services/dailyfunctions";
import { MapPin, Users, Moon, CheckCircle2, ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

function ImageOverlay({ slides, initialIndex, onClose }: { slides: { url: string }[]; initialIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(initialIndex);
  const prev = useCallback(() => setIdx((i) => (i === 0 ? slides.length - 1 : i - 1)), [slides.length]);
  const next = useCallback(() => setIdx((i) => (i === slides.length - 1 ? 0 : i + 1)), [slides.length]);
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); onClose(); }}>
      <button className="absolute top-4 right-4 text-white/80 hover:text-white z-10" onClick={(e) => { e.stopPropagation(); onClose(); }}><X className="h-7 w-7" /></button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-2 z-10" onClick={(e) => { e.stopPropagation(); prev(); }}><ChevronLeft className="h-6 w-6 text-white" /></button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur rounded-full p-2 z-10" onClick={(e) => { e.stopPropagation(); next(); }}><ChevronRight className="h-6 w-6 text-white" /></button>
      <img src={slides[idx]?.url} alt="" className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => <span key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }} className={cn("h-2 rounded-full cursor-pointer transition-all", i === idx ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60")} />)}
      </div>
      <span className="absolute top-4 left-4 text-white/70 text-sm font-medium">{idx + 1} / {slides.length}</span>
    </div>
  );
}

type HotelCardProps = {
  hotelId: string;
  image: string;
  hotelImages?: { url: string }[];
  title: string;
  location: string;
  tag?: string;
  rating: number;
  reviews: {
    text: string;
    count: number;
  };
  roomInfo: string;
  oldPrice?: string;
  price: string;
  favourite?: boolean;
  discount: string;
  nights?: number;
  stars: number;
  adults?: number;
  wrap?: boolean;
  amenities?: string[];
  left?: number;
};
import NProgress from "nprogress";
import { ImagePreview } from "@/app/(personal)/profile/_components/image-preview";
import { RouterPush } from "@/components/RouterPush";
export const HotelCard = ({
  hotelId,
  left,
  amenities,
  stars,
  favourite,
  wrap,
  image,
  hotelImages,
  title,
  location,
  tag,
  rating,
  reviews,
  roomInfo,
  oldPrice,
  price,
  discount,
  nights = 1,
  adults = 1,
}: HotelCardProps) => {
  const navigate = useRouter();
  const isMobile = useIsMobile();
  const [imgIdx, setImgIdx] = useState(0);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const slides = hotelImages && hotelImages.length > 0 ? hotelImages : [{ url: image }];
  const prevImg = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setImgIdx((i) => (i === 0 ? slides.length - 1 : i - 1)); }, [slides.length]);
  const nextImg = useCallback((e: React.MouseEvent) => { e.stopPropagation(); setImgIdx((i) => (i === slides.length - 1 ? 0 : i + 1)); }, [slides.length]);

  // Desktop horizontal view logic
  const isHorizontal = !isMobile && !wrap;

  if (isMobile) {
    // --- Optimized Compact Mobile View ---
    return (
      <Card className="group overflow-hidden rounded-xl border bg-card w-full shadow-md pt-0 " onClick={() => RouterPush(navigate, `/hotels/${hotelId}`)}>
        <div className="relative w-full h-[180px] group/slider">
          <img
            src={slides[imgIdx]?.url || "/hotels/hotel-temp.png"}
            alt={title}
            onClick={(e) => {
              e.stopPropagation();
              setOverlayOpen(true)
            }}
            className="h-full w-full object-cover rounded-t-xl transition-opacity duration-300 cursor-zoom-in"
          />
          {slides.length > 1 && (
            <>
              <button onClick={prevImg} className="absolute left-1.5 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow opacity-100 z-10"><ChevronLeft className="h-4 w-4" /></button>
              <button onClick={nextImg} className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow opacity-100 z-10"><ChevronRight className="h-4 w-4" /></button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {slides.map((_, i) => <span key={i} className={cn("h-1.5 rounded-full transition-all", i === imgIdx ? "w-4 bg-white" : "w-1.5 bg-white/50")} />)}
              </div>
            </>
          )}
          {tag && (
            <div className="absolute left-2.5 top-2.5 bg-green-600 text-white rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase shadow-sm">
              {tag}
            </div>
          )}
        </div>
        {overlayOpen && <ImageOverlay slides={slides} initialIndex={imgIdx} onClose={() => setOverlayOpen(false)} />}


        {/* Optimized Compact Content Section */}
        <CardContent className="p-3.5 flex flex-col gap-2">
          {/* Header Row: Title and Stars */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-start gap-1">
              <h3
                className="text-base font-bold leading-tight cursor-pointer line-clamp-1"
                onClick={() => RouterPush(navigate, `/hotels/${hotelId}`)}
              >
                {title}
              </h3>
              <div className="flex shrink-0 gap-0.5 pt-1">
                <StarRating rating={stars} className="h-3 w-3" />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{location}</span>
            </div>
          </div>

          {/* Rating Block & Review Count */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-xs font-bold text-primary">{reviews.text}</span>
              <span className="text-[10px] text-muted-foreground">{
                // reviews.count
                Math.floor(Math.random() * 10) + 10
              } reviews</span>
            </div>
            <div className="bg-primary text-white font-black h-8 w-8 flex items-center justify-center rounded-lg rounded-bl-none text-sm shadow-inner">
              {rating.toFixed(1)}
            </div>
          </div>

          {/* Room Description - Compact */}
          <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">
            {roomInfo}
          </p>

          {/* Compact Amenities - up to 3 for mobile */}
          {amenities && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {amenities.slice(0, 3).map((item, idx) => (
                <div key={idx} className="flex items-center gap-1 text-[10px] font-medium text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 px-1.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-2.5 h-2.5 text-green-500" />
                  {item}
                </div>
              ))}
              {amenities.length > 3 && (
                <span className="text-[9px] text-muted-foreground self-center">+{amenities.length - 3}</span>
              )}
            </div>
          )}

          {/* Pricing Area - Compact */}
          <div className="pt-3 border-t flex flex-col gap-1.5">
            {left && (
              <div className="inline-block bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100 self-start">
                Only {left} left at this price!
              </div>
            )}
            <div className="flex flex-row items-end justify-between">
              <div className="flex flex-col items-start gap-1">
                <div className="flex items-center gap-2.5 text-[10px] font-medium text-zinc-500">
                  <span className="flex items-center gap-1"><Moon size={12} /> {nights}N</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {adults}A</span>
                </div>
                <p className="text-[10px] text-muted-foreground leading-none">+ taxes & fees</p>
              </div>

              <div className="text-right flex flex-col items-end">
                {discount && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[10px] px-1.5 py-0 mb-1 rounded">
                    {discount} OFF
                  </Badge>
                )}
                {oldPrice && (
                  <span className="text-xs text-muted-foreground line-through opacity-70 mb-0.5">
                    {oldPrice}
                  </span>
                )}
                <span className="text-xl font-black text-foreground leading-none">{price}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // --- Laptop/Desktop View (Flexible List or Grid) ---
  return (
    <Card onClick={() => RouterPush(navigate, `/hotels/${hotelId}`)}
      className={cn(
        "group overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:shadow-lg ",
        isHorizontal ? "flex flex-row w-full min-h-[260px]" : "flex flex-col w-full"
      )}
    >
      {/* Image Container */}
      <div
        className={cn(
          "relative group/slider",
          isHorizontal ? "w-[250px] shrink-0" : "w-full h-[200px]"
        )}
      >
        <img
          src={slides[imgIdx]?.url || image}
          alt={title}
          onClick={(e) => {
            e.stopPropagation();

            setOverlayOpen(!overlayOpen)
          }}
          className="h-full w-full aspect-video rounded-md object-cover transition-opacity duration-300 cursor-zoom-in"
        />
        {slides.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity z-10"><ChevronLeft className="h-4 w-4" /></button>
            <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow opacity-100 md:opacity-0 md:group-hover/slider:opacity-100 transition-opacity z-10"><ChevronRight className="h-4 w-4" /></button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {slides.map((_, i) => <span key={i} className={cn("h-1.5 rounded-full transition-all", i === imgIdx ? "w-4 bg-white" : "w-1.5 bg-white/50")} />)}
            </div>
          </>
        )}
        {tag && (
          <div className="absolute left-3 top-3 bg-green-600 text-white rounded-lg px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase shadow-md">
            {tag}
          </div>
        )}
      </div>


      {/* Content Container */}
      <CardContent className={cn("p-5 flex flex-col flex-1 gap-3", isHorizontal ? "justify-between" : "")}>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Info Side */}
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <h3
                className="text-xl font-bold leading-tight cursor-pointer hover:text-primary transition-colors line-clamp-1"
                onClick={() => {
                  RouterPush(navigate, `/hotels/${hotelId}`)

                }}
              >
                {title}
              </h3>
              <div className="flex shrink-0">
                <StarRating rating={stars} className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-" />
              <span className="underline underline-offset-2 decoration-dotted">{location}</span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 max-w-[500px]">
              {roomInfo}
            </p>

            {/* Amenities - Trimmed to 5 */}
            {amenities && (
              <div className="flex flex-wrap gap-2 pt-1">
                {amenities.slice(0, 5).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-[11px] font-medium text-zinc-600 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    {item}
                  </div>
                ))}
                {amenities.length > 5 && (
                  <span className="text-[10px] text-muted-foreground self-center">+{amenities.length - 5} more</span>
                )}
              </div>
            )}
          </div>

          {/* Rating & Review Side (Right side on Desktop List) */}
          <div className={cn("flex items-center md:items-end gap-3 shrink-0", isHorizontal ? "flex-col justify-start" : "flex-row")}>
            <div className={cn("text-right hidden md:block", isHorizontal ? "text-right" : "text-left")}>
              <p className="font-bold text-primary leading-none">{reviews.text}</p>
              <p className="text-xs text-muted-foreground">{
                // reviews.count
                Math.floor(Math.random() * 10) + 10


              } reviews</p>
            </div>
            <div className="bg-primary text-white font-bold h-10 w-10 flex items-center justify-center rounded-lg rounded-bl-none text-lg shadow-sm">
              {rating.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Pricing Area */}
        <div className="pt-4 border-t flex flex-row items-end justify-between">
          <div className="space-y-1">
            {left && (
              <div className="inline-block bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded border border-red-100 mb-1">
                Only {left} left at this price
              </div>
            )}
            <div className="flex items-center gap-3 text-xs font-medium text-zinc-500">
              <span className="flex items-center gap-1"><Moon size={14} /> {nights} Nights</span>
              <span className="flex items-center gap-1"><Users size={14} /> {adults} Adults</span>
            </div>
          </div>

          <div className="text-right">
            {discount && (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none text-[11px] mb-1">
                {discount} OFF
              </Badge>
            )}
            <div className="flex flex-col">
              {oldPrice && (
                <span className="text-sm text-muted-foreground line-through opacity-70">
                  {oldPrice}
                </span>
              )}
              <div className="flex items-baseline justify-end gap-1">
                <span className="text-2xl font-black text-foreground">{price}</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-none mt-1">+ taxes & fees</p>
            </div>
          </div>
        </div>
      </CardContent>
      {overlayOpen && <ImageOverlay slides={slides} initialIndex={imgIdx} onClose={() => setOverlayOpen(false)} />}
    </Card>
  );
}

export const HotelCardSkeleton = ({ wrap = false }: { wrap?: boolean }) => {
  const isMobile = useIsMobile();
  const isHorizontal = !isMobile && !wrap;

  if (isMobile) {
    return (
      <Card className="group overflow-hidden rounded-xl border bg-card w-full shadow-md pt-0">
        <Skeleton className="w-full h-[180px] rounded-t-xl rounded-b-none" />
        <CardContent className="p-3.5 flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-start gap-1">
              <Skeleton className="h-5 w-2/3" />
              <div className="flex shrink-0 gap-0.5 pt-1">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-3 w-3 rounded-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-3 w-1/3 mt-0.5" />
          </div>
          <div className="flex items-center justify-between gap-3 pt-1">
            <div className="flex flex-col items-start gap-1 w-20">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-8 w-8 rounded-lg rounded-bl-none" />
          </div>
          <Skeleton className="h-8 w-full mt-1" />
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Skeleton className="h-4 w-16 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-4 w-14 rounded-full" />
          </div>
          <div className="pt-3 border-t flex flex-col gap-1.5 mt-1">
            <div className="flex flex-row items-end justify-between">
              <div className="flex flex-col items-start gap-1 w-24">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="text-right flex flex-col items-end gap-1">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-3 w-8" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "group overflow-hidden rounded-2xl border bg-card transition-all duration-300",
        isHorizontal ? "flex flex-row w-full min-h-[260px]" : "flex flex-col w-full min-h-[400px]"
      )}
    >
      <Skeleton
        className={cn(
          "shrink-0",
          isHorizontal ? "w-[250px] h-full rounded-l-2xl rounded-r-none" : "w-full h-[200px] rounded-t-2xl rounded-b-none"
        )}
      />
      <CardContent className={cn("p-5 flex flex-col flex-1 gap-3", isHorizontal ? "justify-between" : "")}>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-6 w-[60%]" />
              <div className="flex shrink-0 gap-1 hidden md:flex">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-3 w-3 rounded-full" />
                ))}
              </div>
            </div>
            <Skeleton className="h-4 w-1/3" />
            <div className="space-y-1.5 mt-4">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-[80%]" />
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
          </div>
          <div className={cn("flex items-center md:items-end gap-3 shrink-0", isHorizontal ? "flex-col justify-start" : "flex-row")}>
            <div className={cn("flex flex-col gap-1.5 hidden md:flex", isHorizontal ? "items-end" : "items-start")}>
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
            <Skeleton className="h-10 w-10 rounded-lg rounded-bl-none" />
          </div>
        </div>
        <div className="pt-4 border-t flex flex-row items-end justify-between mt-2">
          <div className="space-y-2 w-32">
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};