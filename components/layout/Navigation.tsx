import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { navigation } from "@/config/navigation";

export default function Navigation({ mobile = false }) {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const locale = useLocale() as "fr" | "en";

  const getLocalizedHref = (hrefObj: { fr: string; en: string }) => {
    return hrefObj[locale]
      ? `/${locale}${hrefObj[locale]}`
      : `/${locale}${hrefObj["en"]}`;
  };

  const linkClasses = (hrefObj: { fr: string; en: string }) => {
    const baseClasses = mobile
      ? "block px-3 py-2 rounded-md text-xl font-medium uppercase"
      : "text-xl font-medium uppercase";

    const localizedPath = getLocalizedHref(hrefObj);
    return `${baseClasses} ${
      pathname === localizedPath
        ? "text-primary-main"
        : "text-gray-500 hover:text-primary-main"
    }`;
  };

  return (
    <nav className={mobile ? "flex flex-col" : "hidden md:flex space-x-8"}>
      {navigation.main.map((item) => (
        <Link
          key={item.nameKey}
          href={getLocalizedHref(item.href)}
          className={linkClasses(item.href)}
        >
          {t(item.nameKey)}
        </Link>
      ))}
    </nav>
  );
}
