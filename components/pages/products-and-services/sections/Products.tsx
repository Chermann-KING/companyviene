"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const PRODUCT_IDS = [
  {
    id: "DoctoViene",
    icon: "/assets/icons/doctoviene.webp",
    slug: "doctoviene",
  },
  {
    id: "VieneRegister",
    icon: "/assets/icons/viene.webp",
    slug: "viene-register",
  },
  { id: "ArchiViene", icon: "/assets/icons/viene.webp", slug: "archiviene" },
  { id: "VieneID", icon: "/assets/icons/viene.webp", slug: "viene-id" },
  {
    id: "VieneCheckIn",
    icon: "/assets/icons/viene.webp",
    slug: "viene-checkin",
  },
  { id: "OkiraLib", icon: "/assets/icons/viene.webp", slug: "okira-lib" },
  { id: "OkiraViene", icon: "/assets/icons/viene.webp", slug: "okira-viene" },
  { id: "VieneBid", icon: "/assets/icons/viene.webp", slug: "viene-bid" },
];

const PAGE_SLUG: Record<string, string> = {
  fr: "produits-et-services",
  en: "products-and-services",
};

export default function Products() {
  const t = useTranslations("productsandservices.products");
  const locale = useLocale();
  const pageSlug = PAGE_SLUG[locale] ?? "products-and-services";

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl mb-16">
          {t("title")}{" "}
          <span className="text-primary-main">{t("titleHighlight")}</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCT_IDS.map(({ id, icon, slug }) => (
            <Link
              key={id}
              href={`/${locale}/${pageSlug}/${slug}`}
              className="group bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all flex flex-col gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 relative shrink-0">
                  <Image
                    src={icon}
                    alt={t(`${id}.title`)}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-bold text-secondary-main group-hover:text-primary-main transition-colors leading-snug">
                    {t(`${id}.title`)}
                  </h3>
                  <p className="text-xs text-gray-400 leading-snug mt-0.5 line-clamp-2">
                    {t(`${id}.subtitle`)}
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                {t(`${id}.description`)}
              </p>

              <span className="text-sm font-semibold text-primary-main group-hover:underline">
                {t("learnMore")} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
