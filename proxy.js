import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * Locale-detection/redirect proxy (Next.js 16 renamed `middleware` ->
 * `proxy` — see node_modules/next/dist/docs/.../file-conventions/proxy.md).
 * All it does is delegate to next-intl's routing middleware: negotiate
 * Accept-Language on "/" and redirect into "/ar" or "/en", and validate the
 * locale segment on every other request.
 */
const intlMiddleware = createMiddleware(routing);

export function proxy(request) {
  return intlMiddleware(request);
}

export const config = {
  // Skip API-less static assets, Next internals, and files with an
  // extension (images, favicon, etc.) — run on every page route.
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
