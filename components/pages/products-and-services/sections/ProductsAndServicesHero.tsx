"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ProductsAndServicesHero() {
  const t = useTranslations("productsandservices.hero");

  return (
    <section className="relative flex items-center w-full bg-white overflow-hidden min-h-[calc(100vh-64px)]">
      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 lg:pr-0 py-12 lg:py-16">
        {/* Content wrapper */}
        <div className="relative flex flex-col lg:flex-row items-center w-full">
          {/* Texte */}
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <h1 className="text-4xl tracking-tight font-extrabold text-secondary-main sm:text-5xl md:text-6xl leading-none  max-w-lg">
              {t("title")}
              <div className="block mt-2">
                <span>{t("titleOur")} </span>
                <span className="text-primary-main">{t("titleProducts")}</span>
              </div>
              <div className="block mt-2">
                <span>{t("titleAnd")} </span>
                <span className="text-primary-main">{t("titleServices")}</span>
              </div>
            </h1>
            <p className="mt-6 text-gray-600 text-xl text-justify max-w-lg">
              {t("description")}
            </p>
          </div>

          {/* Image */}
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
            <Image
              src="/assets/images/companyviene-produits-services.png"
              alt="Illustration des produits et services CompanyViene"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
