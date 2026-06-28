



'use client'
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { CarouselProps, PopularDestinationCarousel } from "../carousel/tabs-carousel";
import { ImagesSliderDemo } from "../addimage/middle-ads-image";
import { useGetNewHotels } from "@/services/hotel/querys";
import type { Item } from "../carousel/onlyColursel";
import { hoteldata, HotelFramePageProps } from "@/app/(home)/(categories)/hotels/page";
import { MapPin } from "lucide-react";
import FrameColursals from "./frame_coloursals";
export const DummyDataList: CarouselProps[] = [
    {
        type: "hotels",
        tagline: "Sponsored Results",
        tabs: undefined,
        items: [{
            title: "Secure Path",
            image: "/bikes/cc1.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Omni Point",
            image: "/bikes/cc2.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Global Track",
            image: "/bikes/cc3.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Trace Tech System",
            image: "/bikes/cc4.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Secure Path",
            image: "/bikes/cc1.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Omni Point",
            image: "/bikes/cc2.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Global Track",
            image: "/bikes/cc3.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Trace Tech System",
            image: "/bikes/cc4.png",
            location: "Staring From Rupees 600/D",
            href: "",
        },],
        isLoading: false,
    },
    {
        type: "hotels",
        tagline: "Top 10 companies in Rishikesh",
        tabs: undefined,
        items: [{
            title: "Secure Path",
            image: "/bikes/cc1.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Omni Point",
            image: "/bikes/cc2.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Global Track",
            image: "/bikes/cc3.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Trace Tech System",
            image: "/bikes/cc4.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Secure Path",
            image: "/bikes/cc1.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Omni Point",
            image: "/bikes/cc2.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Global Track",
            image: "/bikes/cc3.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Trace Tech System",
            image: "/bikes/cc4.png",
            location: "Staring From Rupees 600/D",
            href: "",
        },],
        isLoading: false,
    },
    {
        type: "hotels",
        tagline: "Organic Ranks",
        tabs: undefined,
        items: [{
            title: "Secure Path",
            image: "/bikes/cc1.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Omni Point",
            image: "/bikes/cc2.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Global Track",
            image: "/bikes/cc3.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Trace Tech System",
            image: "/bikes/cc4.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Secure Path",
            image: "/bikes/cc1.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Omni Point",
            image: "/bikes/cc2.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Global Track",
            image: "/bikes/cc3.png",
            location: "Staring From Rupees 600/D",
            href: "",
        }, {
            title: "Trace Tech System",
            image: "/bikes/cc4.png",
            location: "Staring From Rupees 600/D",
            href: "",
        },],
        isLoading: false,
    },
]
// No tabs in this design → so we pass tabs={undefined}
type SectionConfig = {
    tagline: string;
    city: string;
    limit?: number;
};

const POPULAR_SECTIONS: SectionConfig[] = [
    { tagline: "Sponsored Results", city: "" },
    { tagline: "Organic Ranks", city: "" },
    { tagline: "Top 10 companies in Rishikesh", city: "" },

];

const MainFramePage = ({ className, type, popularTrends }: HotelFramePageProps) => {



    return (
        <FrameColursals className={cn(className, " ")}>
            {POPULAR_SECTIONS.map((section, i) => {
                // const items = sectionItems[i] || [];


                return (
                    <React.Fragment key={section.tagline}>
                        <PopularDestinationCarousel
                            tagline={DummyDataList[i].tagline}
                            // tabs={popularTrends?.[0]?.tabs || undefined}
                            type={DummyDataList[i].type}
                            items={DummyDataList[i].items}
                            icon={<MapPin className="h-3 w-3 shrink-0" />}
                            galleryCardHide={true}
                        // isLoading={isLoading}
                        />

                        {i === 1 && (
                            <div className="px-2 md:px-0">
                                <ImagesSliderDemo images={[
                                    '/hotels/img5.png',
                                    '/hotels/img6.png',
                                    '/hotels/img7.png',
                                    '/hotels/img8.png',
                                ]} title="Discover Asia" subtitle="Book now" description="Book your next adventure now" link="/hotels/find" />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}

            {/* {error && (
                <p className="text-red-500 text-center">Failed to load hotels: {error.message}</p>
            )} */}
        </FrameColursals>
    );
};

export default MainFramePage;