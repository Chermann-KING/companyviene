import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

const navigation = [
  { nameKey: "home", href: "/" },
  { nameKey: "about", href: "/about" },
  { nameKey: "products", href: "/products" },
  { nameKey: "contact", href: "/contact" },
];

export default function Navigation({ mobile = false }) {
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const locale = useLocale();

  const getLocalizedHref = (href: string) => {
    return href === "/" ? `/${locale}` : `/${locale}${href}`;
  };

  const linkClasses = (href: string) => {
    const baseClasses = mobile
      ? "block px-3 py-2 rounded-md text-base font-medium"
      : "text-sm font-medium";

    const localizedPath = getLocalizedHref(href);
    return `${baseClasses} ${
      pathname === localizedPath
        ? "text-primary-main"
        : "text-gray-500 hover:text-primary-main"
    }`;
  };

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.nameKey}
          href={getLocalizedHref(item.href)}
          className={linkClasses(item.href)}
        >
          {t(item.nameKey)}
        </Link>
      ))}
    </>
  );
}
