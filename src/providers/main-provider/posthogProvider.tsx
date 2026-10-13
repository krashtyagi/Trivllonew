// app/providers.tsx
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const posthogKey =
      process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const posthogHost =
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

    if (posthogKey) {
      posthog.init(posthogKey, {
        api_host: posthogHost,
        person_profiles: "identified_only", // or 'always'
        capture_pageview: true, // Automatically captures page views
      });
    } else if (process.env.NODE_ENV === "development") {
      console.warn(
        "[PostHog] Initialization skipped: NEXT_PUBLIC_POSTHOG_KEY or NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not defined.",
      );
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
