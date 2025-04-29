import { NextIntlClientProvider } from "next-intl";
import { useLocale } from "next-intl";

export function Providers({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages: any;
}) {
  const locale = useLocale();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
