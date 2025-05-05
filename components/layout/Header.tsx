"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Navigation from "./Navigation";
import { useTranslations } from "next-intl";
import { getTranslatedSlug } from "@/config/navigation";

const locales = ["fr", "en"] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("header");
  const nav = useTranslations("navigation");

  // Fonction pour obtenir le chemin dans une autre langue
  const getLocalizedPath = (locale: string) => {
    const segments = pathname.split("/");
    const currentLocale = segments[1];
    const currentSlug = segments[2];

    // Si on est sur la home, pas de slug à traduire
    if (!currentSlug) {
      segments[1] = locale;
      return segments.join("/");
    }

    // Traduire le slug si possible
    const translatedSlug = getTranslatedSlug(
      currentSlug,
      currentLocale,
      locale
    );
    segments[1] = locale;
    segments[2] = translatedSlug;
    return segments.join("/");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-main">
                CompanyViene
              </span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-8">
            <Navigation />
          </nav>

          {/* Language selector */}
          <div className="hidden md:flex items-center space-x-4">
            {locales.map((locale, index) => (
              <div key={locale} className="flex items-center">
                {index > 0 && <span className="text-gray-300">|</span>}
                <Link
                  key={locale}
                  href={getLocalizedPath(locale)}
                  className={`text-sm font-medium ${
                    pathname.startsWith(`/${locale}`)
                      ? "text-primary-main"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {t(`languageSelector.${locale}`)}
                </Link>
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Navigation mobile />
            {/* Language selector mobile */}
            <div className="flex items-center space-x-4 px-3 py-2">
              {locales.map((locale, index) => (
                <>
                  {index > 0 && <span className="text-gray-300">|</span>}
                  <Link
                    key={locale}
                    href={getLocalizedPath(locale)}
                    className={`text-sm font-medium ${
                      pathname.startsWith(`/${locale}`)
                        ? "text-primary-main"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {t(`languageSelector.${locale}`)}
                  </Link>
                </>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
