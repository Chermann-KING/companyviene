"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Définition du type pour les données des domaines
type Domaine = {
  id: number;
  titleKey: string;
  subtitle?: string;
  imageSrc: string;
  descriptionKey: string;
};

// Données des domaines d'activités
const domaines: Domaine[] = [
  {
    id: 1,
    titleKey: "digitalisation.title",
    imageSrc: "/assets/images/domaine-digitalisation.png",
    descriptionKey: "digitalisation.description",
  },
  {
    id: 2,
    titleKey: "optimisation.title",
    imageSrc: "/assets/images/domaine-optimisation.png",
    descriptionKey: "optimisation.description",
  },
  {
    id: 3,
    titleKey: "durabilite.title",
    imageSrc: "/assets/images/domaine-durabilite.png",
    descriptionKey: "durabilite.description",
  },
  {
    id: 4,
    titleKey: "performance.title",
    imageSrc: "/assets/images/domaine-performance.png",
    descriptionKey: "performance.description",
  },
  {
    id: 5,
    titleKey: "energie.title",
    subtitle: "Production - Distribution - Transport - Fourniture",
    imageSrc: "/assets/images/domaine-energie.png",
    descriptionKey: "energie.description",
  },
];

export default function DomainesActivites() {
  const t = useTranslations("DomainesActivites");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {t("title")}
          <span className="text-primary-main">{t("titleHighlight")}</span>
        </h2>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {domaines.map((domaine) => (
            <div
              key={domaine.id}
              className="flex flex-col items-center gap-4 text-center bg-white px-4 py-4 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image circulaire */}
              <div className="relative w-32 h-32 border-4 border-gray-300 rounded-full overflow-hidden">
                <Image
                  src={domaine.imageSrc}
                  alt={t(`${domaine.titleKey}`)}
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 128px, 128px"
                  className="object-cover"
                  quality={75}
                  loading="lazy"
                />
              </div>

              {/* Titre et sous-titre */}
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-base font-bold text-secondary-main text-left">
                  {t(`${domaine.titleKey}`)}
                </h3>
                {domaine.subtitle && (
                  <h4 className="text-sm text-gray-500 text-left">
                    {domaine.subtitle}
                  </h4>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 text-left">
                {t(`${domaine.descriptionKey}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
