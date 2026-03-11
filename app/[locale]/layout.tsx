import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://halving-countdown.vercel.app";

export const metadata: Metadata = {
  title: "BTC Halving Countdown",
  description: "Bitcoin halving countdown with historical performance data. A Farcaster MiniApp.",
  openGraph: {
    title: "BTC Halving Countdown",
    description: "Next BTC halving countdown with historical performance data",
    images: [`${APP_URL}/api/og`],
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": `${APP_URL}/api/og`,
    "fc:frame:button:1": "View Halving Countdown",
    "fc:frame:post_url": `${APP_URL}/api/frame`,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content={`${APP_URL}/api/og`} />
        <meta property="fc:frame:button:1" content="View Halving Countdown" />
        <meta property="fc:frame:post_url" content={`${APP_URL}/api/frame`} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
