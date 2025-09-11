"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import CtaButton from "@/components/ui/CtaButton";
import { navigation } from "@/config/navigation";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale() as "fr" | "en";

  // Construire l'URL dynamique pour le bouton CTA vers la page produits/services
  const getProductsUrl = () => {
    const productsNavItem = navigation.main.find(
      (item) => item.nameKey === "products"
    );
    if (productsNavItem) {
      return `/${locale}${productsNavItem.href[locale]}`;
    }
    // Fallback au cas où
    return `/${locale}/produits-et-services`;
  };

  return (
    // <div className="relative bg-white overflow-hidden h-[calc(100vh-80px)] flex items-center justify-center">
    <div className="relative bg-white overflow-hidden h-[30vh] mt-8 sm:mt-0 sm:h-[80vh] lg:h-[calc(100vh-64px)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-banner-viene.webp"
          alt="Hero banner CompanyViene"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/10"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center md:items-start h-full px-4 sm:px-8">
        <div className="w-full md:w-2/3 lg:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
          {/* Title */}
          <h1 className="mt-5 sm:mt-48 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight font-extrabold leading-tight text-secondary-main text-wrap">
            <div className="block mb-2">
              {t("title.leverageyour")}{" "}
              <span className="text-primary-main font-bold">
                {t("title.capacity")}
              </span>
              <span> {t("title.and")} </span>
              <span className="text-primary-main font-bold">
                {t("title.gobeyond")}
              </span>
            </div>
          </h1>

          {/* Call to action buttons */}
          <div className="mt-4">
            <CtaButton
              href={getProductsUrl()}
              label={t("cta")}
              className="text-base sm:text-lg py-3 sm:py-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
