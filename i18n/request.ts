import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(() => ({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  messages: undefined,
}));
