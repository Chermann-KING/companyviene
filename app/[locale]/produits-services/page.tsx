import React from "react";
import ProductsAndServicesHero from "@/components/sections/services/ProductsAndServicesHero";
import Products from "@/components/sections/services/Products";
import Services from "@/components/sections/services/Services";

export default function ProductsServicesPage() {
  return (
    <div className="flex flex-col gap-16">
      <ProductsAndServicesHero />
      <Products />
      <Services />
    </div>
  );
}
