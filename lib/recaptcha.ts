interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  error_codes?: string[];
}

export async function verifyRecaptcha(
  token: string
): Promise<RecaptchaResponse> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error("RECAPTCHA_SECRET_KEY non configuré");
  }

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  // Vérifier le score (0.5 est le seuil recommandé par Google)
  if (data.success && data.score < 0.5) {
    return {
      ...data,
      success: false,
      error_codes: ["score_too_low"],
    };
  }

  return data;
}
