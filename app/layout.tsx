import "./globals.css";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://btc-halving-two.vercel.app";

const frameConfig = {
  version: "next",
  imageUrl: `${APP_URL}/api/og`,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <meta name="fc:frame" content={JSON.stringify(frameConfig)} />
      </head>
      <body>{children}</body>
    </html>
  );
}
