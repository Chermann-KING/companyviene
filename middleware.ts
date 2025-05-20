import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/request";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logger } from "@/lib/logger";

const middleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export default middleware;

export const config = {
  matcher: [
    "/",
    "/(fr|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|public|assets/).*)",
  ],
};

// Configuration de la limitation de débit
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requêtes par 10 secondes
  analytics: true,
  prefix: "ratelimit",
});

// Liste des chemins d'API à protéger
const PROTECTED_PATHS = ["/api/contact", "/api/candidature"];
