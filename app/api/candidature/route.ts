import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { logger } from "@/lib/logger";
import { writeFile } from "fs/promises";
import { join } from "path";
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
    .regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
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
  try {
    const formData = await request.formData();

    // Vérifier le token CSRF
    const csrfToken = request.headers.get("X-CSRF-Token");
    if (!csrfToken || csrfToken !== formData.get("csrfToken")) {
      return NextResponse.json(
        { error: "Token CSRF invalide" },
        { status: 403 }
      );
    }

    // Vérifier le token reCAPTCHA
    const recaptchaToken = request.headers.get("X-Recaptcha-Token");
    if (!recaptchaToken) {
      return NextResponse.json(
        { error: "Token reCAPTCHA manquant" },
        { status: 400 }
      );
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);
    if (!recaptchaResult.success) {
      return NextResponse.json(
        { error: "Vérification reCAPTCHA échouée" },
        { status: 400 }
      );
    }

    // Valider les données du formulaire
    const validatedData = candidatureSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
      csrfToken: formData.get("csrfToken"),
      recaptchaToken: formData.get("recaptchaToken"),
    });

    // Vérifier les fichiers
    const cv = formData.get("cv") as File;
    const lettre = formData.get("lettre") as File;

    if (!cv || !lettre) {
      return NextResponse.json(
        { error: "CV et lettre de motivation requis" },
        { status: 400 }
      );
    }

    // Vérifier la taille des fichiers
    if (cv.size > MAX_FILE_SIZE || lettre.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Les fichiers ne doivent pas dépasser 5MB" },
        { status: 400 }
      );
    }

    // Vérifier le type des fichiers
    if (
      !ALLOWED_FILE_TYPES.includes(cv.type) ||
      !ALLOWED_FILE_TYPES.includes(lettre.type)
    ) {
      return NextResponse.json(
        { error: "Format de fichier non autorisé" },
        { status: 400 }
      );
    }

    // Générer des noms de fichiers uniques
    const timestamp = Date.now();
    const cvFileName = `${validatedData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-cv-${timestamp}.${cv.type.split("/")[1]}`;
    const lettreFileName = `${validatedData.name
      .toLowerCase()
      .replace(/\s+/g, "-")}-lettre-${timestamp}.${lettre.type.split("/")[1]}`;

    // Sauvegarder les fichiers
    const uploadDir = join(process.cwd(), "uploads");
    await writeFile(
      join(uploadDir, cvFileName),
      Buffer.from(await cv.arrayBuffer())
    );
    await writeFile(
      join(uploadDir, lettreFileName),
      Buffer.from(await lettre.arrayBuffer())
    );

    // ✅ Configuration email (même que contact)
    console.log("Configuration de l'email de candidature...");
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error("Variables d'environnement email manquantes");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    // ✅ Créer le transporteur
    console.log("Configuration du transporteur...");
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: "node101-eu.n0c.com", // ✅ Serveur SMTP
        port: 587, // ✅ Port SMTP sécurisé
        secure: false, // ✅ true pour 465, false pour 587
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
        // Paramètres additionnels pour la sécurité
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
        },
      });
      console.log("Transporteur créé avec succès");
    } catch (error) {
      console.error("Erreur création transporteur:", error);
      return NextResponse.json(
        { error: "Erreur configuration email" },
        { status: 500 }
      );
    }

    // ✅ Convertir fichiers en attachements
    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const lettreBuffer = Buffer.from(await lettre.arrayBuffer());

    // ✅ Préparer l'email avec pièces jointes
    const mailOptions = {
      from: emailUser,
      to: emailUser,
      subject: `Application Viene Form ${validatedData.name}`,
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

    // ✅ AJOUTÉ : Envoyer l'email
    console.log("Envoi de l'email de candidature...");
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Email de candidature envoyé avec succès:", info.messageId);
    } catch (error) {
      console.error("Erreur envoi email candidature:", error);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email de candidature" },
        { status: 500 }
      );
    }

    // Logger la soumission
    await logger.info("Nouvelle candidature reçue", {
      name: validatedData.name,
      email: validatedData.email,
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      files: {
        cv: cvFileName,
        lettre: lettreFileName,
      },
    });

    return NextResponse.json(
      { message: "Candidature envoyée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    // Logger l'erreur
    await logger.error("Erreur lors du traitement de la candidature", {
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
