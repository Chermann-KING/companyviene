import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// Schéma de validation des données (simplifié)
const contactSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Le sujet est requis"),
  message: z.string().min(1, "Le message est requis"),
});

export async function POST(request: NextRequest) {
  console.log("=== CONTACT API START ===");

  try {
    // 1. Vérifier la méthode
    console.log("Method:", request.method);

    // 2. Vérifier les headers
    const contentType = request.headers.get("content-type");
    console.log("Content-Type:", contentType);

    // 3. Lire le body
    let body;
    try {
      body = await request.json();
      console.log("Body reçu:", JSON.stringify(body, null, 2));
    } catch (error) {
      console.error("Erreur parsing JSON:", error);
      return NextResponse.json(
        { error: "Format JSON invalide" },
        { status: 400 }
      );
    }

    // 4. Validation avec Zod
    let validatedData;
    try {
      validatedData = contactSchema.parse(body);
      console.log("Validation réussie:", validatedData);
    } catch (error) {
      console.error("Erreur validation Zod:", error);
      return NextResponse.json(
        { error: "Données invalides", details: error },
        { status: 400 }
      );
    }

    // 5. Variables d'environnement - ✅
    console.log("Vérification des variables d'environnement...");
    const emailUser = process.env.EMAIL_USER;
    const emailPassword = process.env.EMAIL_PASSWORD;

    console.log("EMAIL_USER défini:", !!emailUser);
    console.log("EMAIL_PASSWORD défini:", !!emailPassword);

    if (!emailUser || !emailPassword) {
      console.error("Variables d'environnement manquantes");
      return NextResponse.json(
        { error: "Configuration email manquante" },
        { status: 500 }
      );
    }

    // 6. Configuration du transporteur - ✅ Avec serveur custom
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

    // 7. Test de connexion
    console.log("Test de connexion email...");
    try {
      await transporter.verify();
      console.log("Connexion email vérifiée");
    } catch (error) {
      console.error("Erreur vérification email:", error);
      return NextResponse.json(
        { error: "Impossible de se connecter au serveur email" },
        { status: 500 }
      );
    }

    // 8. Préparation du message
    const mailOptions = {
      from: emailUser,
      to: emailUser,
      subject: `CompanyViene Form: ${validatedData.subject}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        ${
          validatedData.phone
            ? `<p><strong>Téléphone:</strong> ${validatedData.phone}</p>`
            : ""
        }
        <p><strong>Sujet:</strong> ${validatedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
      `,
    };

    console.log("Mail options préparées:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    // 9. Envoi de l'email
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

    console.log("=== CONTACT API SUCCESS ===");
    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error("=== CONTACT API ERROR ===");
    console.error("Erreur générale:", error);
    console.error("Stack:", error instanceof Error ? error.stack : "No stack");

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
