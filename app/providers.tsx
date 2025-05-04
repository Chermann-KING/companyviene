import { NextIntlClientProvider } from "next-intl";

export function Providers({
  children,
  messages,
}: {
  children: React.ReactNode;
  messages: any;
}) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
