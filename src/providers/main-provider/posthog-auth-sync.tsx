"use client";

import { useEffect, useRef } from "react";
import { useCurrentUser } from "@/services/hotel/querys";
import { identifyUser, resetUser } from "@/lib/analytics/posthog";

/**
 * Automatically synchronizes authenticated user profile with PostHog
 * Listens to useCurrentUser and identifies the user without manual hooks
 */
export function PostHogAuthSync(): null {
  const { data: userResponse } = useCurrentUser();
  const previousUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    // The backend /users/me response structure may be { success: true, data: user } or direct user
    const user = userResponse?.data || userResponse;
    const userId = user?._id || user?.id;

    if (userId) {
      // User is logged in
      if (previousUserIdRef.current !== String(userId)) {
        identifyUser(user);
        previousUserIdRef.current = String(userId);
      }
    } else {
      // User is not logged in / logged out
      if (previousUserIdRef.current) {
        resetUser();
        previousUserIdRef.current = null;
      }
    }
  }, [userResponse]);

  return null;
}
