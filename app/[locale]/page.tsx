import React from "react";
import HeroSection from "@/components/pages/home/HeroSection";
import DomainesActivites from "@/components/pages/home/DomainesActivites";
import RecrutementSection from "@/components/pages/home/RecrutementSection";
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
