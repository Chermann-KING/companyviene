import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // On vérifie si c'est un multipart/form-data
    const contentType = request.headers.get("content-type") || "";
    let name = "",
      email = "",
      phone = "",
      message = "";
    let cvFile: File | null = null;
    let lettreFile: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      name = formData.get("name") as string;
      email = formData.get("email") as string;
      phone = formData.get("phone") as string;
      message = formData.get("message") as string;
      cvFile = formData.get("cv") as File;
      lettreFile = formData.get("lettre") as File;
    } else {
      const body = await request.json();
      name = body.name;
      email = body.email;
      phone = body.phone;
      message = body.message;
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être remplis" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^"]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "node101-eu.n0c.com",
      port: 465,
      secure: true,
      auth: {
        user: "info@companyviene.com",
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // Adresse de réception des candidatures (par défaut info@companyviene.com)
    const toAddress = "info@companyviene.com";
    // Pour utiliser une adresse dédiée plus tard, décommente la ligne suivante et commente la précédente :
    // const toAddress = "recrutement@companyviene.com";

    const adminSubject = `📝 Nouvelle candidature reçue`;
    const adminHtml = `
      <h2>Nouvelle candidature via le site CompanyViene</h2>
      <ul>
        <li><b>Nom :</b> ${name}</li>
        <li><b>Email :</b> ${email}</li>
        <li><b>Téléphone :</b> ${phone || "Non renseigné"}</li>
      </ul>
      <h3>Message / Motivation :</h3>
      <p style="background:#f6f6f6;padding:1em;border-radius:8px;">${message.replace(
        /\n/g,
        "<br>"
      )}</p>
      <hr>
      <small>Ce message a été généré automatiquement par le site companyviene.com</small>
    `;

    // Préparation des pièces jointes
    const attachments = [];
    if (cvFile && typeof cvFile === "object" && cvFile.size > 0) {
      const buffer = Buffer.from(await cvFile.arrayBuffer());
      attachments.push({
        filename: cvFile.name,
        content: buffer,
      });
    }
    if (lettreFile && typeof lettreFile === "object" && lettreFile.size > 0) {
      const buffer = Buffer.from(await lettreFile.arrayBuffer());
      attachments.push({
        filename: lettreFile.name,
        content: buffer,
      });
    }

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: toAddress,
      subject: adminSubject,
      html: adminHtml,
      attachments,
    });

    // Accusé de réception à l'utilisateur
    const userSubject = "Votre candidature a bien été reçue - CompanyViene";
    const userHtml = `
      <p>Bonjour ${name},</p>
      <p>Nous avons bien reçu votre candidature et vous remercions de l'intérêt que vous portez à CompanyViene.</p>
      <p>Notre équipe RH étudiera votre profil et vous contactera si votre candidature est retenue.</p>
      <hr>
      <p style="font-size:0.95em;">Récapitulatif de votre message :</p>
      <ul>
        <li><b>Message / Motivation :</b> ${message.replace(/\n/g, "<br>")}</li>
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
      { message: "Candidature envoyée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de votre candidature" },
      { status: 500 }
    );
  }
}
