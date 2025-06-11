import React from "react";
import HeroSection from "@/components/pages/home/HeroSection";
import DomainesActivites from "@/components/pages/home/DomainesActivites";
import RecrutementSection from "@/components/pages/home/RecrutementSection";
import Map from "@/components/ui/Map";
import { getTranslations } from "next-intl/server";

interface PageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "navigation" });

  return {
    title: t("home"),
  };
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
