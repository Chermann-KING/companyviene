"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Formats,
  RichTranslationValues,
  TranslationValues,
  useTranslations,
} from "next-intl";
import { ReactNode } from "react";

type LanguageSelectorProps = {
  locales: string[];
  getLocalizedPath?: (locale: string, anchor?: string) => string;
  t?: {
    <TargetKey extends any>(
      key: TargetKey,
      values?: TranslationValues,
      formats?: Formats
    ): string;
    rich<TargetKey extends any>(
      key: TargetKey,
      values?: RichTranslationValues,
      formats?: Formats
    ): ReactNode;
  };
};

export default function LanguageSelector({
  locales,
  getLocalizedPath: customGetLocalizedPath,
  t: customT,
}: LanguageSelectorProps) {
  const pathname = usePathname();
  const defaultT = useTranslations("header");

  // Use provided translation function or default one
  const t = customT || defaultT;

  // Default getLocalizedPath if none provided
  const getLocalizedPathFunction = (locale: string) => {
    if (customGetLocalizedPath) {
      return customGetLocalizedPath(locale);
    }
    // Simple fallback implementation
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <>
      {locales.map((locale, index) => (
        <div key={locale} className="flex items-center">
          {index > 0 && <span className="text-gray-300 mx-2">|</span>}
          <Link
            href={getLocalizedPathFunction(locale)}
            className={`text-xl font-medium ${
              pathname.startsWith(`/${locale}`)
                ? "text-primary-main"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t(`languageSelector.${locale}`)}
          </Link>
        </div>
      ))}
    </>
  );
}
