// "use client";
// import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence, useInView } from "motion/react";
// import { useGetRankedHotels } from "@/services/hotel/querys";
// import { useGetRankedTourCompanies } from "@/services/tours/tours.queries";
// import { useRouter } from "next/navigation";
// import { RouterPush } from "../RouterPush";
// import { ArrowRight, Star } from "lucide-react";
// import { cn } from "@/lib/utils";

// type RankedBannerProps = {
//   rank: "A" | "B" | "C";
//   entityType: "hotel" | "tour";
// };

// type BannerItem = {
//   _id: string;
//   name: string;
//   city: string;
//   image: string | null;
//   rating?: number;
// };

// const SLIDE_INTERVAL = 10000; // 10 seconds
// const PREFETCH_THRESHOLD = 8; // Prefetch when reaching 8th item in a batch
// const PAGE_SIZE = 10;

// // Rank labels for overlay branding
// const RANK_CONFIG = {
//   A: {
//     label: "Premium",
//     gradient: "from-amber-500/90 via-amber-600/80 to-yellow-700/90",
//     accent: "amber",
//     badge: "bg-gradient-to-r from-amber-400 to-yellow-500",
//   },
//   B: {
//     label: "Recommended",
//     gradient: "from-blue-500/90 via-indigo-600/80 to-purple-700/90",
//     accent: "blue",
//     badge: "bg-gradient-to-r from-blue-400 to-indigo-500",
//   },
//   C: {
//     label: "Featured",
//     gradient: "from-emerald-500/90 via-teal-600/80 to-cyan-700/90",
//     accent: "emerald",
//     badge: "bg-gradient-to-r from-emerald-400 to-teal-500",
//   },
// };

// // ─── Single Slide Card ────────────────────────────────────────────
// const SlideCard = ({
//   item,
//   linkPrefix,
//   rankConfig,
// }: {
//   item: BannerItem;
//   linkPrefix: string;
//   rankConfig: (typeof RANK_CONFIG)["A"];
// }) => {
//   const router = useRouter();

//   return (
//     <div className="relative w-full h-full overflow-hidden">
//       {/* Background image */}
//       {item.image ? (
//         <motion.img
//           src={item.image}
//           alt={item.name}
//           className="absolute inset-0 w-full h-full object-cover"
//           initial={{ scale: 1.1 }}
//           animate={{
//             scale: [1, 1.06, 1.03],
//             x: ["0%", "1%", "-0.5%"],
//             y: ["0%", "-1%", "0.5%"],
//           }}
//           transition={{
//             duration: 12,
//             ease: "easeInOut",
//             repeat: Infinity,
//             repeatType: "reverse",
//           }}
//         />
//       ) : (
//         <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
//       )}

//       {/* Overlay gradients */}
//       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />
//       <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />

//       {/* Content */}
//       <div className="relative z-20 flex flex-col justify-end items-start h-full p-4 sm:p-6 md:p-8">
//         {/* Rank badge */}
//         <div
//           className={cn(
//             "px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold text-white mb-2 sm:mb-3 backdrop-blur-sm",
//             rankConfig.badge
//           )}
//         >
//           ★ {rankConfig.label}
//         </div>

//         {/* Name */}
//         <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-1">
//           {item.name}
//         </h3>

//         {/* City + Rating */}
//         <div className="flex items-center gap-2 sm:gap-3 text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
//           <span>{item.city}, India</span>
//           {item.rating && item.rating > 0 && (
//             <>
//               <span className="w-1 h-1 rounded-full bg-white/50" />
//               <span className="flex items-center gap-1">
//                 <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
//                 {item.rating.toFixed(1)}
//               </span>
//             </>
//           )}
//         </div>

//         {/* CTA */}
//         <motion.button
//           whileHover={{ scale: 1.05, y: -1 }}
//           whileTap={{ scale: 0.97 }}
//           onClick={() => RouterPush(router, `${linkPrefix}/${item._id}`)}
//           className="group relative px-4 sm:px-6 py-2 sm:py-2.5 rounded-full overflow-hidden border border-white/20 backdrop-blur-md bg-white/10 text-white font-semibold text-xs sm:text-sm transition-all duration-300 hover:border-white/40 hover:bg-white/15 flex items-center gap-2"
//         >
//           <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//           <span className="relative z-10">View Details</span>
//           <ArrowRight className="relative z-10 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
//           <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
//         </motion.button>
//       </div>
//     </div>
//   );
// };

// // ─── Dual Card (Rank C) ────────────────────────────────────────────
// const DualSlideCard = ({
//   items,
//   linkPrefix,
//   rankConfig,
// }: {
//   items: [BannerItem, BannerItem?];
//   linkPrefix: string;
//   rankConfig: (typeof RANK_CONFIG)["A"];
// }) => {
//   const router = useRouter();

//   return (
//     <div className="relative w-full h-full flex gap-1">
//       {items.map((item, idx) => {
//         if (!item) return null;
//         return (
//           <div key={item._id} className={cn("relative flex-1 overflow-hidden", idx === 0 ? "rounded-l-2xl" : "rounded-r-2xl")}>
//             {item.image ? (
//               <motion.img
//                 src={item.image}
//                 alt={item.name}
//                 className="absolute inset-0 w-full h-full object-cover"
//                 initial={{ scale: 1.1 }}
//                 animate={{ scale: [1, 1.04], x: ["0%", idx === 0 ? "1%" : "-1%"] }}
//                 transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
//               />
//             ) : (
//               <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />
//             )}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
//             <div
//               className="relative z-20 flex flex-col justify-end items-start h-full p-3 sm:p-5 cursor-pointer"
//               onClick={() => RouterPush(router, `${linkPrefix}/${item._id}`)}
//             >
//               <div className={cn("px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold text-white mb-1.5 backdrop-blur-sm", rankConfig.badge)}>
//                 ★ {rankConfig.label}
//               </div>
//               <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white leading-tight mb-0.5 line-clamp-1">
//                 {item.name}
//               </h3>
//               <p className="text-[10px] sm:text-xs text-white/70">{item.city}, India</p>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// // ─── Main RankedBanner Component ────────────────────────────────────
// export default function RankedBanner({ rank, entityType }: RankedBannerProps) {
//   const isHotel = entityType === "hotel";
//   const linkPrefix = isHotel ? "/hotels" : "/tours";
//   const rankConfig = RANK_CONFIG[rank];

//   // Use the appropriate hook based on entity type
//   const hotelQuery = useGetRankedHotels(isHotel ? rank : "");
//   const tourQuery = useGetRankedTourCompanies(isHotel ? "" : rank);
//   const query = isHotel ? hotelQuery : tourQuery;

//   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = query;

//   // Flatten all pages into a single items array
//   const allItems: BannerItem[] = useMemo(() => {
//     if (!data?.pages) return [];
//     return data.pages.flatMap((page) => page.items || []);
//   }, [data]);

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const isInView = useInView(containerRef, { once: true, margin: "-50px" });

//   const isDualMode = rank === "C";

//   // For Rank C: we step by 2 (showing 2 items at a time)
//   const effectiveLength = isDualMode ? Math.ceil(allItems.length / 2) : allItems.length;

//   // Handle next slide
//   const handleNext = useCallback(() => {
//     if (effectiveLength === 0) return;
//     setCurrentIndex((prev) => (prev + 1) % effectiveLength);
//     setProgress(0);
//   }, [effectiveLength]);

//   // Prefetch logic: when approaching end of a batch, fetch next page
//   useEffect(() => {
//     if (!hasNextPage || isFetchingNextPage) return;

//     const actualItemIndex = isDualMode ? currentIndex * 2 : currentIndex;
//     const batchPosition = actualItemIndex % PAGE_SIZE;

//     // Prefetch when reaching the 8th item in a batch (index 7)
//     if (batchPosition >= PREFETCH_THRESHOLD - 1 && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [currentIndex, hasNextPage, isFetchingNextPage, fetchNextPage, isDualMode]);

//   // Auto-slide timer + progress bar
//   useEffect(() => {
//     if (!isInView || effectiveLength === 0) return;

//     const progressInterval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) return 100;
//         return prev + 100 / (SLIDE_INTERVAL / 50);
//       });
//     }, 50);

//     const slideTimer = setInterval(() => {
//       handleNext();
//     }, SLIDE_INTERVAL);

//     return () => {
//       clearInterval(progressInterval);
//       clearInterval(slideTimer);
//     };
//   }, [isInView, effectiveLength, handleNext, currentIndex]);

//   // Don't render anything if no data or loading returned empty
//   if (!isLoading && allItems.length === 0) return null;

//   // Loading skeleton
//   if (isLoading) {
//     return (
//       <div ref={containerRef} className="w-full">
//         <div className="h-[12rem] sm:h-[18rem] md:h-[22rem] lg:h-[28rem] rounded-2xl my-2 md:my-3 bg-zinc-800/60 animate-pulse flex flex-col items-center justify-center">
//           <div className="h-8 sm:h-12 w-[40%] bg-white/10 rounded-xl mb-4" />
//           <div className="h-4 w-[60%] bg-white/10 rounded-lg mb-2" />
//           <div className="h-10 w-32 bg-white/10 rounded-full mt-4" />
//         </div>
//       </div>
//     );
//   }

//   // Get current items for display
//   const getCurrentItems = (): BannerItem[] => {
//     if (isDualMode) {
//       const startIdx = currentIndex * 2;
//       return allItems.slice(startIdx, startIdx + 2);
//     }
//     return [allItems[currentIndex]].filter(Boolean);
//   };

//   const currentItems = getCurrentItems();
//   if (currentItems.length === 0) return null;

//   return (
//     <div ref={containerRef} className="w-full px-2 md:px-0">
//       <div className="relative h-[12rem] sm:h-[18rem] md:h-[22rem] lg:h-[28rem] rounded-2xl my-2 md:my-3 overflow-hidden group">
//         {/* Slides */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={currentIndex}
//             className="absolute inset-0"
//             initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
//             animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//             exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)" }}
//             transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
//           >
//             {isDualMode ? (
//               <DualSlideCard
//                 items={[currentItems[0], currentItems[1]] as [BannerItem, BannerItem?]}
//                 linkPrefix={linkPrefix}
//                 rankConfig={rankConfig}
//               />
//             ) : (
//               <SlideCard
//                 item={currentItems[0]}
//                 linkPrefix={linkPrefix}
//                 rankConfig={rankConfig}
//               />
//             )}
//           </motion.div>
//         </AnimatePresence>

//         {/* Progress indicators */}
//         {effectiveLength > 1 && (
//           <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-1.5 sm:gap-2">
//             {Array.from({ length: Math.min(effectiveLength, 10) }).map((_, i) => {
//               // Show dots for visible range around current index
//               const totalDots = Math.min(effectiveLength, 10);
//               const dotOffset = Math.max(0, currentIndex - Math.floor(totalDots / 2));
//               const dotIndex = i + (effectiveLength > 10 ? dotOffset : 0);

//               return (
//                 <button
//                   key={i}
//                   onClick={() => {
//                     setCurrentIndex(dotIndex % effectiveLength);
//                     setProgress(0);
//                   }}
//                   className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
//                   style={{ width: dotIndex === currentIndex ? 28 : 12 }}
//                 >
//                   <div className="absolute inset-0 bg-white/25 rounded-full" />
//                   {dotIndex === currentIndex && (
//                     <motion.div
//                       className="absolute inset-0 bg-white rounded-full origin-left"
//                       initial={{ scaleX: 0 }}
//                       animate={{ scaleX: progress / 100 }}
//                       transition={{ duration: 0.05, ease: "linear" }}
//                     />
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         )}

//         {/* Top decoration */}
//         <div className="absolute top-0 left-0 right-0 h-px z-30 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//         <div className="absolute bottom-0 left-0 right-0 h-px z-30 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
//       </div>
//     </div>
//   );
// }
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
import { ArrowRight, MapPin, Star, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Make sure to import your existing query functions correctly
import { useGetRankedHotels } from "@/services/hotel/querys";
import { useGetRankedTourCompanies } from "@/services/tours/tours.queries";
import { RouterPush } from "../RouterPush";

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
};

const SLIDE_INTERVAL = 8000;
const PREFETCH_THRESHOLD = 8;
const PAGE_SIZE = 10;

const RANK_CONFIG = {
  A: {
    label: "Premium",
    badge:
      "bg-gradient-to-r from-amber-500 to-yellow-600 text-amber-950 border-amber-300/40",
    glow: "shadow-amber-500/20",
  },
  B: {
    label: "Recommended",
    badge:
      "bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-blue-300/40",
    glow: "shadow-blue-500/20",
  },
  C: {
    label: "Featured",
    badge:
      "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-300/40",
    glow: "shadow-emerald-500/20",
  },
} as const;

// ─── Single Slide Card ────────────────────────────────────────────
// ─── Refined Premium Slide Card ────────────────────────────────────
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

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-zinc-950 group/card">
      {/* Background Image Layer */}
      {item.image ? (
        <motion.div
          className="absolute inset-0 w-full h-full will-change-transform"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.04] }}
          transition={{
            duration: SLIDE_INTERVAL / 1000,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <img
            src={item.image}
            alt={item.name}
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover object-center transform-gpu"
          />
        </motion.div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
          <Building2 className="w-12 h-12 text-zinc-700" />
        </div>
      )}

      {/* Cinematic Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent z-10" />

      {/* Content Layer */}
      <div className="relative z-20 flex flex-col justify-end items-start h-full p-6 sm:p-8 md:p-10">
        {/* Subtle Rank Badge */}
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium tracking-wide border backdrop-blur-md mb-3 shadow-lg",
            rankConfig.badge,
          )}
        >
          <Star className="w-3 h-3 fill-current" />
          <span>{rankConfig.label}</span>
        </div>

        {/* Clean, High-Contrast Title with Title Case / Capitalize */}
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white capitalize leading-tight mb-2 drop-shadow-sm">
          {item.name}
        </h3>

        {/* Location & Rating Info */}
        <div className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300 font-normal mb-6">
          <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            {item.city}, India
          </span>
          {item.rating && item.rating > 0 ? (
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white font-medium">
                {item.rating.toFixed(1)}
              </span>
            </span>
          ) : null}
        </div>

        {/* Glassmorphic Action Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => RouterPush(router, `${linkPrefix}/${item._id}`)}
          className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-xl text-white font-medium text-xs sm:text-sm shadow-xl transition-all duration-300 active:scale-95"
        >
          <span>Explore Details</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 opacity-80 group-hover:opacity-100" />
        </motion.button>
      </div>
    </div>
  );
};
type RankConfigItem = (typeof RANK_CONFIG)[keyof typeof RANK_CONFIG];
// ─── Dual Card (Rank C Split View) ──────────────────────────────────
const DualSlideCard = ({
  items,
  linkPrefix,
  rankConfig,
}: {
  items: [BannerItem, BannerItem?];
  linkPrefix: string;
  rankConfig: RankConfigItem;
}) => {
  const router = useRouter();

  return (
    <div className="relative w-full h-full grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
      {items.map((item, idx) => {
        if (!item) return null;
        return (
          <div
            key={item._id}
            onClick={() => RouterPush(router, `${linkPrefix}/${item._id}`)}
            className="group relative w-full h-full overflow-hidden rounded-xl bg-zinc-950 cursor-pointer border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg"
          >
            {/* Background Layer */}
            {item.image ? (
              <motion.div
                className="absolute inset-0 w-full h-full will-change-transform"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.04] }}
                transition={{
                  duration: SLIDE_INTERVAL / 1000,
                  ease: "linear",
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="eager"
                  className="w-full h-full object-cover transform-gpu"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                <Building2 className="w-10 h-10 text-zinc-700" />
              </div>
            )}

            {/* Gradient Mask */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />

            {/* Details */}
            <div className="relative z-20 flex flex-col justify-end h-full p-4 sm:p-6">
              <div
                className={cn(
                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold w-max mb-2 backdrop-blur-md shadow-md border",
                  rankConfig.badge,
                )}
              >
                ★ {rankConfig.label}
              </div>

              <h3 className="text-base sm:text-xl font-bold text-white leading-snug mb-1 line-clamp-1 group-hover:text-amber-300 transition-colors">
                {item.name}
              </h3>

              <div className="flex items-center justify-between mt-1 text-xs text-zinc-300">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  {item.city}, India
                </span>
                <span className="flex items-center gap-1 font-semibold text-white group-hover:translate-x-1 transition-transform">
                  View <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────
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

  const isDualMode = rank === "C";
  const effectiveLength = isDualMode
    ? Math.ceil(allItems.length / 2)
    : allItems.length;

  const handleNext = useCallback(() => {
    if (effectiveLength === 0) return;
    setCurrentIndex((prev) => (prev + 1) % effectiveLength);
  }, [effectiveLength]);

  // Infinite prefetching integration
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const actualItemIndex = isDualMode ? currentIndex * 2 : currentIndex;
    const batchPosition = actualItemIndex % PAGE_SIZE;

    if (batchPosition >= PREFETCH_THRESHOLD - 1) {
      fetchNextPage();
    }
  }, [
    currentIndex,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isDualMode,
  ]);

  // Auto-play interval handling with pause capability
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
        <div className="h-[14rem] sm:h-[20rem] md:h-[26rem] lg:h-[30rem] w-full rounded-2xl bg-zinc-900/60 animate-pulse border border-zinc-800 flex flex-col justify-end p-6 md:p-10">
          <div className="h-6 w-28 bg-zinc-800 rounded-full mb-4" />
          <div className="h-8 sm:h-10 w-2/3 md:w-1/2 bg-zinc-800 rounded-lg mb-3" />
          <div className="h-4 w-1/3 bg-zinc-800 rounded-md mb-6" />
          <div className="h-10 w-36 bg-zinc-800 rounded-xl" />
        </div>
      </div>
    );
  }

  const getCurrentItems = (): BannerItem[] => {
    if (isDualMode) {
      const startIdx = currentIndex * 2;
      return allItems.slice(startIdx, startIdx + 2);
    }
    return [allItems[currentIndex]].filter(Boolean);
  };

  const currentItems = getCurrentItems();
  if (currentItems.length === 0) return null;

  return (
    <div
      ref={containerRef}
      className="w-full my-3 md:my-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative h-[16rem] sm:h-[22rem] md:h-[26rem] lg:h-[30rem] w-full rounded-2xl overflow-hidden bg-black shadow-2xl">
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
            {isDualMode ? (
              <DualSlideCard
                items={
                  [currentItems[0], currentItems[1]] as [
                    BannerItem,
                    BannerItem?,
                  ]
                }
                linkPrefix={linkPrefix}
                rankConfig={rankConfig}
              />
            ) : (
              <SlideCard
                item={currentItems[0]}
                linkPrefix={linkPrefix}
                rankConfig={rankConfig}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dynamic Multi-Segment Progress Indicators */}
        {effectiveLength > 1 && (
          <div className="absolute bottom-4 right-6 z-30 flex items-center gap-1.5 backdrop-blur-md bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
            {Array.from({ length: effectiveLength }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300"
                style={{ width: i === currentIndex ? 24 : 8 }}
              >
                <div className="absolute inset-0 bg-white/30" />
                {i === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-white rounded-full origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isPaused ? 1 : 1 }}
                    transition={
                      isPaused
                        ? { duration: 0 }
                        : { duration: SLIDE_INTERVAL / 1000, ease: "linear" }
                    }
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
