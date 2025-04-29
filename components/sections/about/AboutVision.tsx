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
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-16">
          {t("title")}{" "}
          <span className="text-primary-main">{t("titleHighlight")}</span>
        </h2>

        {/* Grille des valeurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className="flex flex-col items-center text-left p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
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
              <h3 className="self-start text-xl font-semibold text-secondary-main mb-4">
                {t(`values.${value.id}.title`)}
              </h3>

              {/* Description */}
              <p className="text-gray-600">
                {t(`values.${value.id}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
