import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Produits & Services", href: "/produits-services" },
  { name: "Contact", href: "/contact" },
];

export default function Navigation({ mobile = false }) {
  const pathname = usePathname();

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
          key={item.name}
          href={item.href}
          className={linkClasses(item.href)}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
}
