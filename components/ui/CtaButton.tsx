import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface CtaButtonProps {
  href?: string;
  label: string;
  Icon?: ReactNode; // Icône optionnelle (par défaut flèche si non fourni)
  onClick?: () => void; // Fonction de rappel pour le clic (optionnelle)
  className?: string; // Classes CSS optionnelles
  // disabled?: boolean; // État désactivé (optionnel)
}

export default function CtaButton({
  href,
  label,
  Icon,
  onClick,
  className = "",
}: CtaButtonProps) {
  const content = (
    <div className="flex items-center">
      <div className="w-12 h-12 bg-primary-main rounded-full flex items-center justify-center mr-3 group-hover:bg-primary-dark transition-colors duration-300">
        {Icon ? Icon : <DefaultArrowIcon />}
      </div>
      <span className="text-2xl font-semibold">{label}</span>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex items-center group text-lg font-medium hover:text-primary-dark transition-colors duration-300 ${className}`}
      >
        {content}
      </button>
    );
  }
  return (
    <Link
      href={href || "/"}
      className={`inline-flex items-center group text-lg font-medium hover:text-primary-dark transition-colors duration-300 ${className}`}
    >
      {content}
    </Link>
  );
}

// Icône par défaut
function DefaultArrowIcon() {
  return <ArrowRight className="h-8 w-8 text-white font-semibold" />;
}
