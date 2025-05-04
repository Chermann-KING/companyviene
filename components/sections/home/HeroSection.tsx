"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import CtaButton from "@/components/ui/CtaButton";

export default function HeroSection() {
  const t = useTranslations("hero");

  return (
    <div className="relative bg-white overflow-hidden h-[calc(100vh-64px)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/hero-banner-viene.webp"
          alt="Hero banner CompanyViene"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto h-full">
        <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
          {/* Content wrapper */}
          <div className="w-full lg:w-1/2">
            {/* Title */}
            <h1 className="text-4xl tracking-tight font-extrabold leading-[1.1] text-secondary-main sm:text-5xl md:text-6xl mb-12">
              <div className="block">{t("title.line1")}</div>
              <div className="block">{t("title.line2")}</div>
              <div className="block">
                <span>{t("title.line3")} </span>
                <span className="text-primary-main">
                  {t("title.engineering")}
                </span>
              </div>
              <div className="block">
                <span>{t("title.line4")} </span>
                <span className="text-primary-main">
                  {t("title.digitalisation")}
                </span>
              </div>
            </h1>

            {/* Call to action buttons */}
            <CtaButton href={"/produits-services"} label={t("cta")} />
          </div>
        </div>
      </div>
    </div>
  );
}
