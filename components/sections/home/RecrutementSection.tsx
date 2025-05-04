"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CtaButton from "@/components/ui/CtaButton";

export default function RecrutementSection() {
  const t = useTranslations("recruitment");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
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
            <h2 className=" leading-none text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl mb-6">
              <span>{t("title")}</span>
              <span className="flex gap-3">
                <span>{t("titleOf")} </span>
                <span className=" text-primary-main">
                  {t("titleHighlight")}
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className=" text-gray-600 text-xl text-left mb-6">
              {t("description")}
            </p>

            {/* Bouton de candidature */}
            <CtaButton href={"/candidature"} label={t("cta")} />
          </div>
        </div>
      </div>
    </section>
  );
}
