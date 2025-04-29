"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutObjectives() {
  const t = useTranslations("about.objectives");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="/assets/images/companyviene-objectif.png"
              alt="Les objectifs de CompanyViene"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Texte */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("title")}{" "}
              <span className="text-primary-main">{t("titleHighlight")}</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
