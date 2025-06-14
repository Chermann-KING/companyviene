"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Services() {
  const servicesT = useTranslations("productsandservices.services");

  const services = [
    {
      id: "vieneDesign",
      icon: "/assets/icons/design.svg",
      features: (servicesT.raw("vieneDesign.features") || []) as string[],
    },
    {
      id: "vieneHouse",
      icon: "/assets/icons/house.svg",
      features: (servicesT.raw("vieneHouse.features") || []) as string[],
    },
  ];

  return (
    <section className="relative bg-white overflow-hidden h-[calc(100vh-64px)]py-16">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl mb-16">
          {servicesT("title")}{" "}
          <span className="text-primary-main">
            {servicesT("titleHighlight")}
          </span>
        </h2>

        <div className="grid md:grid-cols-1 gap-8 mb-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 relative mr-4">
                  {/* <Image
                    src={product.icon}
                    alt={servicesT(`${service.id}.title`)}
                    fill
                    className="object-contain"
                  /> */}
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-left leading-none">
                  {servicesT(`${service.id}.title`)}
                </h3>
              </div>

              <p className="text-xl text-gray-600 mb-6">
                {servicesT(`${service.id}.description`)}
              </p>

              {Array.isArray(service.features) &&
                service.features.length > 0 && (
                  <ul className="text-xl space-y-3 mb-6">
                    {service.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

              <div className="mt-6 text-xl text-primary-600 font-medium">
                {servicesT(`${service.id}.status`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
