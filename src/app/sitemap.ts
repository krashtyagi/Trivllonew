import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo.config";

/**
 * Dynamic sitemap.xml generation via Next.js Metadata API.
 * Lists all public, crawlable routes with priorities and change frequencies.
 *
 * NOTE: For dynamic hotel/tour detail pages, you should extend this
 *       to fetch IDs from your API and generate entries at build time.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ── Static pages ──
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },

    // ── Category landing pages ──
    {
      url: `${SITE_URL}/hotels`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/hotels/find`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tours`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tours/find`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },

    // ── Informational / policy pages ──
    {
      url: `${SITE_URL}/about-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/partner-with-us`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms-of-services`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cancellation-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/booking-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/code-of-conduct`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/secure-bookings-and-payments`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/trusted-host-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  // ── TODO: Dynamic hotel/tour detail pages ──
  // When ready, fetch hotel/tour IDs from your API and map them:
  //
  // const hotelIds = await fetchAllHotelIds();
  // const hotelPages = hotelIds.map((id) => ({
  //   url: `${SITE_URL}/hotels/${id}`,
  //   lastModified: now,
  //   changeFrequency: "weekly" as const,
  //   priority: 0.6,
  // }));
  //
  // return [...staticPages, ...hotelPages, ...tourPages];

  return staticPages;
}
