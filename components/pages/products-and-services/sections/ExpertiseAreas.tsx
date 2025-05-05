import { useTranslations } from "next-intl";

export default function ExpertiseAreas() {
  const t = useTranslations("DomainesActivites");

  const areas = [
    "digitalisation",
    "optimisation",
    "durabilite",
    "performance",
    "energie",
  ] as const;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("title")}{" "}
          <span className="text-primary-600">{t("titleHighlight")}</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => (
            <div
              key={area}
              className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-4 text-primary-800">
                {t(`${area}.title`)}
              </h3>
              <p className="text-gray-600">{t(`${area}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
