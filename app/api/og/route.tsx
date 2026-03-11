import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { fetchBTCPrice } from "@/lib/coingecko";
import { fetchBlockHeight } from "@/lib/blockchair";
import { calculateCountdown, formatPrice, NEXT_HALVING_BLOCK } from "@/lib/halving";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get("lang") || "en";

  let btcPrice = 0;
  let blockHeight = 0;

  try {
    [btcPrice, blockHeight] = await Promise.all([
      fetchBTCPrice(),
      fetchBlockHeight(),
    ]);
  } catch {
    // Use defaults if API fails
    blockHeight = 890000;
    btcPrice = 85000;
  }

  const { days, blocksRemaining } = calculateCountdown(blockHeight);
  const isJa = lang === "ja";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0D0D",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <span style={{ fontSize: "48px" }}>🪙</span>
          <span
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              color: "#F7931A",
            }}
          >
            {isJa ? "BTC 半減期カウントダウン" : "BTC Halving Countdown"}
          </span>
        </div>

        {/* Countdown Box */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#1A1A1A",
            border: "2px solid #2A2A2A",
            borderRadius: "24px",
            padding: "40px 80px",
            marginBottom: "32px",
          }}
        >
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "24px",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            {isJa ? "次の半減期まで" : "Next Halving in"}
          </p>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "96px",
              fontWeight: "bold",
              fontFamily: "monospace",
              margin: "0 0 8px 0",
            }}
          >
            {days} {isJa ? "日" : "days"}
          </p>
          <p style={{ color: "#9CA3AF", fontSize: "20px", margin: "0" }}>
            {isJa ? "残りブロック" : "Blocks remaining"}: {blocksRemaining.toLocaleString()} / {NEXT_HALVING_BLOCK.toLocaleString()}
          </p>
        </div>

        {/* Price Row */}
        <div
          style={{
            display: "flex",
            gap: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9CA3AF", fontSize: "20px" }}>
              {isJa ? "BTC価格" : "BTC Price"}
            </span>
            <span
              style={{
                color: "#F7931A",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              ${formatPrice(btcPrice)}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9CA3AF", fontSize: "20px" }}>
              {isJa ? "現在のブロック高" : "Block Height"}
            </span>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "36px",
                fontWeight: "bold",
              }}
            >
              #{blockHeight.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
