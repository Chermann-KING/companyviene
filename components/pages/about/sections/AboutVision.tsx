"use client";
import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const values = [
  {
    id: "development",
    icon: "/assets/images/values/developpement.png",
  },
  {
    id: "sharing",
    icon: "/assets/images/values/partage.png",
  },
  {
    id: "simplicity",
    icon: "/assets/images/values/simplicite.png",
  },
  {
    id: "equity",
    icon: "/assets/images/values/equite.png",
  },
  {
    id: "profitability",
    icon: "/assets/images/values/rentabilite.png",
  },
];

export default function AboutVision() {
  const t = useTranslations("about.vision");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <h2 className="text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl mb-12">
          {t("title")}{" "}
          <span className="text-primary-main">{t("titleHighlight")}</span>
        </h2>

        {/* Valeurs */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> */}
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          {values.map((value) => (
            <div
              key={value.id}
              className="flex flex-col p-6 rounded-lg shadow-lg transition-shadow duration-300"
            >
              {/* Icône */}
              <div className="relative self-start w-24 h-24  border-4 border-gray-300 rounded-full overflow-hidden mb-6">
                <Image
                  src={value.icon}
                  alt={t(`values.${value.id}.title`)}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Titre */}
              <h3 className="text-2xl md:text-3xl font-bold text-left leading-none">
                {t(`values.${value.id}.title`)}
              </h3>

              {/* Description */}
              <p className="mt-6 text-gray-600 text-xl text-justify max-w-lg">
                {t(`values.${value.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
