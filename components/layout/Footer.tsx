"use client";

import Link from "next/link";
import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary-main text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>Libreville, Gabon</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                <span>+241 77 91 58 82</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                <span>info@companyviene.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/a-propos" className="hover:text-primary-main">
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="/produits-services"
                  className="hover:text-primary-main"
                >
                  Produits & Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-main">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/company/companyviene"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-main"
              >
                <Linkedin className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-8 pt-8 border-t border-gray-700 text-center">
          <p>
            &copy; {new Date().getFullYear()} CompanyViene. Tous droits
            réservés.
          </p>

          <Link
            href="/politique-de-confidentialite"
            className="text-sm text-gray-400 hover:text-primary-main"
            target="_blank"
            rel="noopener noreferrer"
          >
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
