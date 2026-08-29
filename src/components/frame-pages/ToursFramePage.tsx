



'use client'
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { CarouselProps, PopularDestinationCarousel } from "../carousel/tabs-carousel";
import { ImagesSliderDemo } from "../addimage/middle-ads-image";
import type { Item } from "../carousel/onlyColursel";
import { HotelFramePageProps } from "@/app/(home)/(categories)/hotels/page";
import { MapPin, Compass } from "lucide-react";
import FrameColursals from "./frame_coloursals";
import { useGetTourCompanies } from "@/services/tours/tours.queries";
import { TourCompanyItem } from "@/services/tours/tours.service";

export const DummyTourDataList: CarouselProps[] = [
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

const PREDEFINED_CITIES = ["Rishikesh", "Goa", "Manali", "Jaipur", "Udaipur", "Shimla"];

const MainFramePage = ({ className, type, popularTrends }: HotelFramePageProps) => {
    const { data: tourCompaniesData, isLoading: isCompaniesLoading } = useGetTourCompanies();

    const companies = useMemo(() => {
        return (tourCompaniesData?.data || []) as TourCompanyItem[];
    }, [tourCompaniesData]);

    // Group companies by city
    const companiesByCity = useMemo(() => {
        if (!companies || companies.length === 0) return {};

        return companies.reduce((acc: Record<string, TourCompanyItem[]>, comp) => {
            const rawCity = comp.city || comp.location?.city || "Rishikesh";
            const city = rawCity.trim();
            if (!acc[city]) {
                acc[city] = [];
            }
            acc[city].push(comp);
            return acc;
        }, {});
    }, [companies]);

    // Generate dynamic carousels for each available city or popular destination
    const cityCarousels = useMemo(() => {
        const availableCities = Object.keys(companiesByCity);
        const citiesToRender = availableCities.length > 0 ? availableCities : PREDEFINED_CITIES.slice(0, 3);

        return citiesToRender.map((city) => {
            const cityCompanies = companiesByCity[city] || [];
            const items: Item[] = cityCompanies.map((comp) => {
                const logoImg =
                    comp.logo ||
                    (comp.images && comp.images[0]?.url) ||
                    `https://api.dicebear.com/10.x/initials/svg?seed=${encodeURIComponent(comp.name)}`;

                return {
                    title: comp.name,
                    location: `${city}, India • Starting ₹${comp.startingPrice || 999}/person`,
                    image: logoImg,
                    href: `/tours/${comp._id}`,
                };
            });

            return {
                city,
                tagline: `Top Tour Companies in ${city}`,
                items,
                hasRealData: items.length > 0,
            };
        });
    }, [companiesByCity]);

    // Overall verified tour agencies carousel
    const allTourAgenciesItems = useMemo((): Item[] => {
        if (!companies || companies.length === 0) return [];
        return companies.map((comp) => {
            const logoImg =
                comp.logo ||
                (comp.images && comp.images[0]?.url) ||
                `https://api.dicebear.com/10.x/initials/svg?seed=${encodeURIComponent(comp.name)}`;

            return {
                title: comp.name,
                location: `${comp.city || comp.location?.city || "India"} • ${comp.totalTours || 0} Available Tours`,
                image: logoImg,
                href: `/tours/${comp._id}`,
            };
        });
    }, [companies]);

    return (
        <FrameColursals className={cn(className, " ")}>
            {/* Dynamic verified tour companies carousel if data exists */}
            {allTourAgenciesItems.length > 0 && (
                <PopularDestinationCarousel
                    tagline="Featured Tour Operators & Agencies"
                    type="tours"
                    items={allTourAgenciesItems}
                    icon={<Compass className="h-3.5 w-3.5 shrink-0 text-primary" />}
                    isLoading={isCompaniesLoading}
                    galleryCardHide={true}
                />
            )}

            {/* City/Location-based Tour Company Carousels with logos & links */}
            {cityCarousels.map((citySection) => {
                if (!citySection.hasRealData) return null;
                return (
                    <PopularDestinationCarousel
                        key={citySection.tagline}
                        tagline={citySection.tagline}
                        type="tours"
                        items={citySection.items}
                        icon={<MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />}
                        isLoading={isCompaniesLoading}
                        galleryCardHide={true}
                    />
                );
            })}

            {/* Dummy Tour Data List sections */}
            {POPULAR_SECTIONS.map((section, i) => {
                const dummy = DummyTourDataList[i];
                if (!dummy) return null;

                return (
                    <React.Fragment key={section.tagline}>
                        <PopularDestinationCarousel
                            tagline={dummy.tagline}
                            type={dummy.type}
                            items={dummy.items}
                            icon={<MapPin className="h-3 w-3 shrink-0" />}
                            galleryCardHide={true}
                        />

                        {i === 1 && (
                            <div className="px-2 md:px-0">
                                <ImagesSliderDemo
                                    images={[
                                        '/hotels/img5.png',
                                        '/hotels/img6.png',
                                        '/hotels/img7.png',
                                        '/hotels/img8.png',
                                    ]}
                                    title="Discover India & Beyond"
                                    subtitle="Curated Tour Packages"
                                    description="Book your next guided trip with top rated tour operators"
                                    link="/tours/find"
                                />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </FrameColursals>
    );
};

export default MainFramePage;