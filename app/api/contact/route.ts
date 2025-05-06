import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation des champs requis
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis" },
        { status: 400 }
      );
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    // Configuration du transporteur SMTP (port 465, SSL)
    const transporter = nodemailer.createTransport({
      host: "node101-eu.n0c.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@companyviene.com",
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Contenu personnalisé pour l'admin
    const adminSubject = `📬 Nouveau message de contact : ${subject}`;
    const adminHtml = `
      <h2>Vous avez reçu un nouveau message via le formulaire de contact :</h2>
      <ul>
        <li><b>Nom :</b> ${name}</li>
        <li><b>Email :</b> ${email}</li>
        <li><b>Téléphone :</b> ${phone || "Non renseigné"}</li>
        <li><b>Sujet :</b> ${subject}</li>
      </ul>
      <h3>Message :</h3>
      <p style="background:#f6f6f6;padding:1em;border-radius:8px;">${message.replace(
        /\n/g,
        "<br>"
      )}</p>
      <hr>
      <small>Ce message a été généré automatiquement par le site companyviene.com</small>
    `;

    // Envoi de l'e-mail à l'admin
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: "info@companyviene.com",
      subject: adminSubject,
      html: adminHtml,
    });

    // Accusé de réception à l'utilisateur
    const userSubject = "Votre message a bien été reçu - CompanyViene";
    const userHtml = `
      <p>Bonjour ${name},</p>
      <p>Nous avons bien reçu votre message et vous remercions de nous avoir contactés.</p>
      <p>Notre équipe vous répondra dans les plus brefs délais.</p>
      <hr>
      <p style="font-size:0.95em;">Récapitulatif de votre message :</p>
      <ul>
        <li><b>Sujet :</b> ${subject}</li>
        <li><b>Message :</b> ${message.replace(/\n/g, "<br>")}</li>
      </ul>
      <br>
      <p style="font-size:0.9em;color:#888;">Ceci est un accusé de réception automatique, merci de ne pas répondre à cet e-mail.</p>
      <p>L'équipe CompanyViene</p>
    `;
    await transporter.sendMail({
      from: "CompanyViene <info@companyviene.com>",
      to: email,
      subject: userSubject,
      html: userHtml,
    });

    return NextResponse.json(
      { message: "Message envoyé avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de votre message" },
      { status: 500 }
    );
  }
}
