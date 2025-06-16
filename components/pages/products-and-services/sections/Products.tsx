"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Products() {
  const productsT = useTranslations("productsandservices.products");

  const products = [
    {
      id: "DoctoViene",
      icon: "/assets/icons/doctoviene.webp",
      features: (productsT.raw("DoctoViene.features") || []) as string[],
      servicesList: (productsT.raw("DoctoViene.servicesList") || []) as {
        title: string;
        items: string[];
      }[],
      benefits: (productsT.raw("DoctoViene.benefits") || []) as string[],
      status: productsT("DoctoViene.status"),
    },
    {
      id: "VieneRegister",
      icon: "/assets/icons/viene.webp",
      features: (productsT.raw("VieneRegister.features") || []) as string[],
      servicesList: (productsT.raw("VieneRegister.servicesList") || []) as {
        title: string;
        items: string[];
      }[],
      benefits: (productsT.raw("VieneRegister.benefits") || []) as string[],
    },
    {
      id: "ArchiViene",
      icon: "/assets/icons/viene.webp",
      features: (productsT.raw("ArchiViene.features") || []) as string[],
      servicesList: (productsT.raw("ArchiViene.servicesList") || []) as {
        title: string;
        items: string[];
      }[],
      benefits: (productsT.raw("ArchiViene.benefits") || []) as string[],
    },
  ];

  return (
    <section className="relative bg-gray-50 overflow-hidden h-[calc(100vh-64px)]py-16">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl mb-16">
          {productsT("title")}{" "}
          <span className="text-primary-main">
            {productsT("titleHighlight")}
          </span>
        </h2>

        <div className="grid md:grid-cols-1 gap-8 mb-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 relative mr-4">
                  <Image
                    src={product.icon}
                    alt={productsT(`${product.id}.title`)}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-left leading-none">
                  {productsT(`${product.id}.title`)}
                  {(product.id === "DoctoViene" ||
                    product.id === "ArchiViene" ||
                    product.id === "VieneRegister") && (
                    <span className="font-normal">
                      {" "}
                      : {productsT(`${product.id}.subtitle`)}
                    </span>
                  )}
                </h3>
              </div>

              <p className="text-xl text-gray-600 mb-6">
                {productsT(`${product.id}.description`)}
              </p>

              {Array.isArray(product.features) &&
                product.features.length > 0 && (
                  <ul className="text-xl space-y-3 mb-6">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

              {/* services */}
              {(product.id === "DoctoViene" ||
                product.id === "ArchiViene" ||
                product.id === "VieneRegister") &&
                Array.isArray(product.servicesList) &&
                product.servicesList.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">
                      {productsT(`${product.id}.servicesTitle`)}
                    </h4>
                    <div className="list-decimal pl-6 space-y-2">
                      {product.servicesList.map((service, idx) => (
                        <div key={idx} className="mb-2">
                          <h5 className="font-bold">{service.title} :</h5>
                          <ul className="list-disc pl-6 mt-1">
                            {service.items.map((item, subIdx) => (
                              <li key={subIdx} className="text-gray-600">
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* avantages */}
              {(product.id === "DoctoViene" ||
                product.id === "ArchiViene" ||
                product.id === "VieneRegister") &&
                Array.isArray(product.benefits) &&
                product.benefits.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">
                      {productsT(`${product.id}.benefitsTitle`)}
                    </h4>
                    <ul className="list-disc pl-6 space-y-2">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-gray-600">
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Cas d'usage pour VieneRegister */}
              {product.id === "VieneRegister" &&
                productsT(`${product.id}.useCases`) && (
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">
                      {productsT(`${product.id}.useCasesTitle`)}
                    </h4>
                    <p className="text-gray-600">
                      {productsT(`${product.id}.useCases`)}
                    </p>
                  </div>
                )}

              {/* Équipement optionnel pour ArchiViene */}
              {product.id === "ArchiViene" &&
                productsT(`${product.id}.optionalEquipment`) && (
                  <div className="mb-6">
                    <h4 className="text-xl font-semibold mb-2">
                      {productsT(`${product.id}.optionalEquipmentTitle`)}
                    </h4>
                    <p className="text-gray-600">
                      {productsT(`${product.id}.optionalEquipment`)}
                    </p>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
