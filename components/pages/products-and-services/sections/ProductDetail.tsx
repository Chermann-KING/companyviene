"use client";

import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const ICON_MAP: Record<string, string> = {
  DoctoViene: "/assets/icons/doctoviene.webp",
  VieneRegister: "/assets/icons/viene.webp",
  ArchiViene: "/assets/icons/viene.webp",
  VieneID: "/assets/icons/viene.webp",
  VieneCheckIn: "/assets/icons/viene.webp",
  OkiraLib: "/assets/icons/viene.webp",
  OkiraViene: "/assets/icons/viene.webp",
  VieneBid: "/assets/icons/viene.webp",
};

const PAGE_SLUG: Record<string, string> = {
  fr: "produits-et-services",
  en: "products-and-services",
};

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const t = useTranslations("productsandservices.products");
  const locale = useLocale();
  const icon = ICON_MAP[productId] ?? "/assets/icons/viene.webp";
  const backHref = `/${locale}/${PAGE_SLUG[locale] ?? "products-and-services"}`;

  const features = (t.raw(`${productId}.features`) || []) as string[];
  const servicesList = (t.raw(`${productId}.servicesList`) || []) as {
    title: string;
    items: string[];
  }[];
  const benefits = (t.raw(`${productId}.benefits`) || []) as string[];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Retour */}
        <Link
          href={backHref}
          className="inline-flex items-center text-sm text-primary-main font-semibold hover:underline mb-10"
        >
          {t("backToProducts")}
        </Link>

        {/* Hero produit */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-16 h-16 relative shrink-0">
              <Image
                src={icon}
                alt={t(`${productId}.title`)}
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-secondary-main leading-tight">
                {t(`${productId}.title`)}
              </h1>
              <p className="text-gray-500 text-base mt-1">
                {t(`${productId}.subtitle`)}
              </p>
            </div>
          </div>
          <p className="text-gray-700 text-lg leading-relaxed">
            {t(`${productId}.description`)}
          </p>
        </div>

        {/* Fonctionnalités clés */}
        {features.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-secondary-main mb-5">
              {t("featuresTitle")}
            </h2>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary-main shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Services */}
        {servicesList.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-secondary-main mb-5">
              {t(`${productId}.servicesTitle`)}
            </h2>
            <div className="space-y-6">
              {servicesList.map((service, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold text-secondary-main mb-2">
                    {service.title}
                  </h3>
                  <ul className="space-y-1 pl-4">
                    {service.items.map((item, subIdx) => (
                      <li
                        key={subIdx}
                        className="flex items-start gap-2 text-gray-600 text-sm"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Avantages */}
        {benefits.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-secondary-main mb-5">
              {t(`${productId}.benefitsTitle`)}
            </h2>
            <ul className="space-y-3">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-1 w-2 h-2 rounded-full bg-primary-main shrink-0" />
                  <span className="text-gray-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Cas d'usage — VieneRegister uniquement */}
        {productId === "VieneRegister" && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-secondary-main mb-4">
              {t("VieneRegister.useCasesTitle")}
            </h2>
            <p className="text-gray-600">{t("VieneRegister.useCases")}</p>
          </div>
        )}

        {/* Équipement optionnel — ArchiViene uniquement */}
        {productId === "ArchiViene" && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-secondary-main mb-4">
              {t("ArchiViene.optionalEquipmentTitle")}
            </h2>
            <p className="text-gray-600">{t("ArchiViene.optionalEquipment")}</p>
          </div>
        )}

        {/* Retour bas de page */}
        <Link
          href={backHref}
          className="inline-flex items-center text-sm text-primary-main font-semibold hover:underline mt-4"
        >
          {t("backToProducts")}
        </Link>
      </div>
    </div>
  );
}
