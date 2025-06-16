"use client";

import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { PhoneCall, Clock8, Linkedin } from "lucide-react";

export default function TopHeader() {
  const t = useTranslations("topHeader");
  const locale = useLocale() as "fr" | "en";
  const pathname = usePathname();

  // Affiche uniquement sur la home
  if (pathname !== `/${locale}`) {
    return null;
  }

  return (
    <div className="bg-primary-main text-white text-sm w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-8 px-4 sm:px-6 lg:px-8">
        {/* Contact */}
        <div className="flex items-center">
          <PhoneCall size={16} className="inline mr-2" />
          {t("phone")}
          <Clock8 size={16} className="inline mx-2" />
          {t("hours")}
        </div>
        {/* Social media */}
        <div className="flex space-x-6">
          <a
            href="https://linkedin.com/company/companyviene"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition-colors duration-200"
            aria-label={t("social.linkedin")}
          >
            <Linkedin size={16} className="inline" />
          </a>
        </div>
      </div>
    </div>
  );
}
