"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-secondary-main text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("contact.title")}</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{t("contact.address")}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>{t("contact.phone")}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>{t("contact.email")}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("quickLinks.title")}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="hover:text-primary-main">
                  {t("quickLinks.about")}
                </Link>
              </li>
              <li>
                <Link
                  href="/produits-services"
                  className="hover:text-primary-main"
                >
                  {t("quickLinks.products")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-main">
                  {t("quickLinks.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t("social.title")}</h3>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/company/companyviene"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-main"
                aria-label={t("social.linkedin")}
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-8 border-t border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} CompanyViene. {t("copyright")}
          </p>

          <Link
            href="/politique-de-confidentialite"
            className="text-sm text-gray-400 hover:text-primary-main"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
