import { NextResponse } from "next/server";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://btc-halving-two.vercel.app";

export async function GET() {
  const manifest = {
    accountAssociation: {
      header:
        "eyJmaWQiOjIxMTE4OSwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDMxOTk5REZCMzI1NkQzMjNDQTA1N0RkMjBhREI1NkI4RUQ0NTE3NzQifQ",
      payload: "eyJkb21haW4iOiJidGMtaGFsdmluZy10d28udmVyY2VsLmFwcCJ9",
      signature:
        "fLoijAGLxS9K6KUUT3owhnlCGU6YUXjiN+KK5IP+1tMw1/pwusx8xBEwoChasA99oCLH5mGwCabNJfogpHotZRs=",
    },
    miniapp: {
      version: "1",
      name: "BTC Halving Countdown",
      subtitle: "Bitcoin Halving Timer",
      description:
        "Track the next Bitcoin halving countdown with real-time block data and historical halving performance.",
      iconUrl: `${APP_URL}/icon.png`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: "#F7931A",
      homeUrl: APP_URL,
      webhookUrl: `${APP_URL}/api/webhook`,
      primaryCategory: "finance",
      tags: ["bitcoin", "halving", "crypto", "countdown"],
      heroImageUrl: `${APP_URL}/api/og`,
      screenshotUrls: [`${APP_URL}/api/screenshot1`],
      tagline: "Next BTC Halving Countdown",
      ogTitle: "BTC Halving Countdown",
      ogDescription:
        "Real-time Bitcoin halving countdown with historical performance data.",
      ogImageUrl: `${APP_URL}/api/embed`,
      noindex: false,
      requiredChains: ["eip155:8453"],
      requiredCapabilities: [],
    },
  };

  return NextResponse.json(manifest);
}
