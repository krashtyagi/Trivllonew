import { Metadata } from "next";
import ToursClientPage from "./tours-client";
import trivlloData from "@/../trivllo.json";

export const metadata: Metadata = {
  title: `Book Guided Tours & Packages | ${trivlloData.company_name}`,
  description: `Discover curated holiday packages and guided tours on ${trivlloData.company_name}. Secure bookings, experienced guides, and customized itineraries.`,
};

const Page = () => {
  return <ToursClientPage />;
};

export default Page;
