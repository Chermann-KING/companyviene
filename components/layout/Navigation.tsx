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
      ? "block px-4 py-3 rounded-md text-lg font-medium uppercase tracking-wide"
      : "text-lg font-medium uppercase tracking-wide";

    const localizedPath = getLocalizedHref(hrefObj);
    return `${baseClasses} ${
      pathname === localizedPath
        ? "text-primary-main"
        : "text-gray-600 hover:text-primary-main transition-colors duration-200"
    }`;
  };

  return (
    <nav
      className={
        mobile ? "flex flex-col space-y-1" : "hidden md:flex space-x-10"
      }
    >
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
