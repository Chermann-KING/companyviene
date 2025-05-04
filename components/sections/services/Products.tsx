"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Products() {
  const productsT = useTranslations("productsandservices.products");

  const products = [
    {
      id: "vieneRegister",
      // icon: "/assets/icons/register.svg",
      features: (productsT.raw("vieneRegister.features") || []) as string[],
    },
  ];

  return (
    <section className="relative bg-[#f9f9f9] overflow-hidden h-[calc(100vh-64px)]py-16 ">
      <div className="container mx-auto px-4">
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
                  {/* <Image
                    src={product.icon}
                    alt={productsT(`${product.id}.title`)}
                    fill
                    className="object-contain"
                  /> */}
                </div>
                <h3 className="text-2xl font-semibold">
                  {productsT(`${product.id}.title`)}
                </h3>
              </div>

              <p className="text-gray-600 mb-6">
                {productsT(`${product.id}.description`)}
              </p>

              {Array.isArray(product.features) &&
                product.features.length > 0 && (
                  <ul className="space-y-3 mb-6">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

              <div className="mt-6 text-sm text-primary-600 font-medium">
                {productsT(`${product.id}.status`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
