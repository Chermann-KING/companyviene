"use client";

import AboutHero from "@/components/sections/about/AboutHero";
import AboutObjectives from "@/components/sections/about/AboutObjectives";
import AboutVision from "@/components/sections/about/AboutVision";
import AboutStructure from "@/components/sections/about/AboutStructure";
import AboutTeam from "@/components/sections/about/AboutTeam";

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
