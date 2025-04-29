"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Navigation from "./Navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-main">
                CompanyViene
              </span>
            </Link>
          </div>

          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-8">
            <Navigation />
          </nav>

          {/* Language selector */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={pathname.replace(/^\/[a-z]{2}/, "/fr")}
              className={`text-sm ${
                pathname.startsWith("/fr")
                  ? "text-primary-main"
                  : "text-gray-500"
              }`}
            >
              FR
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href={pathname.replace(/^\/[a-z]{2}/, "/en")}
              className={`text-sm ${
                pathname.startsWith("/en")
                  ? "text-primary-main"
                  : "text-gray-500"
              }`}
            >
              EN
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Navigation mobile />
          </div>
        </div>
      )}
    </header>
  );
}
