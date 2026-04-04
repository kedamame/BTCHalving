import "./globals.css";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://btc-halving-two.vercel.app";

function dailyTs() {
  return Math.floor(Date.now() / 86400000) * 86400;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const miniAppEmbed = {
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

  return (
    <html>
      <head>
        <meta name="fc:miniapp" content={JSON.stringify(miniAppEmbed)} />
      </head>
      <body>{children}</body>
    </html>
  );
}
