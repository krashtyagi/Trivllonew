'use client';
import FilterFramePages from "@/components/frame-pages/Filter-Frame-Page";
import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { MessageModal } from "@/components/messagemodal";
import { PageSkeleton } from "@/components/loader/skeleton";
import { TourContextProvider } from "@/context/TourContextProvider";
import { tourItems } from "@/constants/filter-constants";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const SideBarFilter = dynamic(
  () => import("@/components/filter-bar/sidebar-filter").then((mod) => mod.SideBarFilter),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col gap-4 w-[270px] shrink-0 p-1">
        <Skeleton className="h-40 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-[400px] w-full rounded-xl" />
      </div>
    ),
  }
);

const ContentFrame = dynamic(
  () => import("./_components/content").then((mod) => mod.ContentFrame),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex flex-col gap-6 w-full">
        <div className="flex justify-between items-center px-4 sm:px-0">
          <Skeleton className="h-8 w-1/3 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-2xl p-4 space-y-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-6 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-20 w-full rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    ),
  }
);

type FindHotelProps = {
  className?: string;
};

const FindHotels: React.FC<FindHotelProps> = (props) => {
  return (
    <div className={cn(props.className, "w-full bg-background  sm:px-0")}>
      <ErrorBoundary fallback={<MessageModal title="Error" description="Something went wrong" />}>
        <Suspense fallback={<PageSkeleton />}>
          <TourContextProvider>

            <FilterFramePages
              filterClassname="w-full flex gap-4 justify-center "
              filterSidebar={<SideBarFilter items={tourItems} mapSrc="/map-icons/map.png" alt="map image" overlayTitle="See Location on Map" />}
              content={<ContentFrame key={0} />}
            />
          </TourContextProvider>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};
export default FindHotels;
