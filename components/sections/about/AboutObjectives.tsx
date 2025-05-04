"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutObjectives() {
  const t = useTranslations("about.objectives");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative w-full lg:w-1/2 h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <Image
              src="/assets/images/companyviene-objectif.png"
              alt="Les objectifs de CompanyViene"
              fill
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>

          {/* Texte */}
          <div>
            <h2 className="text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl leading-none">
              {t("title")}{" "}
              <span className="text-primary-main">{t("titleHighlight")}</span>
            </h2>
            <p className="mt-6 text-gray-600 text-xl text-justify max-w-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
