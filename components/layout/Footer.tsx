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
    <footer className="bg-gray-800 text-white  py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          {/* Quick Info */}
          <div className="mb-4 md:mb-0">
            <p className="text-2xl font-bold text-green-400">
              company<span className="text-green-300">V</span>iene
            </p>
            <p className="text-gray-400 mt-1">{t("quickInfos.description")}</p>
          </div>

          {/* Quick Links dynamiques */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((item) => (
                <li key={item.nameKey}>
                  <Link
                    href={`/${locale}/${
                      SLUGS[item.slugKey as keyof typeof SLUGS][locale]
                    }`}
                    className="hover:text-primary-main"
                  >
                    {t(`quickLinks.${item.nameKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("social.title")}</h3>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/company/companyviene"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-main"
                aria-label={t("social.linkedin")}
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-400 mt-1">
              © {new Date().getFullYear()} CompanyViene. {t("copyright")}
            </p>
          </div>

          <div className="flex space-x-6">
            <Link
              href={`/${locale}/${SLUGS.privacy[locale]}`}
              className="text-sm text-gray-400 hover:text-primary-main"
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
