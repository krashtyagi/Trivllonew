"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Star,
  Building2,
  ChevronRight,
  ChevronLeft,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetRankedHotels } from "@/services/hotel/querys";
import { useGetRankedTourCompanies } from "@/services/tours/tours.queries";
import { RouterPush } from "../RouterPush";
import { optimizeCloudinaryUrl, IMAGE_PRESETS } from "@/lib/image-optimizer";

type RankedBannerProps = {
  rank: "A" | "B" | "C";
  entityType: "hotel" | "tour";
};

type BannerItem = {
  _id: string;
  name: string;
  city: string;
  image: string | null;
  rating?: number;
  numReviews?: number;
  description?: string;
};

const SLIDE_INTERVAL = 6000;
const PREFETCH_THRESHOLD = 8;
const PAGE_SIZE = 10;

const RANK_CONFIG = {
  A: {
    label: "Premium",
    badge:
      "bg-[#2e1d0c]/85 border-[#8c5e26]/60 text-[#f5c777] shadow-amber-500/10",
  },
  B: {
    label: "Recommended",
    badge:
      "bg-[#10243d]/85 border-[#3b82f6]/50 text-[#93c5fd] shadow-blue-500/10",
  },
  C: {
    label: "Featured",
    badge:
      "bg-[#0b291e]/85 border-[#10b981]/50 text-[#6ee7b7] shadow-emerald-500/10",
  },
} as const;

type RankConfigItem = (typeof RANK_CONFIG)[keyof typeof RANK_CONFIG];

function splitName(name: string) {
  if (!name) return { first: "Luxury", rest: "Experience" };
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return { first: parts[0], rest: "" };
  }
  return {
    first: parts[0],
    rest: parts.slice(1).join(" "),
  };
}

function formatReviewCount(count?: number) {
  if (!count || count <= 0) return "1.2k+ reviews";
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k+ reviews`;
  return `${count} reviews`;
}

// ─── Hero Slide Card ────────────────────────────────────────────────
const SlideCard = ({
  item,
  linkPrefix,
  rankConfig,
}: {
  item: BannerItem;
  linkPrefix: string;
  rankConfig: RankConfigItem;
}) => {
  const router = useRouter();
  const { first, rest } = splitName(item.name);
  const city = item.city || "Indore";
  const optimizedImg = item.image
    ? optimizeCloudinaryUrl(item.image, IMAGE_PRESETS.rankedBanner)
    : null;

  const description =
    item.description ||
    `Experience royal comfort with modern luxury in the heart of ${city}.`;

  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl bg-zinc-950 group/card">
      {/* Background Image with subtle Ken Burns effect */}
      {optimizedImg ? (
        <motion.div
          className="absolute inset-0 w-full h-full will-change-transform"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.05] }}
          transition={{
            duration: SLIDE_INTERVAL / 1000,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <img
            src={optimizedImg}
            alt={item.name}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center transform-gpu"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
          <Building2 className="w-16 h-16 text-zinc-700" />
        </div>
      )}

      {/* Cinematic Gradient Overlays: Darker on left & bottom for high text contrast, open on right */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/10 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10" />

      {/* Left Content Area */}
      <div className="relative z-20 flex flex-col justify-end items-start h-full p-6 sm:p-10 md:p-12 lg:p-14 max-w-2xl">
        {/* Top Rank Badge */}
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide border backdrop-blur-md mb-4 shadow-lg",
            rankConfig.badge,
          )}
        >
          <Crown className="w-3.5 h-3.5 fill-current" />
          <span>{rankConfig.label}</span>
        </div>

        {/* Two-Line Luxury Typography */}
        <div className="mb-3.5 drop-shadow-md">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.05]">
            {first}
          </h2>
          {rest && (
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal italic font-serif text-amber-100/90 tracking-wide leading-[1.1] mt-0.5">
              {rest}
            </p>
          )}
        </div>

        {/* Location & Rating Badges */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium mb-4 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 border border-white/15 backdrop-blur-md shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>{city}, India</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/45 border border-white/15 backdrop-blur-md shadow-sm">
            <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 shrink-0" />
            <span className="font-bold text-white">
              {item.rating && item.rating > 0 ? item.rating.toFixed(1) : "4.0"}
            </span>
            <span className="text-white/60">
              ({formatReviewCount(item.numReviews)})
            </span>
          </div>
        </div>

        {/* Short Subtitle Description */}
        <p className="text-white/80 text-xs sm:text-sm leading-relaxed max-w-md line-clamp-2 mb-6 drop-shadow-sm">
          {description}
        </p>

        {/* Action Button: Explore Details */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => RouterPush(router, `${linkPrefix}/${item._id}`)}
          className="group relative inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#ffd369] via-[#f7b733] to-[#e89b27] hover:brightness-105 active:scale-95 text-stone-950 font-bold text-xs sm:text-sm shadow-xl shadow-amber-500/20 transition-all cursor-pointer"
        >
          <span>Explore Details</span>
          <ArrowRight className="w-4 h-4 text-stone-950 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>
    </div>
  );
};

// ─── Main RankedBanner Component ────────────────────────────────────
export default function RankedBanner({ rank, entityType }: RankedBannerProps) {
  const isHotel = entityType === "hotel";
  const linkPrefix = isHotel ? "/hotels" : "/tours";
  const rankConfig = RANK_CONFIG[rank];

  const hotelQuery = useGetRankedHotels(isHotel ? rank : "");
  const tourQuery = useGetRankedTourCompanies(isHotel ? "" : rank);
  const query = isHotel ? hotelQuery : tourQuery;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    query;

  const allItems: BannerItem[] = useMemo(() => {
    if (!data?.pages) return [];
    return data.pages.flatMap((page) => page.items || []);
  }, [data]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });

  const effectiveLength = allItems.length;

  const handleNext = useCallback(() => {
    if (effectiveLength === 0) return;
    setCurrentIndex((prev) => (prev + 1) % effectiveLength);
  }, [effectiveLength]);

  const handlePrev = useCallback(() => {
    if (effectiveLength === 0) return;
    setCurrentIndex((prev) => (prev - 1 + effectiveLength) % effectiveLength);
  }, [effectiveLength]);

  // Infinite prefetching integration
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const batchPosition = currentIndex % PAGE_SIZE;

    if (batchPosition >= PREFETCH_THRESHOLD - 1) {
      fetchNextPage();
    }
  }, [currentIndex, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Auto-play interval with pause capability
  useEffect(() => {
    if (!isInView || effectiveLength <= 1 || isPaused) return;

    const slideTimer = setInterval(() => {
      handleNext();
    }, SLIDE_INTERVAL);

    return () => clearInterval(slideTimer);
  }, [isInView, effectiveLength, handleNext, isPaused]);

  if (!isLoading && allItems.length === 0) return null;

  // Loading skeleton screen
  if (isLoading) {
    return (
      <div ref={containerRef} className="w-full my-4">
        <div className="h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] w-full rounded-3xl bg-zinc-900/60 animate-pulse border border-zinc-800 flex flex-col justify-end p-6 sm:p-10 md:p-14">
          <div className="h-6 w-28 bg-zinc-800 rounded-full mb-4" />
          <div className="h-10 sm:h-12 w-2/3 md:w-1/2 bg-zinc-800 rounded-lg mb-3" />
          <div className="h-4 w-1/3 bg-zinc-800 rounded-md mb-6" />
          <div className="h-11 w-40 bg-zinc-800 rounded-full" />
        </div>
      </div>
    );
  }

  const currentItem = allItems[currentIndex];
  if (!currentItem) return null;

  return (
    <div
      ref={containerRef}
      className="w-full my-4 md:my-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[22rem] sm:h-[26rem] md:h-[29rem] lg:h-[32rem] w-full rounded-3xl overflow-hidden bg-black shadow-2xl border border-white/10">
        {/* Banner Animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <SlideCard
              item={currentItem}
              linkPrefix={linkPrefix}
              rankConfig={rankConfig}
            />
          </motion.div>
        </AnimatePresence>

        {/* Top-Right Counter and Navigation Controls */}
        {effectiveLength > 1 && (
          <div className="absolute top-5 sm:top-6 right-5 sm:right-6 z-30 flex items-center gap-1.5 backdrop-blur-md bg-black/60 px-3.5 py-1.5 rounded-full border border-white/15 shadow-lg">
            <button
              onClick={handlePrev}
              className="text-white/70 hover:text-white transition-colors p-1 cursor-pointer active:scale-90"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-white tracking-widest px-1">
              {currentIndex + 1} / {effectiveLength}
            </span>
            <button
              onClick={handleNext}
              className="text-white/70 hover:text-white transition-colors p-1 cursor-pointer active:scale-90"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
