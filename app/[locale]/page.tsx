import React from "react";
import HeroSection from "@/components/pages/home/HeroSection";
import DomainesActivites from "@/components/pages/home/DomainesActivites";
import RecrutementSection from "@/components/pages/home/RecrutementSection";
import Map from "@/components/ui/Map";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

async function Home({ params }: PageProps) {
  const { locale } = await params;

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
