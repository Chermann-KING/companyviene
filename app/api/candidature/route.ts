import { NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

// Schéma de validation des données
const candidatureSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/),
  email: z.string().email().max(254),
  phone: z
    .string()
    .refine(
      (val) =>
        !val ||
        /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(val)
    )
    .optional(),
  message: z.string().min(10).max(1000),
  csrfToken: z.string(),
  recaptchaToken: z.string(),
});

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  console.log("=== CANDIDATURE API START ===");

  try {
    // 1. Vérifier les headers
    console.log(
      "Headers reçus:",
      Object.fromEntries(request.headers.entries())
    );

    // 2. Lire le FormData
    console.log("Lecture du FormData...");
    let formData: FormData;
    try {
      formData = await request.formData();
      console.log("FormData lu avec succès");

      // Lister tous les champs
      const fields = [
        "name",
        "email",
        "phone",
        "message",
        "csrfToken",
        "recaptchaToken",
        "cv",
        "lettre",
      ];
      fields.forEach((key) => {
        const value = formData.get(key);
        if (value instanceof File) {
          console.log(
            `  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`
          );
        } else if (value) {
          console.log(`  ${key}: ${value}`);
        } else {
          console.log(`  ${key}: null/undefined`);
        }
      });
    } catch (error) {
      console.error("Erreur lecture FormData:", error);
      return NextResponse.json(
        { error: "Erreur lecture FormData" },
        { status: 400 }
      );
    }

    // 3. Vérifier le token CSRF
    console.log("Vérification CSRF...");
    const csrfToken = request.headers.get("X-CSRF-Token");
    const formCsrfToken = formData.get("csrfToken");
    console.log("CSRF header:", csrfToken);
    console.log("CSRF form:", formCsrfToken);

    if (!csrfToken || csrfToken !== formCsrfToken) {
      console.error("Token CSRF invalide");
      return NextResponse.json(
        { error: "Token CSRF invalide" },
        { status: 403 }
      );
    }

    // 4. TEMPORAIREMENT : Skip la vérification reCAPTCHA
    console.log("⚠️ SKIP vérification reCAPTCHA (mode test)");

    // 5. Valider les données du formulaire
    console.log("Validation des données...");
    let validatedData;
    try {
      validatedData = candidatureSchema.parse({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone") || "",
        message: formData.get("message"),
        csrfToken: formData.get("csrfToken"),
        recaptchaToken: formData.get("recaptchaToken"),
      });
      console.log("Données validées:", {
        name: validatedData.name,
        email: validatedData.email,
        hasPhone: !!validatedData.phone,
        messageLength: validatedData.message.length,
      });
    } catch (error) {
      console.error("Erreur validation Zod:", error);
      return NextResponse.json(
        { error: "Données invalides", details: error },
        { status: 400 }
      );
    }

    // 6. Vérifier les fichiers
    console.log("Vérification des fichiers...");
    const cv = formData.get("cv") as File;
    const lettre = formData.get("lettre") as File;

    console.log(
      "CV:",
      cv ? `${cv.name} (${cv.size} bytes, ${cv.type})` : "absent"
    );
    console.log(
      "Lettre:",
      lettre
        ? `${lettre.name} (${lettre.size} bytes, ${lettre.type})`
        : "absent"
    );

    if (!cv || !lettre) {
      console.error("Fichiers manquants");
      return NextResponse.json(
        { error: "CV et lettre de motivation requis" },
        { status: 400 }
      );
    }

    // 7. Vérifier la taille des fichiers
    if (cv.size > MAX_FILE_SIZE || lettre.size > MAX_FILE_SIZE) {
      console.error("Fichiers trop gros:", {
        cvSize: cv.size,
        lettreSize: lettre.size,
      });
      return NextResponse.json(
        { error: "Les fichiers ne doivent pas dépasser 5MB" },
        { status: 400 }
      );
    }

    // 8. Vérifier le type des fichiers
    if (
      !ALLOWED_FILE_TYPES.includes(cv.type) ||
      !ALLOWED_FILE_TYPES.includes(lettre.type)
    ) {
      console.error("Types de fichiers non autorisés:", {
        cvType: cv.type,
        lettreType: lettre.type,
      });
      return NextResponse.json(
        { error: "Format de fichier non autorisé" },
        { status: 400 }
      );
    }

    // 9. ❌ SUPPRIMÉ : Création dossier uploads (pas possible sur Vercel)
    console.log("⚠️ SKIP création dossier uploads (production)");

    // 10. ❌ SUPPRIMÉ : Sauvegarde fichiers (pas nécessaire, on envoie par email)
    console.log("⚠️ SKIP sauvegarde fichiers (production)");

    // 11. Configuration email
    console.log("Configuration de l'email...");
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error("Variables d'environnement email manquantes");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    // 12. Créer le transporteur
    console.log("Création du transporteur email...");
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: "node101-eu.n0c.com",
        port: 587,
        secure: false,
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
        },
      });
      console.log("Transporteur créé");
    } catch (error) {
      console.error("Erreur création transporteur:", error);
      return NextResponse.json(
        { error: "Erreur configuration email" },
        { status: 500 }
      );
    }

    // 13. Convertir fichiers en attachements
    console.log("Préparation des pièces jointes...");
    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const lettreBuffer = Buffer.from(await lettre.arrayBuffer());

    // 14. Préparer l'email
    const mailOptions = {
      from: emailUser,
      to: emailUser,
      subject: `🚀 Nouvelle candidature - ${validatedData.name}`,
      html: `
        <h2 style="color: #2563eb;">🚀 Nouvelle candidature reçue</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>👤 Nom :</strong> ${validatedData.name}</p>
          <p><strong>📧 Email :</strong> ${validatedData.email}</p>
          ${
            validatedData.phone
              ? `<p><strong>📞 Téléphone :</strong> ${validatedData.phone}</p>`
              : ""
          }
          <p><strong>💬 Message :</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #2563eb;">
            ${validatedData.message.replace(/\n/g, "<br>")}
          </div>
        </div>
        <p><em>📎 Les fichiers CV et lettre de motivation sont en pièces jointes.</em></p>
        <hr style="margin: 20px 0;">
        <p style="color: #6b7280; font-size: 14px;">
          📅 Candidature reçue le ${new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      `,
      attachments: [
        {
          filename: cv.name,
          content: cvBuffer,
          contentType: cv.type,
        },
        {
          filename: lettre.name,
          content: lettreBuffer,
          contentType: lettre.type,
        },
      ],
    };

    // 15. Envoyer l'email
    console.log("Envoi de l'email...");
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email envoyé avec succès:", info.messageId);
    } catch (error) {
      console.error("Erreur envoi email:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email" },
        { status: 500 }
      );
    }

    // 16. Logger la soumission
    console.log("Logging de la soumission...");
    console.log("Nouvelle candidature reçue:", {
      name: validatedData.name,
      email: validatedData.email,
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      timestamp: new Date().toISOString(),
    });

    console.log("=== CANDIDATURE API SUCCESS ===");
    return NextResponse.json(
      { message: "Candidature envoyée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== CANDIDATURE API ERROR ===");
    console.error("Erreur générale:", error);
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Erreur lors du traitement de la candidature:", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
