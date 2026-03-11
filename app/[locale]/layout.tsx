import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://btc-halving-two.vercel.app";

// Daily cache-bust: Unix timestamp at UTC midnight, changes every 24h
function dailyTs() {
  const now = Date.now();
  return Math.floor(now / 86400000) * 86400;
}

function buildFrameConfig() {
  return {
    version: "next",
    imageUrl: `${APP_URL}/api/og?t=${dailyTs()}`,
    button: {
      title: "BTC Halving Countdown",
      action: {
        type: "launch_frame",
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
  description: "Bitcoin halving countdown with historical performance data. A Farcaster MiniApp.",
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
  const frameConfig = buildFrameConfig();

  return (
    <html lang={locale}>
      <head>
        <meta name="fc:frame" content={JSON.stringify(frameConfig)} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
