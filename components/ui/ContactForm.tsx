"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Envoi en cours..." });

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
        message: "Message envoyé avec succès ! Nous vous contacterons bientôt.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Une erreur est survenue. Veuillez réessayer.",
      });
    }
  };

  return (
    <section
      className="w-full mx-auto h-full  border border-green-500"
      id="contact-form"
    >
      <div className="w-full  mx-auto h-full px-4 sm:px-6 lg:px-8 lg:pr-0 py-12 lg:py-16  border border-blue-500">
        <form
          onSubmit={handleSubmit}
          className="relative flex flex-col items-center w-full border border-red-500"
        >
          <div className="w-full max-w-2xl mb-8">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nom complet
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
            />
          </div>

          <div className="w-full max-w-2xl mb-8">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
            />
          </div>

          <div className="w-full max-w-2xl mb-8">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Téléphone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
            />
          </div>

          <div className="w-full max-w-2xl mb-8">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Sujet
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              required
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
            />
          </div>

          <div className="w-full max-w-2xl mb-8">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-main focus:ring-primary-main"
            />
          </div>

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
              {status.message}
            </div>
          )}

          <div className="w-full max-w-2xl mb-8">
            <button
              type="submit"
              disabled={status.type === "loading"}
              className="btn-primary w-full"
            >
              {status.type === "loading"
                ? "Envoi en cours..."
                : "Envoyer le message"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
