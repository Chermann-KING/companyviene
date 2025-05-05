"use client";

import AboutHero from "@/components/pages/about/sections/AboutHero";
import AboutObjectives from "@/components/pages/about/sections/AboutObjectives";
import AboutVision from "@/components/pages/about/sections/AboutVision";
import AboutStructure from "@/components/pages/about/sections/AboutStructure";
import AboutTeam from "@/components/pages/about/sections/AboutTeam";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16">
      <AboutHero />
      <AboutObjectives />
      <AboutVision />
      <AboutStructure />
      <AboutTeam />
    </div>
  );
}
