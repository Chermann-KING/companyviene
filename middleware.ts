import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/settings";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { logger } from "@/lib/logger";

const intlMiddleware = createMiddleware({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "always",
});

export default async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Ajouter les en-têtes de sécurité
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "origin-when-cross-origin");
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://www.google.com; frame-src 'self' https://www.google.com;"
  );

  // Vérifier si le chemin est protégé
  const isProtectedPath = PROTECTED_PATHS.some((path) =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPath) {
    try {
      const ip =
        request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1";
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      response.headers.set("X-RateLimit-Limit", limit.toString());
      response.headers.set("X-RateLimit-Remaining", remaining.toString());
      response.headers.set("X-RateLimit-Reset", reset.toString());

      if (!success) {
        await logger.warn("Limite de débit dépassée", {
          ip,
          path: request.nextUrl.pathname,
          userAgent: request.headers.get("user-agent") || "unknown",
        });

        return new NextResponse(
          JSON.stringify({
            error: "Trop de requêtes, veuillez réessayer plus tard",
          }),
          {
            status: 429,
            headers: {
              "Content-Type": "application/json",
              ...Object.fromEntries(response.headers),
            },
          }
        );
      }
    } catch (error) {
      await logger.error("Erreur dans le middleware", {
        error: error instanceof Error ? error.message : "Unknown error",
        stack: error instanceof Error ? error.stack : undefined,
        path: request.nextUrl.pathname,
        ip:
          request.headers.get("x-forwarded-for")?.split(",")[0] ?? "127.0.0.1",
      });
    }
  }

  // Appliquer le middleware d'internationalisation
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(fr|en)/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
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
