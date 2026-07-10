import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";

import "./globals.css";

import MainProvider from "@/providers/main-provider/main-provider";
import { Toaster } from "@/components/ui/sonner";
import TopLoader from "./toploader";

import trivlloData from "@/../trivllo.json";

import JsonLd from "@/components/seo/JsonLd";
import {
  generateOrganizationJsonLd,
  generateWebSiteJsonLd,
  generateTravelAgencyJsonLd,
  DEFAULT_KEYWORDS,
} from "@/lib/seo.config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(trivlloData.contact.website),

  title: {
    default: `${trivlloData.company_name} | Hotels, Cabs & Adventure Experiences`,
    template: `%s | ${trivlloData.company_name}`,
  },

  description:
    `Your ultimate travel companion. Book premium hotels, reliable cab services, and thrilling adventure activities all in one place with ${trivlloData.company_name}.`,

  keywords: [
    trivlloData.company_name,
    "Trivllo",
    "Trivllo.com",
    "Trivllo Hotels",
    "Trivllo Tours",
    "Trivllo Booking",
    "Hotel Booking",
    "Travel Packages India",
    `${trivlloData.company_name} App`,
    "Adventure Experiences",
    "Travel Platform",
    "Cab Booking",
    ...DEFAULT_KEYWORDS,
  ],

  authors: [
    {
      name: `${trivlloData.company_name} Team`,
    },
  ],

  creator: trivlloData.company_name,
  publisher: trivlloData.company_name,

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  verification: {
    google: "IdaATQaw8qSY4vzBkTXx9oTe1cOObbEync0xz6iXUTQ",
    other: {
      "facebook-domain-verification":
        "kthtqxpp6w141r75p1d6q8y6jgsymo",
    },
  },

  icons: {
    icon: "/trivllo-logo.svg",
    shortcut: "/trivllo-logo.svg",
    apple: "/trivllo-logo.svg",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: trivlloData.contact.website,
    siteName: trivlloData.company_name,

    title:
      `${trivlloData.company_name} | Hotels, Cabs & Adventure Experiences`,

    description:
      `Discover luxury stays, seamless cab rides, and unforgettable adventures with ${trivlloData.company_name}.`,

    images: [
      {
        url: `/logo.png`,
        width: 1200,
        height: 630,
        alt: `${trivlloData.company_name} Open Graph Preview`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      `${trivlloData.company_name} | Hotels, Cabs & Adventure Experiences`,

    description:
      `Book hotels, cabs and adventures in one place.`,

    images: [
      `/logo.png`,
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#015e09",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ── JSON-LD Structured Data for SEO ── */}
        <JsonLd data={generateOrganizationJsonLd()} />
        <JsonLd data={generateWebSiteJsonLd()} />
        <JsonLd data={generateTravelAgencyJsonLd()} />

        <MainProvider>
          <TopLoader />

          {children}

          <Toaster
            position="bottom-left"
            expand
          />
        </MainProvider>

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}