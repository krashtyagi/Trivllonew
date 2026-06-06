



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
    default: "Hilexa | Hotels, Cabs & Adventure Experiences",
    template: "%s | Hilexa",
  },
  description:
    "Your ultimate travel companion. Book premium hotels, reliable cab services, and thrilling adventure activities all in one place with Hilexa.",
  icons: {
    icon: "/hilexa-logo.svg",
    shortcut: "/hilexa-logo.svg",
    apple: "/hilexa-logo.svg",
  },
  // manifest: "/manifest.json",

  keywords: [
    "Hilexa",
    "Hotel Booking",
    "Cab Rental",
    "Adventure Sports Booking",
    "Rishikesh Adventures",
    "Travel Packages India",
    "Hilexa App",
  ],
  authors: [{ name: "Hilexa Team" }],

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.hilexa.com",
    siteName: "Hilexa - Stays, Rides & Adventures",
    title: "Hilexa | One Web App for All Your Travel Needs",
    description:
      "Discover luxury stays, seamless cab rides, and adrenaline-pumping adventures. Hilexa makes travel simple and memorable.",
    images: [
      {
        url: "/og-main-preview.png",
        width: 1200,
        height: 630,
        alt: "Hilexa - Hotels, Cabs, Adventures",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Hilexa | Premium Travel Services",
    description: "Book Hotels, Cabs, and Adventures instantly.",
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















