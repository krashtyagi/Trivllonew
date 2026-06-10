



/////------------ yogesh code with seo

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainProvider from "@/providers/main-provider/main-provider";
import { Toaster } from "@/components/ui/sonner";
import TopLoader from "./toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Trivllo | Hotels,Tours",
    template: "%s | Trivllo",
  },
  description:
    "Your ultimate travel companion. Book premium hotels, activities all in one place with Trivllo.",
  icons: {
    icon: "/triv-logo.svg",
    shortcut: "/triv-logo.svg",
    apple: "/triv-logo.svg",
  },
  // manifest: "/manifest.json",

  keywords: [
    "Trivllo",
    "Hotel Booking",
    // "Cab Rental",
    // "Adventure Sports Booking",
    // "Rishikesh Adventures",
    "Tours & Activities",
    "Travel Packages India",
    "Trivllo App",
  ],
  authors: [{ name: "Trivllo Team" }],

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.Trivllo.com",
    siteName: "Trivllo - Stays,Tours",
    title: "Trivllo | One Web App for All Your Travel Needs",
    description:
      "Discover luxury stays,  Trivllo makes travel simple and memorable.",
    images: [
      {
        url: "/og-main-preview.png",
        width: 1200,
        height: 630,
        alt: "Trivllo - Hotels, Tours",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Trivllo | Premium Hotels Tours Services",
    description: "Book Hotels, Tours instantly.",
    images: ["/og-main-preview.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ff3838",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

      <head>
        {/* Facebook Verification */}
        <meta
          name="facebook-domain-verification"
          content="kthtqxpp6w141r75p1d6q8y6jgsymo"
        />

        {/* Font Awesome */}
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com"
        />

        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      {/* <head>
        <meta name="facebook-domain-verification" content="kthtqxpp6w141r75p1d6q8y6jgsymo" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

      </head> */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainProvider>
          <TopLoader />
          {children}
          <Toaster position="bottom-left" expand={true} />
        </MainProvider>

        {/* Razorpay Script */}
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      </body>
    </html>
  );
}















