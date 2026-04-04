import { ImageResponse } from "@vercel/og";
import { fetchBTCPrice } from "@/lib/coingecko";
import { fetchBlockHeight } from "@/lib/blockchair";
import { calculateCountdown, formatPrice, NEXT_HALVING_BLOCK } from "@/lib/halving";

export const runtime = "edge";

export async function GET() {
  let btcPrice = 0;
  let blockHeight = 0;

  try {
    [btcPrice, blockHeight] = await Promise.all([
      fetchBTCPrice(),
      fetchBlockHeight(),
    ]);
  } catch {
    blockHeight = 890000;
    btcPrice = 85000;
  }

  const { days, blocksRemaining } = calculateCountdown(blockHeight);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0D0D0D",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <span style={{ fontSize: "36px" }}>🪙</span>
          <span
            style={{ fontSize: "36px", fontWeight: "bold", color: "#F7931A" }}
          >
            BTC Halving Countdown
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#1A1A1A",
            border: "2px solid #2A2A2A",
            borderRadius: "20px",
            padding: "28px 56px",
            marginBottom: "20px",
          }}
        >
          <p style={{ color: "#9CA3AF", fontSize: "18px", margin: "0 0 8px 0" }}>
            Next Halving in
          </p>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "72px",
              fontWeight: "bold",
              fontFamily: "monospace",
              margin: "0 0 6px 0",
            }}
          >
            {days} days
          </p>
          <p style={{ color: "#9CA3AF", fontSize: "16px", margin: "0" }}>
            Blocks remaining: {blocksRemaining.toLocaleString()} /{" "}
            {NEXT_HALVING_BLOCK.toLocaleString()}
          </p>
        </div>

        <div style={{ display: "flex", gap: "36px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9CA3AF", fontSize: "16px" }}>BTC Price</span>
            <span
              style={{ color: "#F7931A", fontSize: "28px", fontWeight: "bold" }}
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
            <span style={{ color: "#9CA3AF", fontSize: "16px" }}>Block Height</span>
            <span
              style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "bold" }}
            >
              #{blockHeight.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 900,
      height: 600,
    }
  );
}
