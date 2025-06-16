"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutStructure() {
  const t = useTranslations("about.structure");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <h2 className="text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl leading-none">
          {t("title")}{" "}
          <span className="text-primary-main">{t("titleHighlight")}</span>
        </h2>

        {/* <div className="space-y-16"> */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          {/* VieneEngineering */}
          <div className="flex flex-col gap-4 justify-start items-start text-justify px-2 sm:px-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-2">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-4 border-gray-300 rounded-full overflow-hidden">
                <Image
                  src="/assets/images/icon-Viene.png"
                  alt="Picto companyViene"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-left leading-none">
                {t("vieneEngineering.title")}
              </h3>
            </div>
            <p className="text-gray-600 text-xl text-justify">
              {t("vieneEngineering.description")}
            </p>
            <p className="text-gray-800 text-xl font-medium">
              {t("vieneEngineering.strategy")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-xl ml-4">
              {[0, 1, 2].map((index) => (
                <li key={index} className="pl-2">
                  {t(`vieneEngineering.steps.${index}`)}
                </li>
              ))}
            </ul>
            <p className="text-gray-600 text-xl">
              {t("vieneEngineering.conclusion")}
            </p>
          </div>

          {/* VieneBusiness */}
          <div className="flex flex-col gap-4 justify-start items-start text-justify">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20 border-4 border-gray-300 rounded-full overflow-hidden">
                <Image
                  src="/assets/images/icon-Viene.png"
                  alt="Picto companyViene"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-left">
                {t("vieneBusiness.title")}
              </h3>
            </div>
            <p className="text-gray-600 text-xl">
              {t("vieneBusiness.description")}
            </p>
            <p className="text-gray-600 text-xl">
              {t("vieneBusiness.additional")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
