import { usePathname } from "next/navigation";
import { getTranslatedSlug } from "@/config/navigation";

// Fonction pour obtenir le chemin dans une autre langue
const getLocalizedPath = (locale: string, anchor?: string) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = segments[1];
  const currentSlug = segments[2];

  // Si on est sur la home, pas de slug à traduire
  if (!currentSlug) {
    segments[1] = locale;
    return segments.join("/") + (anchor ? `#${anchor}` : "");
  }

  // Traduire le slug si possible
  const translatedSlug = getTranslatedSlug(currentSlug, currentLocale, locale);
  segments[1] = locale;
  segments[2] = translatedSlug;
  return segments.join("/") + (anchor ? `#${anchor}` : "");
};

export default getLocalizedPath;
