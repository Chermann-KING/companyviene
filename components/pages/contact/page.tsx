"use client";

import { useTranslations } from "next-intl";
import ContactHero from "@/components/pages/contact/sections/ContactHero";
import ContactForm from "@/components/ui/ContactForm";
import Map from "@/components/ui/Map";
import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

function Contact() {
  const t = useTranslations("contact");

  return (
    <div className="flex flex-col gap-16 pb-16">
      <ContactHero />
      <Map />
      <div className="flex flex-col gap-8 px-4 md:px-0">
        <h2
          className="text-3xl tracking-tight font-extrabold text-center text-secondary-main sm:text-4xl md:text-5xl leading-none"
          id="contact-form"
        >
          {t("getInTouch")}{" "}
          <span className="text-primary-main">{t("getInTouchHighlight")}</span>
        </h2>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-full md:max-w-md text-center px-4 ">
            {Array.isArray(t.raw("description")) ? (
              t.raw("description").map((text: string, index: number) => (
                <p key={index} className="text-xl text-gray-600 mb-4">
                  {text}
                </p>
              ))
            ) : (
              <p className="text-gray-600 mb-4">{t("description")}</p>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-7xl md:mx-auto flex flex-col md:flex-row justify-center items-center md:items-start gap-8 px-4">
        <ContactForm />
        {/* Contact Info */}
        <div className="w-full md:w-1/3 text-left mt-8 md:mt-0">
          <h3 className="text-lg font-semibold mb-4">{t("address.title")}</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{t("address.street")}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-2" />
              <span>{t("address.phone")}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-2" />
              <a
                href="mailto:info@companyviene.com"
                className="text-primary-main hover:underline"
              >
                <span>{t("address.email")}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
