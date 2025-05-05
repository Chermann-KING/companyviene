"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import CtaButton from "@/components/ui/CtaButton";

import { usePathname } from "next/navigation";

export default function ContactHero() {
  const tHero = useTranslations("contact.hero");
  const pathname = usePathname();
  const locale = pathname.split("/")[1];

  const getLocalizedPath = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="relative bg-white overflow-hidden h-[calc(100vh-64px)]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/companyviene-contact.png"
          alt="Hero banner CompanyViene"
          fill
          priority
          className="object-cover"
        />
        {/* Overlay for better text contrast if needed */}
        <div className="absolute inset-0 bg-white/30"></div>
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto h-full">
        <div className="relative z-10 flex items-center h-full px-4 sm:px-6 lg:px-8">
          {/* Content wrapper */}
          <div className="w-full lg:w-1/2">
            {/* Title */}
            <h1 className="text-4xl tracking-tight font-extrabold leading-[1.1] text-secondary-main sm:text-5xl md:text-6xl mb-12">
              <span className="block">{tHero("title")}</span>
              <div className="flex gap-x-4">
                <span className="text-primary-main">
                  {tHero("titleHighlightChallenge")}{" "}
                </span>
                <span>{tHero("titleTo")} </span>
                <span className="text-primary-main">
                  {tHero("titleHighlightSuccess")}
                </span>
              </div>
              <span>{tHero("titleExperts")}</span>
            </h1>

            {/* Call to action buttons */}
            <CtaButton
              href={`${getLocalizedPath(locale)}/#contact-form`}
              label={tHero("cta")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
