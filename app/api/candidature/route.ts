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
  try {
    // 1. Lire le FormData
    const formData = await request.formData();

    // 2. Vérifier le token CSRF
    const csrfToken = request.headers.get("X-CSRF-Token");
    const formCsrfToken = formData.get("csrfToken");

    if (!csrfToken || csrfToken !== formCsrfToken) {
      return NextResponse.json(
        { error: "Token CSRF invalide" },
        { status: 403 }
      );
    }

    // 3. Valider les données du formulaire
    const validatedData = candidatureSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      message: formData.get("message"),
      csrfToken: formData.get("csrfToken"),
      recaptchaToken: formData.get("recaptchaToken"),
    });

    // 4. Vérifier les fichiers
    const cv = formData.get("cv") as File;
    const lettre = formData.get("lettre") as File;

    if (!cv || !lettre) {
      return NextResponse.json(
        { error: "CV et lettre de motivation requis" },
        { status: 400 }
      );
    }

    // 5. Vérifier la taille des fichiers
    if (cv.size > MAX_FILE_SIZE || lettre.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Les fichiers ne doivent pas dépasser 5MB" },
        { status: 400 }
      );
    }

    // 6. Vérifier le type des fichiers
    if (
      !ALLOWED_FILE_TYPES.includes(cv.type) ||
      !ALLOWED_FILE_TYPES.includes(lettre.type)
    ) {
      return NextResponse.json(
        { error: "Format de fichier non autorisé" },
        { status: 400 }
      );
    }

    // 7. Configuration email
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    if (!emailUser || !emailPassword) {
      console.error("Variables d'environnement email manquantes");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    // 8. Créer le transporteur
    const transporter = nodemailer.createTransport({
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

    // 9. Préparer les pièces jointes
    const cvBuffer = Buffer.from(await cv.arrayBuffer());
    const lettreBuffer = Buffer.from(await lettre.arrayBuffer());

    // 10. Préparer l'email
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

    // 11. Envoyer l'email
    await transporter.sendMail(mailOptions);

    // 12. Log de la soumission (optionnel)
    console.log(
      `Nouvelle candidature reçue: ${validatedData.name} (${validatedData.email})`
    );

    return NextResponse.json(
      { message: "Candidature envoyée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors du traitement de la candidature:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    );
  }
}
