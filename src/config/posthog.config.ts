/**
 * PostHog Analytics Configuration
 * Centralized settings, event keys, service categories, and TypeScript interfaces.
 */

export const POSTHOG_CONFIG = {
  // PostHog API Key from environment variables (supports multiple naming conventions)
  apiKey:
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ||
    "",

  // PostHog Host (default: US cloud, EU cloud is https://eu.i.posthog.com)
  apiHost:
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",

  // 'always': creates person profiles for all anonymous and identified users.
  // 'identified_only': creates person profiles only when user logs in (saves profile quota).
  personProfiles: (process.env.NEXT_PUBLIC_POSTHOG_PERSON_PROFILES ||
    "always") as "always" | "identified_only",

  // Pageview tracking is handled via our Next.js App Router PageView tracker
  capturePageview: false,

  // Automatically captures session leave / time on page
  capturePageleave: true,

  // Auto-captures clicks, button interactions, and form submissions
  autocapture: true,

  // Enables debug logging in non-production environments
  debug: process.env.NODE_ENV === "development",
} as const;

/**
 * Standardized Analytics Event Names across the application
 */
export const ANALYTICS_EVENTS = {
  // Navigation & Pageview Events
  PAGE_VIEW: "$pageview",
  SERVICE_VISITED: "service_visited",

  // Hotel Events
  HOTEL_VIEWED: "hotel_viewed",
  HOTEL_SEARCH: "hotel_search",
  HOTEL_BOOKING_STARTED: "hotel_booking_started",
  HOTEL_FAVORITED: "hotel_favorited",

  // Tour Events
  TOUR_VIEWED: "tour_viewed",
  TOUR_SEARCH: "tour_search",
  TOUR_BOOKING_STARTED: "tour_booking_started",

  // User Authentication Events
  USER_IDENTIFIED: "user_identified",
  USER_LOGGED_IN: "user_logged_in",
  USER_SIGNED_UP: "user_signed_up",
  USER_LOGGED_OUT: "user_logged_out",
} as const;

/**
 * Standardized Service Names
 */
export const SERVICES = {
  HOTELS: "hotels",
  TOURS: "tours",
  BIKES: "bikes",
  CABS: "cabs",
  ADVENTURE: "adventure",
  GENERAL: "general",
} as const;

export type ServiceType = (typeof SERVICES)[keyof typeof SERVICES];

/**
 * Payload interface for Hotel View Tracking
 */
export interface HotelAnalyticsPayload {
  hotel_id: string;
  hotel_name: string;
  city?: string;
  state?: string;
  price?: number;
  rating?: number;
  num_reviews?: number;
  is_featured?: boolean;
  category?: string;
  is_authenticated?: boolean;
  [key: string]: any;
}

/**
 * Payload interface for Tour View Tracking
 */
export interface TourAnalyticsPayload {
  tour_id: string;
  tour_name: string;
  city?: string;
  destination?: string;
  duration?: string;
  price?: number;
  category?: string;
  is_authenticated?: boolean;
  [key: string]: any;
}

/**
 * Payload interface for Service Visit Tracking
 */
export interface ServiceVisitPayload {
  service: ServiceType | string;
  path: string;
  url: string;
  is_authenticated?: boolean;
  [key: string]: any;
}

/**
 * Payload interface for Search Tracking
 */
export interface SearchAnalyticsPayload {
  service: ServiceType | string;
  destination?: string;
  check_in?: string;
  check_out?: string;
  adults?: number;
  children?: number;
  is_authenticated?: boolean;
  [key: string]: any;
}
