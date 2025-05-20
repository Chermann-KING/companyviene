import React, { useState, useEffect } from "react";
import { useTranslations } from "use-intl";
import Script from "next/script";

// Types pour reCAPTCHA
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (
        siteKey: string,
        options: { action: string }
      ) => Promise<string>;
    };
  }
}

function ContactForm({ onSuccess }: { onSuccess: () => void }) {
  const t = useTranslations("contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showErrors, setShowErrors] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    title: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [csrfToken, setCsrfToken] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [submitCount, setSubmitCount] = useState(0);
  const MAX_SUBMISSIONS = 3;
  const SUBMISSION_TIMEOUT = 3600000; // 1 heure en millisecondes

  // Générer un token CSRF au chargement du composant
  useEffect(() => {
    const token = Math.random().toString(36).substring(2);
    setCsrfToken(token);
  }, []);

  // Vérifier le nombre de soumissions
  useEffect(() => {
    const lastSubmission = localStorage.getItem("lastSubmission");
    const submissionCount = localStorage.getItem("submissionCount");

    if (lastSubmission && submissionCount) {
      const timeSinceLastSubmission = Date.now() - parseInt(lastSubmission);
      if (timeSinceLastSubmission < SUBMISSION_TIMEOUT) {
        setSubmitCount(parseInt(submissionCount));
      } else {
        localStorage.removeItem("lastSubmission");
        localStorage.removeItem("submissionCount");
      }
    }
  }, []);

  // Initialiser reCAPTCHA
  useEffect(() => {
    if (typeof window !== "undefined" && window.grecaptcha) {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
      if (!siteKey) {
        console.error("Clé reCAPTCHA manquante");
        return;
      }
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(siteKey, {
            action: "contact_form",
          })
          .then((token: string) => {
            setRecaptchaToken(token);
          });
      });
    }
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validation du nom
    if (!formData.name) newErrors.name = t("form.validation.required");
    else if (formData.name.length < 2)
      newErrors.name = t("form.validation.nameTooShort");
    else if (formData.name.length > 100)
      newErrors.name = t("form.validation.nameTooLong");
    else if (!/^[a-zA-ZÀ-ÿ\s-]+$/.test(formData.name))
      newErrors.name = t("form.validation.nameInvalid");

    // Validation de l'email
    if (!formData.email) newErrors.email = t("form.validation.required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = t("form.validation.emailFormat");
    else if (formData.email.length > 254)
      newErrors.email = t("form.validation.emailTooLong");

    // Validation du téléphone
    if (
      formData.phone &&
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        formData.phone
      )
    )
      newErrors.phone = t("form.validation.phoneInvalid");

    // Validation du message
    if (!formData.message) newErrors.message = t("form.validation.required");
    else if (formData.message.length < 10)
      newErrors.message = t("form.validation.messageTooShort");
    else if (formData.message.length > 1000)
      newErrors.message = t("form.validation.messageTooLong");

    // Vérification du honeypot
    if (honeypot) {
      throw new Error("Spam détecté");
    }

    // Vérification du nombre de soumissions
    if (submitCount >= MAX_SUBMISSIONS) {
      throw new Error(t("form.validation.tooManySubmissions"));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    setShowErrors(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    setStatus({ type: "loading", title: "", message: t("form.submitting") });

    try {
      // Mettre à jour le token reCAPTCHA
      if (window.grecaptcha) {
        const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string;
        if (!siteKey) {
          throw new Error("Clé reCAPTCHA manquante");
        }
        const newToken = await window.grecaptcha.execute(siteKey, {
          action: "contact_form",
        });
        setRecaptchaToken(newToken);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
          "X-Recaptcha-Token": recaptchaToken,
        },
        body: JSON.stringify({
          ...formData,
          csrfToken,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      // Mettre à jour le compteur de soumissions
      const newCount = submitCount + 1;
      setSubmitCount(newCount);
      localStorage.setItem("submissionCount", newCount.toString());
      localStorage.setItem("lastSubmission", Date.now().toString());

      setStatus({
        type: "success",
        title: t("form.success.title"),
        message: t("form.success.description"),
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
      setShowErrors(false);
      setTimeout(onSuccess, 2000);
    } catch (error) {
      setStatus({
        type: "error",
        title: t("form.error.title"),
        message: t("form.error.description"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full mx-auto">
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="afterInteractive"
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Champ honeypot caché */}
        <div className="hidden">
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Nom */}
        <div className="relative">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {t("form.name")}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              showErrors && errors.name
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-main focus:ring-primary-main"
            }`}
            maxLength={100}
            required
          />
          {showErrors && errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            {t("form.email")}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className={`mt-1 block w-full rounded-md shadow-sm ${
              showErrors && errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-main focus:ring-primary-main"
            }`}
            maxLength={254}
            required
          />
          {showErrors && errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Téléphone */}
        <div className="relative">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            {t("form.phone")}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className={`mt-1 block w-full rounded-md shadow-sm ${
              showErrors && errors.phone
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-main focus:ring-primary-main"
            }`}
            pattern="[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}"
          />
          {showErrors && errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Message */}
        <div className="relative">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            {t("form.message")}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              showErrors && errors.message
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-primary-main focus:ring-primary-main"
            }`}
            maxLength={1000}
            required
          />
          {showErrors && errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Message de statut */}
        {status.message && (
          <div
            className={`p-4 rounded-md ${
              status.type === "success"
                ? "bg-green-50 text-green-800"
                : status.type === "error"
                ? "bg-red-50 text-red-800"
                : "bg-blue-50 text-blue-800"
            }`}
          >
            <p className="font-medium">{status.title}</p>
            <p>{status.message}</p>
          </div>
        )}
      </form>
    </section>
  );
}

export default ContactForm;
