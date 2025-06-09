"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// Chemins des images
const imagePaths = {
  digitalisation: "/assets/images/domaine-digitalisation.png",
  optimisation: "/assets/images/domaine-optimisation.png",
  durabilite: "/assets/images/domaine-durabilite.png",
  performance: "/assets/images/domaine-performance.png",
  energie: "/assets/images/domaine-energie.png",
};

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
    imageSrc: imagePaths.digitalisation,
    descriptionKey: "digitalisation.description",
  },
  {
    id: 2,
    titleKey: "optimisation.title",
    imageSrc: imagePaths.optimisation,
    descriptionKey: "optimisation.description",
  },
  {
    id: 3,
    titleKey: "durabilite.title",
    imageSrc: imagePaths.durabilite,
    descriptionKey: "durabilite.description",
  },
  {
    id: 4,
    titleKey: "performance.title",
    imageSrc: imagePaths.performance,
    descriptionKey: "performance.description",
  },
  {
    id: 5,
    titleKey: "energie.title",
    subtitle: "Production - Distribution - Transport - Fourniture",
    imageSrc: imagePaths.energie,
    descriptionKey: "energie.description",
  },
];

export default function DomainesActivites() {
  const t = useTranslations("DomainesActivites");

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight font-extrabold text-secondary-main">
            {t("title")}
            <span className="block text-primary-main mt-2">
              {t("titleHighlight")}
            </span>
          </h2>
        </div>

        {/* Grille de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {domaines.map((domaine) => (
            <div
              key={domaine.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 md:p-8 flex flex-col items-center text-center h-full"
            >
              {/* Image circulaire */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 border-4 border-primary-main/20 rounded-full overflow-hidden mb-6 md:mb-8 mx-auto">
                <Image
                  className="object-cover w-full h-full"
                  src={domaine.imageSrc}
                  alt={t(`${domaine.titleKey}`)}
                  fill
                  sizes="(max-width: 768px) 96px, (max-width: 1024px) 112px, 112px"
                  quality={85}
                  loading="lazy"
                />
              </div>

              {/* Titre et sous-titre */}
              <div className="flex flex-col gap-2 mb-2">
                <h3 className="text-xl md:text-2xl font-bold text-secondary-main">
                  {t(`${domaine.titleKey}`)}
                </h3>
                {domaine.subtitle && (
                  <h4 className="text-primary-main text-base md:text-lg font-semibold">
                    {domaine.subtitle}
                  </h4>
                )}
              </div>

              {/* Description */}
              <p className="mt-2 text-gray-600 text-base md:text-lg leading-relaxed">
                {t(`${domaine.descriptionKey}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
