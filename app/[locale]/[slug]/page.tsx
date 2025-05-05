import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import AboutPage from "@/components/pages/about/page";
import Contact from "@/components/pages/contact/page";
import ProductsServicesPage from "@/components/pages/products-and-services/page";

const SLUGS = {
  about: { fr: "a-propos", en: "about" },
  products: { fr: "produits-et-services", en: "products-and-services" },
  contact: { fr: "contact", en: "contact" },
  // Ici d'autres slugs si besoin
};

export default async function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;

  // Charge explicitement les messages pour la locale
  let messages;
  try {
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  const t = await getTranslations({ locale, messages });

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
          default:
            notFound();
        }
      })()}
    </NextIntlClientProvider>
  );
}
