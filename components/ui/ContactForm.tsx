"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactForm() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    title: "",
    message: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur si l'utilisateur commence à corriger
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name) {
      newErrors.name = t("form.validation.required");
    }

    if (!formData.email) {
      newErrors.email = t("form.validation.required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("form.validation.emailFormat");
    }

    if (!formData.subject) {
      newErrors.subject = t("form.validation.required");
    }

    if (!formData.message) {
      newErrors.message = t("form.validation.required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowErrors(true);

    if (!validateForm()) {
      return;
    }

    setStatus({ type: "loading", title: "", message: t("form.submitting") });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      setStatus({
        type: "success",
        title: t("form.success.title"),
        message: t("form.success.description"),
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setShowErrors(false);
    } catch (error) {
      setStatus({
        type: "error",
        title: t("form.error.title"),
        message: t("form.error.description"),
      });
    }
  };

  return (
    <section className="w-2/3 border border-blue-500">
      <form onSubmit={handleSubmit}>
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
            className={`mt-1 block w-full rounded-md shadow-sm 
                ${
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
            placeholder="e.g. email@exemple.com"
            className={`mt-1 block w-full rounded-md shadow-sm 
                ${
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

        {/* Téléphone et Sujet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
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
              placeholder="e.g. +241 77 88 38 52"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
            />
          </div>

          <div className="relative">
            <div className="flex justify-between">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700"
              >
                {t("form.subject")}
              </label>
              {showErrors && errors.subject && (
                <span className="text-xs font-semibold text-red-500">
                  {errors.subject}
                </span>
              )}
            </div>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`mt-1 block w-full rounded-md shadow-sm 
                  ${
                    showErrors && errors.subject
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary-main focus:ring-primary-main"
                  }`}
            />
            {showErrors && errors.subject && formData.subject === "" && (
              <div className="absolute bg-orange-100 shadow-md p-2 rounded z-10 flex items-center">
                <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  !
                </div>
                {t("form.validation.subject")}
              </div>
            )}
          </div>
        </div>

        {/* Message */}
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
            className={`mt-1 block w-full rounded-md shadow-sm 
                ${
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
              ? `${t("form.submitting")}`
              : `${t("form.submit")}`}
          </button>
        </div>
      </form>
    </section>
  );
}
