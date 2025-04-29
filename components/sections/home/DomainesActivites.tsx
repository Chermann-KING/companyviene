import React from "react";
import Image from "next/image";

// Définition du type pour les données des domaines
type Domaine = {
  id: number;
  title: string;
  subtitle?: string;
  imageSrc: string;
  description: string;
};

// Données des domaines d'activités
const domaines: Domaine[] = [
  {
    id: 1,
    title: "Digitalisation, Transformation numérique & Design numérique",
    imageSrc: "/assets/images/domaine-digitalisation.png",
    description:
      "Les outils digitaux offrent de formidables possibilités dans l’amélioration de processus dans tous les secteurs d’activité. CompanyViene se propose via son service VieneDesign de vous accompagner dans votre transformation digitale, tout en prenant soin des aspects de protection des données et de cyber sécurité.",
  },
  {
    id: 2,
    title: "Optimisation des Processus de gestion (As-Is →To-be)",
    imageSrc: "/assets/images/domaine-optimisation.png",
    description:
      "CompanyViene dans ce service propose de vous supporter dans l’établissement d’État des lieux schématique des Processus existants (AS-IS), qui ouvre la voie à une seconde étape de propositions optimisées, à forte valeur ajoutée et simplifiées (TO-BE).",
  },
  {
    id: 3,
    title: "Durabilité & économies circulaires",
    imageSrc: "/assets/images/domaine-durabilite.png",
    description:
      "CompanyViene vous accompagne dans la Mesure et la réduction de l'impact environnemental, ceci en proposant des outils et solutions digitales. Ce service permet également d'intégrer les piliers de durabilité (environnement, économie, social) dans nos forces de propositions pour vous permettre d'aboutir à la réalisation de produits durables, recyclables ou réutilisables.",
  },
  {
    id: 4,
    title: "Performance énergétique des bâtiments",
    imageSrc: "/assets/images/domaine-performance.png",
    description:
      "CompanyViene grâce au service VieneHouse vous accompagne dans la maîtrise de consommation en intégrant les notions de rafraîchissement passif pour vous permettre d'économiser jusqu'à 30% de votre consommation dues aux besoins en rafraîchissement des espaces de vie.",
  },
  {
    id: 5,
    title: "Energie & Utilités - Electricité/Eau/Gaz:",
    subtitle: "Production - Distribution - Transport - Fourniture",
    imageSrc: "/assets/images/domaine-energie.png",
    description:
      "CompanyViene, vous propose un accompagnement dans les questions des énergies, de l'eau et leur utilisation efficiente. CompanyViene propose des études & Solutions sur l'utilisation des énergies fossiles, combinées aux nouvelles ressources renouvelables. EnerViene propose également des analyses sur les perspectives de besoins des marchés.",
  },
];

export default function DomainesActivites() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Nos domaines d'
          <span className="text-primary-main">activités</span>
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
                  alt={domaine.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Titre et sous-titre */}
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-base font-bold text-secondary-main text-left">
                  {domaine.title}
                </h3>
                {domaine.subtitle && (
                  <h4 className="text-sm text-gray-500 text-left">
                    {domaine.subtitle}
                  </h4>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-gray-600 text-left">
                {domaine.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
