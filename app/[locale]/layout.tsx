import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AppProvider } from "../components/providers/AppProvider";
import "../globals.css";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://btc-halving-two.vercel.app";

function dailyTs() {
  return Math.floor(Date.now() / 86400000) * 86400;
}

function buildMiniAppEmbed() {
  return {
    version: "1",
    imageUrl: `${APP_URL}/api/og?t=${dailyTs()}`,
    button: {
      title: "BTC Halving Countdown",
      action: {
        type: "launch_miniapp",
        name: "BTC Halving Countdown",
        url: APP_URL,
        splashImageUrl: `${APP_URL}/splash.png`,
        splashBackgroundColor: "#F7931A",
      },
    },
  };
}

export const metadata: Metadata = {
  title: "BTC Halving Countdown",
  description:
    "Bitcoin halving countdown with historical performance data. A Farcaster MiniApp.",
  other: {
    "base:app_id": "69d0a8ac6bde4593a961d879",
  },
  openGraph: {
    title: "BTC Halving Countdown",
    description: "Next BTC halving countdown with historical performance data",
    images: [`${APP_URL}/api/og`],
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
  const miniAppEmbed = buildMiniAppEmbed();

  return (
    <html lang={locale}>
      <head>
        <meta name="fc:miniapp" content={JSON.stringify(miniAppEmbed)} />
      </head>
      <body>
        <AppProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
