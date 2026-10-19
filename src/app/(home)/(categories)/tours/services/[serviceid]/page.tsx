"use client";

import { cn } from "@/lib/utils";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HotelPageSkeleton } from "@/components/ui/skeleton";
import { MessageModal } from "@/components/messagemodal";
import { ScrollToTop } from "../../../../../../../scrolltoto";
import { useParam } from "@/services/dailyfunctions";
import { useTourServiceDetails } from "@/services/tours/tours.queries";
import TourServicesDetails, {
  TourServiceData,
  TourServiceResponse,
  TourService,
  TourCompany,
} from "./_components/HotelItems";

export type {
  TourServiceResponse,
  TourServiceData,
  TourService,
  TourCompany,
};

const TourServiceDetailsPage = () => {
  const [isBookingMode] = React.useState(false);
  localStorage.removeItem("nextRoute");
  localStorage.removeItem("like");
  const serviceId = useParam("serviceid");

  const { data: tourDetailsData, isLoading } =
    useTourServiceDetails(serviceId);

  if (!tourDetailsData || !tourDetailsData.data?.company || isLoading) {
    return (
      <div className="w-full">
        <ScrollToTop />
        <HotelPageSkeleton />
      </div>
    );
  }

  return (
    <div className="w-full">
      <ErrorBoundary
        fallback={
          <MessageModal title="Error" description="Something went wrong" />
        }
      >
        <Suspense fallback={<HotelPageSkeleton />}>
          <ScrollToTop />
          <TourServicesDetails
            data={tourDetailsData.data as TourServiceData}
            loading={isLoading || !tourDetailsData.data}
            isBookingMode={isBookingMode}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default TourServiceDetailsPage;
