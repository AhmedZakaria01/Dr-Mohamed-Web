import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.js");

// Nonce-based CSP would let us drop 'unsafe-inline' from script-src, but per
// node_modules/next/dist/docs/.../content-security-policy.md it forces every
// page into dynamic rendering (no SSG/ISR/CDN caching) — a bad trade for a
// static marketing site. 'unsafe-inline' is that doc's own recommended
// "without nonces" pattern for static sites; Next's own hydration/RSC
// bootstrap scripts are inline and need it regardless. There is no
// user-generated content rendered as raw HTML anywhere in this app (all
// copy comes from our own content/*.json, React-escaped) other than the
// JSON-LD script this app writes itself, so the residual XSS surface is low.
const isDev = process.env.NODE_ENV === "development";

// 'unsafe-eval' is dev-only: React uses eval() in development to reconstruct
// server-side error stacks in the browser (see the same Next.js CSP doc).
// Neither React nor Next.js use eval() in production.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "frame-src https://www.google.com",
  "connect-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Content-Security-Policy", value: csp },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
