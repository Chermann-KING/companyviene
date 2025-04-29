import {
  Code,
  Database,
  Cloud,
  Shield,
  BarChart,
  Settings,
} from "lucide-react";
import ServiceCard from "@/components/ui/ServiceCard";

const services = [
  {
    title: "Développement Web",
    description:
      "Création de sites web et d'applications web modernes et performantes.",
    icon: Code,
  },
  {
    title: "Solutions Cloud",
    description: "Migration et gestion de vos infrastructures dans le cloud.",
    icon: Cloud,
  },
  {
    title: "Base de données",
    description:
      "Conception et optimisation de bases de données pour vos projets.",
    icon: Database,
  },
  {
    title: "Sécurité",
    description:
      "Protection de vos données et sécurisation de vos applications.",
    icon: Shield,
  },
  {
    title: "Analytics",
    description:
      "Analyse de données et tableaux de bord pour piloter votre activité.",
    icon: BarChart,
  },
  {
    title: "Support Technique",
    description: "Accompagnement et maintenance de vos solutions techniques.",
    icon: Settings,
  },
];

export default function Services() {
  return (
    <section className="py-12 bg-background-dark">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-main sm:text-4xl">
            Nos Services
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Des solutions complètes pour répondre à tous vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
