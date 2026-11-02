import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent MIME type sniffing
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  // Prevent clickjacking
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  // XSS Protection (legacy browsers)
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  // DNS prefetch for performance (SEO signal)
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  // Referrer policy for privacy + link attribution
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // Strict Transport Security (HTTPS enforced)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Permissions Policy
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self)",
  },
];

const nextConfig: NextConfig = {
  /* config options here */
  // Forced config reload to pick up inngest dependency

  // Compress responses for faster page loads (Core Web Vitals)
  compress: true,

  // Powered-by header removed for security
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },

  // Security headers applied to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  // Proxy BetterAuth requests so cookies are set first-party on frontend origin
  async rewrites() {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";
    const cleanBackend = backendUrl
      .trim()
      .replace(/\/+$/, "")
      .replace(/\/api\/v1\/?$/, "");
    return [
      {
        source: "/api/auth/:path*",
        destination: `${cleanBackend}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
