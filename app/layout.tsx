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
  const frameConfig = {
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

  return (
    <html>
      <head>
        <meta name="fc:frame" content={JSON.stringify(frameConfig)} />
      </head>
      <body>{children}</body>
    </html>
  );
}
