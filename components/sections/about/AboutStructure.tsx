"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutStructure() {
  const t = useTranslations("about.structure");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-16">
          {t("title")}{" "}
          <span className="text-primary-main">{t("titleHighlight")}</span>
        </h2>

        {/* <div className="space-y-16"> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* EnerViene */}
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
                {t("enerViene.title")}
              </h3>
            </div>
            <p className="text-gray-600">{t("enerViene.description")}</p>
            <p className="text-gray-800 font-medium">
              {t("enerViene.strategy")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-4">
              {[0, 1, 2].map((index) => (
                <li key={index} className="pl-2">
                  {t(`enerViene.steps.${index}`)}
                </li>
              ))}
            </ul>
            <p className="text-gray-600">{t("enerViene.conclusion")}</p>
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
            <p className="text-gray-600">{t("vieneBusiness.description")}</p>
            <p className="text-gray-600">{t("vieneBusiness.additional")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
