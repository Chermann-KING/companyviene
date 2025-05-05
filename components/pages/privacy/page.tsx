"use client";

import { useState } from "react";
import Head from "next/head";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState<number | null>(null);

  const t = useTranslations("privacy");

  const toggleSection = (sectionId: number | null) => {
    if (activeSection === sectionId) {
      setActiveSection(null);
    } else {
      setActiveSection(sectionId);
    }
  };

  const sections = [
    {
      id: 1,
      title: "Objet",
      content: (
        <div>
          <p className="mb-3">
            CompanyViene vous invite à lire attentivement les présentes
            conditions générales relatives à l'utilisation du site Internet
            www.companyviene.com et des services y associés.
          </p>
          <p className="mb-3">
            Le terme « Services » s'entend de tout contenu accessible au moyen
            du protocole Internet.
          </p>
          <p className="mb-3">
            Le terme « utilisateur » ou « utilisateurs » s'entend de toute
            personne qui accède au présente site Internet.
          </p>
          <p>
            En accédant au Site Internet www.companyviene.com, l'utilisateur
            marque son accord sur les présentes conditions générales
            d'utilisation.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Éditeur",
      content: (
        <div>
          <p className="mb-3">Le site www.companyviene.com est édité par :</p>
          <div className="bg-green-50 p-4 rounded-lg mb-3">
            <p className="font-semibold">COMPANYVIENE SARL</p>
            <p>Capital de 1.000.000 F CFA</p>
            <p>Siège social établi à Akounam 2 à Owendo</p>
            <p>Téléphone : +241 (0)77 91 98 82</p>
            <p>Libreville - GABON</p>
            <p>
              La société est représentée par NDONG Moctar Gaye et ADOGHE NDONG
              Landry
            </p>
          </div>
          <p>
            Le site Internet www.companyviene.com est hébergé par la société
            PLANETHOSTE® Inc., est situé au 4416 Louis B. Mayer, Laval (Québec)
            H7P 0G1, Canada.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "Accès au site Internet",
      content: (
        <div>
          <p className="mb-3">
            Tout Utilisateur ayant accès à Internet peut accéder gratuitement au
            Site. Les frais pour y accéder (connexion Internet, matériel
            informatique, etc.) sont à la charge de l'utilisateur. L'accès à
            tout ou partie du Site Internet ou aux services y associés est
            payant ou gratuit. Un tel accès au fait est librement, soit est
            conditionné à une inscription préalable.
          </p>
          <p className="mb-3">
            Le site et ses différents services peuvent être interrompus ou
            suspendus par CompanyViene notamment à l'occasion d'une maintenance,
            sans obligation de préavis ou de justification. L'Utilisateur ne
            peut réclamer aucune indemnisation.
          </p>
          <p className="mb-3">
            Tout événement dû à un cas de force majeur ayant pour conséquence un
            dysfonctionnement du réseau, mingage pas la responsabilité de
            CompanyViene.
          </p>
          <p>
            L'utilisateur peut contacter le site à l'adresse suivante :
            info@companyviene.com
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "Responsabilité de l'Utilisateur",
      content: (
        <div>
          <p className="mb-3">
            L'Utilisateur est responsable des risques liés à l'utilisation de
            son identifiant de connexion et de son mot de passe le cas échéant.
          </p>
          <p className="mb-3">
            Le mot de passe de l'Utilisateur éventuel doit rester secret. En cas
            de divulgation de mot de passe, l'Éditeur décline toute
            responsabilité.
          </p>
          <p className="mb-3">
            L'Utilisateur assume l'entière responsabilité de l'utilisation qu'il
            fait des informations et contenus présents sur le site
            www.companyviene.com.
          </p>
          <p>
            En publiant sur le site, l'Utilisateur cède à CompanyViene le droit
            non exclusif et gratuit, valable dans le monde entier de reproduire,
            représenter, adapter, modifier, diffuser et distribuer sa
            publication, directement ou par un tiers autorisé.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "Responsabilité de l'Éditeur",
      content: (
        <div>
          <p className="mb-3">
            Tout dysfonctionnement du serveur ou du réseau ne peut engager la
            responsabilité de CompanyViene.
          </p>
          <p className="mb-3">
            De même, la responsabilité du site ne peut être engagée en cas de
            force majeure ou du fait imprévisible et insurmontable d'un tiers.
          </p>
          <p className="mb-3">
            Le site www.companyviene.com s'engage à mettre en œuvre tous les
            moyens nécessaires pour garantir la sécurité et la confidentialité
            des données. Toutefois, il n'apporte pas une garantie de sécurité
            totale.
          </p>
          <p>
            CompanyViene se réserve la faculté d'une non-garantie de la
            fiabilité des sources, bien que les informations diffusées sur le
            site soient réputées fiables.
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: "Propriété intellectuelle",
      content: (
        <div>
          <p className="mb-3">
            Le site www.companyviene.com est l'ensemble de son contenu, y
            compris textes, images fixes ou animés, vidéos, bases de données,
            programmes, logos, marques etc., font l'objet d'une protection au
            titre de la propriété ou d'une licence concédée à CompanyViene.
          </p>
          <p className="mb-3">
            Sous réserve des exceptions prévues à cet effet par la
            réglementation relative à la propriété intellectuelle et sauf
            autorisation préalable et écrite de CompanyViene ou du titulaire des
            droits concernés, toute reproduction par CompanyViene, toute
            communication, représentation, adaptation, traduction,
            transformation, incorporation, commercialisation et/ou transfert,
            partiel ou intégral vers un autre site d'un ou de plusieurs des
            éléments précités, par quelque procédé et sur quelque support que ce
            soit.
          </p>
          <p>
            L'utilisation non autorisée du contenu du site est constitutive de
            contrefaçon et passible de poursuites judiciaires.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: "Données à caractère personnel",
      content: (
        <div>
          <p>
            La politique relative aux données à caractère personnel est établie
            conformément à la réglementation applicable.
          </p>
        </div>
      ),
    },
    {
      id: 8,
      title: "Liens hypertextes",
      content: (
        <div>
          <p>
            Les domaines vers lesquels mènent les liens hypertextes présents sur
            le site n'engagent pas la responsabilité de CompanyViene qui n'a pas
            de contrôle sur ces liens.
          </p>
        </div>
      ),
    },
    {
      id: 9,
      title: "Évolution des conditions générales d'utilisation",
      content: (
        <div>
          <p>
            Le site www.companyviene.com se réserve le droit de modifier les
            clauses de ces conditions générales d'utilisation à tout moment et
            sans justification.
          </p>
        </div>
      ),
    },
    {
      id: 10,
      title: "Droit applicable et juridictions compétentes",
      content: (
        <div>
          <p>
            Le contenu et les services figurant sur le site www.companyviene.com
            d'être exclusivement destinés aux utilisateurs résidant dans les
            Pays où CompanyViene exerce ses services, seul le droit relatif à
            ces Pays est applicable, les cas éventuels de litiges sont de la
            compétence des cours et tribunaux des Pays concernés.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Politique de Confidentialité | CompanyViene</title>
        <meta
          name="description"
          content="Politique de confidentialité de CompanyViene"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <section className="mb-12">
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            {t("title")}{" "}
            <span className="text-green-600">{t("titleHighlight")}</span>
          </h1>
          <div className="h-1 w-24 bg-green-600 mb-8"></div>
          <p className="text-gray-600 mb-8">{t("description")}</p>
        </section>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            {(t.raw("sections") as any[]).map(
              (section: {
                id: number;
                title: string;
                content: JSX.Element;
              }) => (
                <div
                  key={section.id}
                  className="mb-6 border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                >
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="flex w-full items-center justify-between text-left text-lg font-medium focus:outline-none"
                  >
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-4">
                        {section.id}
                      </div>
                      <span className="text-gray-800 hover:text-green-600">
                        {section.title}
                      </span>
                    </div>
                    <svg
                      className={`h-5 w-5 text-green-600 transform ${
                        activeSection === section.id ? "rotate-180" : ""
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={`pl-12 pr-10 mt-4 text-gray-600 text-justify transition-all duration-300 ${
                      activeSection === section.id
                        ? "opacity-100 max-h-screen"
                        : "opacity-0 max-h-0 overflow-hidden"
                    }`}
                  >
                    {Array.isArray(section.content)
                      ? section.content.map(
                          (paragraph: string, index: number) => (
                            <p key={index} className="mb-3">
                              {paragraph}
                            </p>
                          )
                        )
                      : section.content}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            Dernière mise à jour : Mai 2025
          </p>
        </div>
      </div>
    </div>
  );
}
