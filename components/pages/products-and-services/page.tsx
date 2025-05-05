import React from "react";
import ProductsAndServicesHero from "@/components/pages/products-and-services/sections/ProductsAndServicesHero";
import Products from "@/components/pages/products-and-services/sections/Products";
import Services from "@/components/pages/products-and-services/sections/Services";

export default function ProductsServicesPage() {
  return (
    <div className="flex flex-col gap-16">
      <ProductsAndServicesHero />
      <Products />
      <Services />
    </div>
  );
}
