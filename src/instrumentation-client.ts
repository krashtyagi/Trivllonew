import posthog from "posthog-js";
import { POSTHOG_CONFIG } from "@/config/posthog.config";

if (typeof window !== "undefined" && POSTHOG_CONFIG.apiKey && !posthog.__loaded) {
  posthog.init(POSTHOG_CONFIG.apiKey, {
    api_host: POSTHOG_CONFIG.apiHost,
    person_profiles: POSTHOG_CONFIG.personProfiles,
    capture_pageview: POSTHOG_CONFIG.capturePageview,
    capture_pageleave: POSTHOG_CONFIG.capturePageleave,
    autocapture: POSTHOG_CONFIG.autocapture,
  });
}
