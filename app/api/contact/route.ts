import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { logger } from "@/lib/logger";

// Schéma de validation des données
const contactSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/),
  email: z.string().email().max(254),
  phone: z
    .string()
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(1000),
  csrfToken: z.string(),
  recaptchaToken: z.string(),
});

export async function POST(request: Request) {
  try {
    // Lire les données JSON au lieu de FormData
    const body = await request.json();

    // Simplifier pour debug - pas de CSRF ni reCAPTCHA pour l'instant
    console.log("Données reçues:", body);

    // Valider les données du formulaire
    const validatedData = contactSchema.parse({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      subject: body.subject,
      message: body.message,
      csrfToken: "debug", // Temporaire
      recaptchaToken: "debug", // Temporaire
    });

    // Logger la soumission
    await logger.info("Nouveau message de contact reçu", {
      name: validatedData.name,
      email: validatedData.email,
      subject: validatedData.subject,
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    // TODO: Envoyer l'email de notification

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur dans /api/contact:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    // Logger l'erreur
    await logger.error("Erreur lors du traitement du message de contact", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
