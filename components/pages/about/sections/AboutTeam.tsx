"use client";

import { useTranslations } from "next-intl";
import { Linkedin } from "lucide-react";

const team = [
  {
    id: 1,
    name: "Moctar GAYE NDONG",
    role: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/moctar-gaye-ndong-17486428/",
  },
  {
    id: 2,
    name: "Landry NDONG ABOGHÉ",
    role: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/landry-ndong-abogh%C3%A9-600b9662/",
  },
  {
    id: 3,
    name: "Hermann MOUSSAVOU",
    role: "UX|UI|Graphic Designer",
    linkedin: "https://www.linkedin.com/in/hermann-moussavou/",
  },
  {
    id: 4,
    name: "Evaris NGOUZO",
    role: "Front-End Technology Expert",
    linkedin: "https://www.linkedin.com/in/evariz/?originalSubdomain=be",
  },
  {
    id: 5,
    name: "Jean Baptiste MAKAYA",
    role: "Back-End Technology Expert",
    linkedin: "https://www.linkedin.com/in/jean-baptiste-makaya",
  },
  {
    id: 6,
    name: "Nicolas DUSSART",
    role: "IT Architecte",
    linkedin: "https://www.linkedin.com/in/nicolas-dusart-49362851/",
  },
  {
    id: 7,
    name: "Olivier NGOH",
    role: "Expert Architect Engineer/HVAC construction specialist",
    linkedin: "https://www.linkedin.com/in/olivier-ngoh-505965152/",
  },
];

export default function AboutTeam() {
  const t = useTranslations("about.team");

  return (
    <section className="pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {/* Titre de la section */}
          <h2 className="text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl leading-none">
            {t("title")}{" "}
            <span className="text-primary-main">{t("titleHighlight")}</span>
          </h2>

          {/* Grille des membres de l'équipe */}
          <div className="mt-6 flex flex-wrap justify-center gap-12">
            {team.map((member) => (
              <div key={member.id} className="team_member w-1/3">
                <div className="flex flex-col gap-2">
                  {/* Nom et rôle */}
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold text-left leading-none text-gray-800 uppercase">
                      {member.name}
                    </h4>
                    <p className="text-xl text-gray-600 whitespace-pre-line">
                      {member.role}
                    </p>
                  </div>

                  {/* LinkedIn */}
                  <div className="mt-2">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-[#1dae00] hover:text-[#158f00] transition-colors duration-300"
                    >
                      <Linkedin size={26} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
