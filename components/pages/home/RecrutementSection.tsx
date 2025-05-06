"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import CtaButton from "@/components/ui/CtaButton";

function CandidatureModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("recruitment");

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Contenu de la modal */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
        {/* Bouton de fermeture modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-800 text-3xl"
        >
          &times;
        </button>
        {/* Titre modal */}
        <h3 className=" leading-none text-2xl tracking-tight font-extrabold text-secondary-main sm:text-3xl md:text-4xl mb-6">
          <span>{t("modalTitle")} </span>
          <span className=" text-primary-main">{t("modalTitleHighlight")}</span>
        </h3>
        {/* Formulaire de candidature */}
        <CandidatureForm onSuccess={onClose} />
      </div>
    </div>
  );
}

function CandidatureForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [cv, setCv] = useState<File | null>(null);
  const [lettre, setLettre] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    title: "",
    message: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      if (name === "cv") setCv(files[0]);
      if (name === "lettre") setLettre(files[0]);
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = t("form.validation.required");
    if (!formData.email) newErrors.email = t("form.validation.required");
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = t("form.validation.emailFormat");
    if (!formData.message) newErrors.message = t("form.validation.required");
    if (!cv) newErrors.cv = t("form.validation.resume");
    if (!lettre) newErrors.lettre = t("form.validation.coverLetter");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowErrors(true);
    if (!validateForm()) return;
    setStatus({ type: "loading", title: "", message: t("form.submitting") });
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("message", formData.message);
      if (cv) data.append("cv", cv);
      if (lettre) data.append("lettre", lettre);
      const response = await fetch("/api/candidature", {
        method: "POST",
        body: data,
      });
      if (!response.ok)
        throw new Error("Erreur lors de l'envoi de la candidature");
      setStatus({
        type: "success",
        title: t("form.success.title"),
        message: "Votre candidature a bien été envoyée !",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
      setCv(null);
      setLettre(null);
      setShowErrors(false);
      setTimeout(onSuccess, 2000);
    } catch (error) {
      setStatus({
        type: "error",
        title: t("form.error.title"),
        message: t("form.error.description"),
      });
    }
  };

  return (
    <section className="w-full mx-auto">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Nom complet */}
        <div className="mb-6 relative">
          <div className="flex justify-between">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              {t("form.name")}
            </label>
            {showErrors && errors.name && (
              <span className="text-xs font-semibold text-red-500">
                {errors.name}
              </span>
            )}
          </div>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={t("form.placeholder.name")}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              showErrors && errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-main focus:ring-primary-main"
            }`}
          />
          {showErrors && errors.name && formData.name === "" && (
            <div className="absolute bg-orange-100 shadow-md p-2 rounded z-10 flex items-center">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                !
              </div>
              {t("form.validation.name")}
            </div>
          )}
        </div>
        {/* Email */}
        <div className="mb-6 relative">
          <div className="flex justify-between">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("form.email")}
            </label>
            {showErrors && errors.email && (
              <span className="text-xs font-semibold text-red-500">
                {errors.email}
              </span>
            )}
          </div>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t("form.placeholder.email")}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              showErrors && errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-main focus:ring-primary-main"
            }`}
          />
          {showErrors && errors.email && formData.email === "" && (
            <div className="absolute bg-orange-100 shadow-md p-2 rounded z-10 flex items-center">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                !
              </div>
              {t("form.validation.email")}
            </div>
          )}
        </div>
        {/* Téléphone */}
        <div className="mb-6">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            {t("form.phone")}
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={t("form.placeholder.phone")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
          />
        </div>
        {/* CV */}
        <div className="mb-6">
          <label
            htmlFor="cv"
            className="block text-sm font-medium text-gray-700"
          >
            {t("form.resume")}
          </label>
          <input
            type="file"
            name="cv"
            id="cv"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
          />
          {showErrors && errors.cv && (
            <span className="text-xs font-semibold text-red-500">
              {errors.cv}
            </span>
          )}
        </div>
        {/* Lettre de motivation */}
        <div className="mb-6">
          <label
            htmlFor="lettre"
            className="block text-sm font-medium text-gray-700"
          >
            {t("form.coverLetter")}
          </label>
          <input
            type="file"
            name="lettre"
            id="lettre"
            accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
          />
          {showErrors && errors.lettre && (
            <span className="text-xs font-semibold text-red-500">
              {errors.lettre}
            </span>
          )}
        </div>
        {/* Message / Motivation */}
        <div className="mb-6 relative">
          <div className="flex justify-between">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              {t("form.message")}
            </label>
            {showErrors && errors.message && (
              <span className="text-xs font-semibold text-red-500">
                {errors.message}
              </span>
            )}
          </div>
          <textarea
            name="message"
            id="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder={t("form.placeholder.message")}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              showErrors && errors.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-main focus:ring-primary-main"
            }`}
          />
          {showErrors && errors.message && formData.message === "" && (
            <div className="absolute bg-orange-100 shadow-md p-2 rounded z-10 flex items-center">
              <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                !
              </div>
              {t("form.validation.message")}
            </div>
          )}
        </div>
        {/* Message de statut */}
        {status.message && (
          <div
            className={`p-4 rounded-md mb-6 ${
              status.type === "success"
                ? "bg-green-50 text-green-800"
                : status.type === "error"
                ? "bg-red-50 text-red-800"
                : "bg-blue-50 text-blue-800"
            }`}
          >
            <span className="block font-medium">{status.title}</span>
            <span>{status.message}</span>
          </div>
        )}
        {/* Bouton d'envoi */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status.type === "loading"}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-200"
          >
            {status.type === "loading"
              ? t("form.submitting")
              : "Envoyer la candidature"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default function RecrutementSection() {
  const t = useTranslations("recruitment");
  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-8 md:gap-12">
          {/* Image à gauche */}
          <div className="w-full md:w-1/2 h-64 md:h-auto relative rounded-lg overflow-hidden">
            <Image
              src="/assets/images/comapnyviene-recrutement.png"
              alt="CompanyViene Recrutement - Poignée de main"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
              className="object-cover"
              quality={75}
              priority
            />
          </div>

          {/* Contenu texte à droite */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            {/* Titre */}
            <h2 className=" leading-none text-3xl tracking-tight font-extrabold text-secondary-main sm:text-4xl md:text-5xl mb-6">
              <span>{t("title")}</span>
              <span className="flex gap-3">
                <span>{t("titleOf")} </span>
                <span className=" text-primary-main">
                  {t("titleHighlight")}
                </span>
              </span>
            </h2>

            {/* Description */}
            <p className=" text-gray-600 text-xl text-left mb-6">
              {t("description")}
            </p>

            {/* Bouton de candidature */}
            <CtaButton onClick={() => setOpen(true)} label={t("cta")} />
          </div>
        </div>
      </div>
      <CandidatureModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}
