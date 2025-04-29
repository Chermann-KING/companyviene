import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const navigation = [
  { nameKey: "home", href: "/" },
  { nameKey: "about", href: "/a-propos" },
  { nameKey: "products", href: "/produits-services" },
  { nameKey: "contact", href: "/contact" },
];

export default function Navigation({ mobile = false }) {
  const pathname = usePathname();
  const t = useTranslations("navigation");

  const linkClasses = (href: string) => {
    const baseClasses = mobile
      ? "block px-3 py-2 rounded-md text-base font-medium"
      : "text-sm font-medium";

    return `${baseClasses} ${
      pathname === href
        ? "text-primary-main"
        : "text-gray-500 hover:text-primary-main"
    }`;
  };

  return (
    <>
      {navigation.map((item) => (
        <Link
          key={item.nameKey}
          href={item.href}
          className={linkClasses(item.href)}
        >
          {t(item.nameKey)}
        </Link>
      ))}
    </>
  );
}
