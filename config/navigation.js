export const navigation = {
  main: [
    { nameKey: "home", href: { fr: "/", en: "/" } },
    { nameKey: "about", href: { fr: "/a-propos", en: "/about" } },
    {
      nameKey: "products",
      href: { fr: "/produits-services", en: "/products" },
    },
    { nameKey: "contact", href: { fr: "/contact", en: "/contact" } },
  ],
  footer: {
    company: [
      { nameKey: "about", href: { fr: "/a-propos", en: "/about" } },
      { nameKey: "team", href: { fr: "/a-propos#equipe", en: "/about#team" } },
      { nameKey: "careers", href: { fr: "/carrieres", en: "/careers" } },
      { nameKey: "blog", href: { fr: "/blog", en: "/blog" } },
    ],
    services: [
      {
        nameKey: "webDevelopment",
        href: { fr: "/produits-services#web", en: "/products#web" },
      },
      {
        nameKey: "cloudSolutions",
        href: { fr: "/produits-services#cloud", en: "/products#cloud" },
      },
      {
        nameKey: "database",
        href: { fr: "/produits-services#database", en: "/products#database" },
      },
      {
        nameKey: "security",
        href: { fr: "/produits-services#security", en: "/products#security" },
      },
    ],
    support: [
      { nameKey: "helpCenter", href: { fr: "/support", en: "/support" } },
      { nameKey: "documentation", href: { fr: "/docs", en: "/docs" } },
      { nameKey: "contact", href: { fr: "/contact", en: "/contact" } },
      { nameKey: "status", href: { fr: "/status", en: "/status" } },
    ],
    legal: [
      {
        nameKey: "legalNotice",
        href: { fr: "/mentions-legales", en: "/legal-notice" },
      },
      {
        nameKey: "privacyPolicy",
        href: { fr: "/confidentialite", en: "/privacy" },
      },
      { nameKey: "termsOfUse", href: { fr: "/conditions", en: "/terms" } },
      { nameKey: "cookies", href: { fr: "/cookies", en: "/cookies" } },
    ],
  },
  social: [
    {
      nameKey: "facebook",
      href: "https://facebook.com/companyviene",
      icon: "Facebook",
    },
    {
      nameKey: "twitter",
      href: "https://twitter.com/companyviene",
      icon: "Twitter",
    },
    {
      nameKey: "linkedin",
      href: "https://linkedin.com/company/companyviene",
      icon: "LinkedIn",
    },
  ],
};

// Table de correspondance des slugs pour les pages dynamiques
export const SLUGS = {
  about: { fr: "a-propos", en: "about" },
  products: { fr: "produits-services", en: "products" },
  contact: { fr: "contact", en: "contact" },
  // autres slugs dynamiques ici
};

// Trouve la clé logique à partir d'un slug et d'une locale
export function getPageKeyFromSlug(slug, locale) {
  return Object.keys(SLUGS).find((key) => SLUGS[key][locale] === slug);
}

// Trouve le slug dans la langue cible à partir du slug courant et de la locale courante
export function getTranslatedSlug(currentSlug, fromLocale, toLocale) {
  const pageKey = getPageKeyFromSlug(currentSlug, fromLocale);
  if (!pageKey) return currentSlug; // fallback
  return SLUGS[pageKey][toLocale];
}
