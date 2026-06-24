import { Metadata } from "next";
import HotelsClientPage from "./hotels-client";
import trivlloData from "@/../trivllo.json";

export { type HotelFramePageProps, type HotelData, type hoteldata } from "./hotels-client";

export const metadata: Metadata = {
  title: `Book Hotels & Stays | ${trivlloData.company_name}`,
  description: `Find and book hotels, resorts, and homestays on ${trivlloData.company_name}. Secure the best rates and enjoy comfortable stays tailored to you.`,
};

const Page = () => {
  return <HotelsClientPage type="hotels" />;
};

export default Page;
