import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import AboutPage from "@/components/pages/about/page";
import Contact from "@/components/pages/contact/page";
import ProductsServicesPage from "@/components/pages/products-and-services/page";
import PrivacyPage from "@/components/pages/privacy/page";

const SLUGS = {
  about: { fr: "a-propos", en: "about" },
  products: { fr: "produits-et-services", en: "products-and-services" },
  contact: { fr: "contact", en: "contact" },
  privacy: { fr: "politique-de-confidentialite", en: "privacy-policy" },
  // Ici d'autres slugs si besoin
};

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "navigation" });

  // Trouver la clé logique correspondant au slug et à la locale
  const pageKey = Object.keys(SLUGS).find(
    (key) => SLUGS[key as keyof typeof SLUGS][locale as "fr" | "en"] === slug
  );

  if (!pageKey) {
    return {
      title: "Page non trouvée",
    };
  }

  // Retourner le titre traduit selon la page
  const titleMap: Record<string, string> = {
    about: t("about"),
    products: t("products"),
    contact: t("contact"),
    privacy: t("privacyPolicy"),
  };

  return {
    title: titleMap[pageKey] || t("home"),
  };
}

export default async function Page({ params }: PageProps) {
  const { locale, slug } = await params;

  // Charge explicitement les messages pour la locale
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const t = await getTranslations({ locale });

  // Trouver la clé logique correspondant au slug et à la locale
  const pageKey = Object.keys(SLUGS).find(
    (key) => SLUGS[key as keyof typeof SLUGS][locale as "fr" | "en"] === slug
  );

  if (!pageKey) {
    notFound();
  }

  // Vérifier que le slug correspond bien à la locale
  if (SLUGS[pageKey as keyof typeof SLUGS][locale as "fr" | "en"] !== slug) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {(() => {
        switch (pageKey) {
          case "about":
            return <AboutPage />;
          case "products":
            return <ProductsServicesPage />;
          case "contact":
            return <Contact />;
          case "privacy":
            return <PrivacyPage />;
          default:
            notFound();
        }
      })()}
    </NextIntlClientProvider>
  );
}
