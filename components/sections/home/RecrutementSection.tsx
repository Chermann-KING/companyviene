import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function RecrutementSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12">
          {/* Image à gauche */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative rounded-lg overflow-hidden">
            <Image
              src="/assets/images/comapnyviene-recrutement.png"
              alt="CompanyViene Recrutement - Poignée de main"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover"
              quality={75}
              priority
            />
          </div>

          {/* Contenu texte à droite */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {/* Titre */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recrutement en local
              <br />
              de <span className="text-primary-main">Consultants</span>
            </h2>

            {/* Description */}
            <p className="text-gray-700 mb-8">
              Vous êtes jeune diplômé(e) dans les métiers digitaux ou
              d'ingénierie? Postulez pour un stage chez nous
            </p>

            {/* Bouton de candidature */}
            <div>
              <Link
                href="/candidature"
                className="inline-flex items-center group hover:underline text-lg font-medium"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-main rounded-full flex items-center justify-center mr-3 group-hover:bg-primary-dark transition-colors duration-300">
                    <ArrowRight className="h-6 w-6 text-white" />
                  </div>
                  <span>Soumettre une candidature</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
