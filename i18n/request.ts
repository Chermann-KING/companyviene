import { getRequestConfig } from "next-intl/server";

export const locales = ["fr", "en"] as const;
export const defaultLocale = "fr" as const;

export default getRequestConfig(async ({ locale }) => {
  const safeLocale = locale || defaultLocale;
  return {
    locale: safeLocale,
    messages: (await import(`../messages/${safeLocale}.json`)).default,
    timeZone: "Europe/Paris",
  };
});
