import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import AboutPage from "@/components/pages/about/page";
import Contact from "@/components/pages/contact/page";
import ProductsServicesPage from "@/components/pages/produits-services/page";

const SLUGS = {
  about: { fr: "a-propos", en: "about" },
  products: { fr: "produits-services", en: "products" },
  contact: { fr: "contact", en: "contact" },
  // Ajoute ici d'autres slugs si besoin
};

export default function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const t = useTranslations();

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

  switch (pageKey) {
    case "about":
      return (
        // <div style={{ padding: "2rem" }}>
        //   <h1 style={{ fontWeight: 700, fontSize: "2.5rem" }}>
        //     {t("about.hero.title")}{" "}
        //     <span style={{ color: "#2ba940" }}>
        //       {t("about.hero.titleHighlight")}
        //     </span>
        //     {t("about.hero.titleSymbol")}
        //   </h1>
        //   <p style={{ marginTop: "1.5rem", fontSize: "1.2rem", color: "#444" }}>
        //     {t("about.hero.description")}
        //   </p>
        // </div>
        <AboutPage />
      );
    case "products":
      return <ProductsServicesPage />;
    case "contact":
      return <Contact />;
    default:
      notFound();
  }
}
