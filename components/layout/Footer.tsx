"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SLUGS } from "@/config/navigation";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale() as "fr" | "en";

  // Génère dynamiquement les liens rapides à partir de la config
  const quickLinks = [
    { nameKey: "about", slugKey: "about" },
    { nameKey: "products", slugKey: "products" },
    { nameKey: "contact", slugKey: "contact" },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12">
          {/* Quick Info */}
          <div className="mb-6 md:mb-0">
            <p className="text-3xl font-bold text-green-400 tracking-tight">
              company<span className="text-green-300">V</span>iene
            </p>
            <p className="text-gray-300 mt-3 text-lg leading-relaxed">
              {t("quickInfos.description")}
            </p>
          </div>

          {/* Quick Links dynamiques */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((item) => (
                <li key={item.nameKey}>
                  <Link
                    href={`/${locale}/${
                      SLUGS[item.slugKey as keyof typeof SLUGS][locale]
                    }`}
                    className="text-gray-300 hover:text-primary-main text-lg transition-colors duration-200"
                  >
                    {t(`quickLinks.${item.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">
              {t("social.title")}
            </h3>
            <div className="flex space-x-6">
              <Link
                href="https://linkedin.com/company/companyviene"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-main transition-colors duration-200"
                aria-label={t("social.linkedin")}
              >
                <Linkedin className="w-7 h-7" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 text-base">
              © {new Date().getFullYear()} CompanyViene. {t("copyright")}
            </p>
          </div>

          <div className="flex space-x-8">
            <Link
              href={`/${locale}/${SLUGS.privacy[locale]}`}
              className="text-base text-gray-400 hover:text-primary-main transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
