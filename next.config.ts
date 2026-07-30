import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // ── Output ────────────────────────────────────────────────
  // Use "standalone" for Docker / self-hosted deployments.
  // Comment out if deploying to Vercel (not needed there).
  // output: "standalone",

  // ── Images ───────────────────────────────────────────────
  // Allowlist external image domains used in the app.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── Compression ──────────────────────────────────────────
  compress: true,

  // ── Power By Header ──────────────────────────────────────
  // Remove "X-Powered-By: Next.js" header for security.
  poweredByHeader: false,

  // ── Security Headers ─────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Enable XSS protection in older browsers
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Prevent MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Strict HTTPS (1 year, includes subdomains)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          // Referrer policy — send origin only on cross-origin
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Permissions policy — disable unused APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          // Basic Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Next.js dev HMR; tighten in strict prod
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://images.unsplash.com https://plus.unsplash.com",
              "connect-src 'self'",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
      // Long-lived cache for static assets
      {
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache public images / fonts
      {
        source: "/(.*)\\.(ico|svg|png|jpg|jpeg|webp|avif|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },

  // ── Redirects ─────────────────────────────────────────────
  async redirects() {
    return [
      // Add permanent redirects here if you rename routes.
      // { source: "/old-path", destination: "/new-path", permanent: true },
    ];
  },
};

export default nextConfig;
