import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import ProductDetail from "@/components/pages/products-and-services/sections/ProductDetail";

/** Slugs de la page produits selon la locale */
const PRODUCTS_PAGE_SLUGS: Record<string, string> = {
  fr: "produits-et-services",
  en: "products-and-services",
};

/** Mapping slug URL → id de produit dans les messages i18n */
const PRODUCT_SLUG_TO_ID: Record<string, string> = {
  doctoviene: "DoctoViene",
  "viene-register": "VieneRegister",
  archiviene: "ArchiViene",
  "viene-id": "VieneID",
  "viene-checkin": "VieneCheckIn",
  "okira-lib": "OkiraLib",
  "okira-viene": "OkiraViene",
  "viene-bid": "VieneBid",
};

interface PageProps {
  params: Promise<{ locale: string; slug: string; productSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug, productSlug } = await params;

  // Vérifier que le parent slug correspond bien à la page produits
  if (PRODUCTS_PAGE_SLUGS[locale] !== slug) {
    return { title: "Page non trouvée" };
  }

  const productId = PRODUCT_SLUG_TO_ID[productSlug];
  if (!productId) {
    return { title: "Page non trouvée" };
  }

  const t = await getTranslations({
    locale,
    namespace: "productsandservices.products",
  });
  return {
    title: `${t(`${productId}.title`)} — ${t(`${productId}.subtitle`)}`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { locale, slug, productSlug } = await params;

  // Vérifier que le parent slug est bien la page produits
  if (PRODUCTS_PAGE_SLUGS[locale] !== slug) {
    notFound();
  }

  // Vérifier que le productSlug est connu
  const productId = PRODUCT_SLUG_TO_ID[productSlug];
  if (!productId) {
    notFound();
  }

  // Charger les messages pour la locale
  let messages;
  try {
    messages = (await import(`../../../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <ProductDetail productId={productId} />
    </NextIntlClientProvider>
  );
}
