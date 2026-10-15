import posthog from "posthog-js";
import {
  POSTHOG_CONFIG,
  ANALYTICS_EVENTS,
  SERVICES,
  HotelAnalyticsPayload,
  TourAnalyticsPayload,
  ServiceVisitPayload,
  SearchAnalyticsPayload,
} from "@/config/posthog.config";
import { userAccessToken } from "@/types/auth";

/**
 * Check if running in browser and PostHog is properly configured
 */
export const isPostHogReady = (): boolean => {
  return (
    typeof window !== "undefined" &&
    Boolean(POSTHOG_CONFIG.apiKey) &&
    Boolean(posthog.__loaded)
  );
};

/**
 * Helper to determine current authentication status
 */
export const checkIsAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    return Boolean(localStorage.getItem(userAccessToken));
  } catch {
    return false;
  }
};

/**
 * Identify an authenticated user in PostHog
 * Associates future and past anonymous activity to this user profile
 */
export const identifyUser = (user: {
  id?: string;
  _id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  role?: string;
  [key: string]: any;
}) => {
  if (typeof window === "undefined" || !POSTHOG_CONFIG.apiKey) return;

  const distinctId = user.id || user._id;
  if (!distinctId) {
    if (POSTHOG_CONFIG.debug) {
      console.warn("[PostHog] identifyUser skipped: No user ID provided", user);
    }
    return;
  }

  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
    user.name ||
    user.email ||
    "User";

  const userProperties = {
    email: user.email,
    name: fullName,
    first_name: user.firstName,
    last_name: user.lastName,
    phone: user.phoneNumber,
    role: user.role || "user",
    is_authenticated: true,
    last_login_at: new Date().toISOString(),
  };

  try {
    posthog.identify(String(distinctId), userProperties);

    if (POSTHOG_CONFIG.debug) {
      console.log(`[PostHog] User identified: ${distinctId} (${user.email})`);
    }
  } catch (error) {
    console.error("[PostHog] Failed to identify user:", error);
  }
};

/**
 * Reset PostHog user session upon logout
 * Unlinks the user profile and starts a clean anonymous session
 */
export const resetUser = () => {
  if (typeof window === "undefined" || !POSTHOG_CONFIG.apiKey) return;

  try {
    posthog.reset();
    if (POSTHOG_CONFIG.debug) {
      console.log("[PostHog] User session reset successfully (logged out)");
    }
  } catch (error) {
    console.error("[PostHog] Failed to reset user:", error);
  }
};

/**
 * Generic safe event tracker
 */
export const trackEvent = (
  eventName: string,
  properties?: Record<string, any>,
) => {
  if (typeof window === "undefined" || !POSTHOG_CONFIG.apiKey) return;

  try {
    const payload = {
      ...properties,
      is_authenticated:
        properties?.is_authenticated !== undefined
          ? properties.is_authenticated
          : checkIsAuthenticated(),
      timestamp: new Date().toISOString(),
    };

    posthog.capture(eventName, payload);

    if (POSTHOG_CONFIG.debug) {
      console.log(`[PostHog] Event: "${eventName}"`, payload);
    }
  } catch (error) {
    console.error(`[PostHog] Failed to capture event "${eventName}":`, error);
  }
};

/**
 * Track when a user views a specific hotel details page
 */
export const trackHotelView = (hotel: HotelAnalyticsPayload) => {
  trackEvent(ANALYTICS_EVENTS.HOTEL_VIEWED, {
    service: SERVICES.HOTELS,
    ...hotel,
  });
};

/**
 * Track when a user views a specific tour details page
 */
export const trackTourView = (tour: TourAnalyticsPayload) => {
  trackEvent(ANALYTICS_EVENTS.TOUR_VIEWED, {
    service: SERVICES.TOURS,
    ...tour,
  });
};

/**
 * Track when a user navigates to a service category (Hotels, Tours, Bikes, etc.)
 */
export const trackServiceVisit = (payload: ServiceVisitPayload) => {
  trackEvent(ANALYTICS_EVENTS.SERVICE_VISITED, payload);
};

/**
 * Track search queries across services
 */
export const trackSearch = (searchData: SearchAnalyticsPayload) => {
  const eventName =
    searchData.service === SERVICES.TOURS
      ? ANALYTICS_EVENTS.TOUR_SEARCH
      : ANALYTICS_EVENTS.HOTEL_SEARCH;

  trackEvent(eventName, searchData);
};

export { posthog };
