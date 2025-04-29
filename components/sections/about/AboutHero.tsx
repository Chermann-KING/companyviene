"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("title")}{" "}
              <span className="text-primary-main">{t("titleHighlight")}</span>
            </h1>
            <p className="text-gray-600 text-lg">{t("description")}</p>
          </div>

          {/* Image */}
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/assets/images/companyviene-partenaires.png"
              alt="Partenaires de CompanyViene dans le monde"
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
