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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <h2 className="text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl mb-12">
          {t("title")}
          <span className="text-primary-main">{t("titleHighlight")}</span>
        </h2>

        {/* Grille de cartes */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"> */}
        <div className="mt-6 mb-12 flex flex-wrap justify-center gap-8">
          {domaines.map((domaine) => (
            <div
              key={domaine.id}
              className=" w-[350px] flex flex-col p-6 rounded-lg shadow-lg transition-shadow duration-300"
            >
              {/* Image circulaire */}{" "}
              <div className="relative self-start w-24 h-24 border-4 border-gray-300 rounded-full overflow-hidden mb-6">
                <Image
                  className="object-cover w-full h-full"
                  src={domaine.imageSrc}
                  alt={t(`${domaine.titleKey}`)}
                  fill
                  sizes="(max-width: 768px) 128px, (max-width: 1024px) 128px, 128px"
                  quality={75}
                  loading="lazy"
                />
              </div>
              {/* Titre et sous-titre */}
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-2xl md:text-3xl font-bold text-left leading-none">
                  {t(`${domaine.titleKey}`)}
                </h3>
                {domaine.subtitle && (
                  <h4 className="text-gray-500 text-xl md:text-2xl font-bold text-left leading-none">
                    {domaine.subtitle}
                  </h4>
                )}
              </div>
              {/* Description */}
              <p className="mt-6 text-gray-600 text-xl max-w-lg">
                {t(`${domaine.descriptionKey}`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
