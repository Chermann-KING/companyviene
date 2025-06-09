import { NextResponse } from "next/server";
import { z } from "zod";

// Schéma de validation des données (simplifié)
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  phone: z.string().optional(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(1000),
});

export async function POST(request: Request) {
  try {
    // Lire les données JSON
    const body = await request.json();

    console.log("=== DEBUT DEBUG CONTACT ===");
    console.log("Données reçues:", body);

    // Valider les données du formulaire (version simplifiée)
    const validatedData = contactSchema.parse({
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      subject: body.subject,
      message: body.message,
    });

    console.log("Données validées:", validatedData);
    console.log("=== FIN DEBUG CONTACT ===");

    // TODO: Envoyer l'email de notification

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== ERREUR CONTACT ===");
    console.error("Type d'erreur:", error?.constructor?.name);
    console.error(
      "Message d'erreur:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.error("Stack:", error instanceof Error ? error.stack : undefined);
    console.error("=== FIN ERREUR ===");

    if (error instanceof z.ZodError) {
      console.error("Erreurs de validation:", error.errors);
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
