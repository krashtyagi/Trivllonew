"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense, useRef } from "react";
import posthog from "posthog-js";
import { ANALYTICS_EVENTS, SERVICES, POSTHOG_CONFIG } from "@/config/posthog.config";
import { checkIsAuthenticated } from "@/lib/analytics/posthog";

function PostHogPageViewTracker(): null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || typeof window === "undefined" || !POSTHOG_CONFIG.apiKey) {
      return;
    }

    let url = window.origin + pathname;
    const searchString = searchParams?.toString();
    if (searchString) {
      url += `?${searchString}`;
    }

    // Avoid duplicate pageviews for the exact same URL
    if (lastTrackedUrlRef.current === url) {
      return;
    }
    lastTrackedUrlRef.current = url;

    // Detect service category from URL path
    let service: string = SERVICES.GENERAL;
    if (pathname.startsWith("/hotels")) {
      service = SERVICES.HOTELS;
    } else if (pathname.startsWith("/tours")) {
      service = SERVICES.TOURS;
    } else if (pathname.startsWith("/bikes")) {
      service = SERVICES.BIKES;
    } else if (pathname.startsWith("/cabs")) {
      service = SERVICES.CABS;
    } else if (pathname.startsWith("/adventure")) {
      service = SERVICES.ADVENTURE;
    }

    const searchObj = searchParams
      ? Object.fromEntries(searchParams.entries())
      : {};

    posthog.capture(ANALYTICS_EVENTS.PAGE_VIEW, {
      $current_url: url,
      pathname,
      service,
      search_params: searchObj,
      is_authenticated: checkIsAuthenticated(),
    });

    if (POSTHOG_CONFIG.debug) {
      console.log(`[PostHog] PageView captured: ${pathname} (Service: ${service})`);
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewTracker />
    </Suspense>
  );
}
