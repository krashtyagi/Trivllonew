"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import { POSTHOG_CONFIG } from "@/config/posthog.config";
import { PostHogPageView } from "./posthog-pageview";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (POSTHOG_CONFIG.apiKey) {
      if (!posthog.__loaded) {
        posthog.init(POSTHOG_CONFIG.apiKey, {
          api_host: POSTHOG_CONFIG.apiHost,
          person_profiles: POSTHOG_CONFIG.personProfiles,
          capture_pageview: POSTHOG_CONFIG.capturePageview,
          capture_pageleave: POSTHOG_CONFIG.capturePageleave,
          autocapture: POSTHOG_CONFIG.autocapture,
        });
      }
    } else if (POSTHOG_CONFIG.debug) {
      console.warn(
        "[PostHog] Initialization skipped: NEXT_PUBLIC_POSTHOG_KEY is not defined in environment variables.",
      );
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
