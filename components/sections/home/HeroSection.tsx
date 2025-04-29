"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

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
            <h1 className="text-4xl tracking-tight font-extrabold text-secondary-main sm:text-5xl md:text-6xl">
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
            <div>
              <Link
                href="/services"
                className="inline-flex items-center group hover:underline text-lg font-medium"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-main rounded-full flex items-center justify-center mr-3 group-hover:bg-primary-dark transition-colors duration-300">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                  <span>{t("cta")}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
