import React from "react";
import HeroSection from "@/components/sections/home/HeroSection";
import DomainesActivites from "@/components/sections/home/DomainesActivites";
import RecrutementSection from "@/components/sections/home/RecrutementSection";
import Map from "@/components/ui/Map";

interface PageProps {
  params: {
    locale: string;
  };
}

function Home({ params }: PageProps) {
  return (
    <>
      <HeroSection />
      <DomainesActivites />
      <RecrutementSection />
      <Map />
    </>
  );
}

export default Home;
