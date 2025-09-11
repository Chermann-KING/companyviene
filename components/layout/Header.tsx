"use client";

import Link from "next/link";
import Image from "next/image";
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

  // Fonction pour fermer le menu mobile
  const handleNavigate = () => setIsMenuOpen(false);

  return (
    <header className="bg-white shadow-md py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center -mt-2.5">
              <Image
                src="/assets/images/logo-companyViene-1024x216.png"
                alt="CompanyViene Logo"
                width={200}
                height={42}
                priority
                className="h-auto"
              />
            </Link>
          </div>

          {/* Navigation desktop */}
          <Navigation />

          {/* Language selector */}
          <div className="hidden md:flex items-center ml-8">
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
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Navigation mobile onNavigate={handleNavigate} />
            {/* Language selector mobile */}
            <div className="flex items-center px-3 py-3 border-t border-gray-100 mt-4">
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
