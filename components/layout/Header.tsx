"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Navigation from "./Navigation";
import { useTranslations } from "next-intl";
import getLocalizedPath from "@/utils/getLocalizedPath";
import LanguageSelector from "@/components/ui/LanguageSelector";

const locales = ["fr", "en"] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("header");

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-main">
                company<span className="text-green-700">V</span>iene
              </span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <Navigation />

          {/* Language selector */}
          <div className="hidden md:flex items-center">
            <LanguageSelector
              locales={[...locales]}
              getLocalizedPath={getLocalizedPath}
              t={t}
            />
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
            <div className="flex items-center px-3 py-2">
              <LanguageSelector
                locales={[...locales]}
                getLocalizedPath={getLocalizedPath}
                t={t}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
