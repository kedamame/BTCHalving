import { ImageResponse } from "@vercel/og";
import { HALVING_DATA } from "@/lib/halving";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0D0D0D",
          fontFamily: "system-ui, sans-serif",
          padding: "80px 60px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "60px",
          }}
        >
          <span style={{ fontSize: "48px" }}>🪙</span>
          <span
            style={{ fontSize: "48px", fontWeight: "bold", color: "#F7931A" }}
          >
            BTC Halving Countdown
          </span>
        </div>

        {/* Countdown */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#1A1A1A",
            border: "2px solid #2A2A2A",
            borderRadius: "32px",
            padding: "60px",
            marginBottom: "60px",
          }}
        >
          <p
            style={{
              color: "#9CA3AF",
              fontSize: "28px",
              margin: "0 0 16px 0",
            }}
          >
            Next Halving in
          </p>
          <p
            style={{
              color: "#FFFFFF",
              fontSize: "120px",
              fontWeight: "bold",
              fontFamily: "monospace",
              margin: "0 0 16px 0",
            }}
          >
            ~761 days
          </p>
          <p style={{ color: "#9CA3AF", fontSize: "24px", margin: "0" }}>
            Block #1,050,000
          </p>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "80px",
            marginBottom: "60px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9CA3AF", fontSize: "24px" }}>
              BTC Price
            </span>
            <span
              style={{
                color: "#F7931A",
                fontSize: "44px",
                fontWeight: "bold",
              }}
            >
              $69,000
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span style={{ color: "#9CA3AF", fontSize: "24px" }}>
              Block Height
            </span>
            <span
              style={{
                color: "#FFFFFF",
                fontSize: "44px",
                fontWeight: "bold",
              }}
            >
              #940,274
            </span>
          </div>
        </div>

        {/* Past Halvings */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1A1A1A",
            border: "2px solid #2A2A2A",
            borderRadius: "32px",
            padding: "40px",
          }}
        >
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#FFFFFF",
              margin: "0 0 24px 0",
            }}
          >
            Past Halvings Performance
          </p>
          {HALVING_DATA.map((h) => (
            <div
              key={h.epoch}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: "1px solid #2A2A2A",
              }}
            >
              <span style={{ color: "#9CA3AF", fontSize: "22px" }}>
                #{h.epoch} — {h.date.split("-")[0]}
              </span>
              <span style={{ color: h.color, fontSize: "22px", fontWeight: "bold" }}>
                ${h.priceAtHalving.toLocaleString()}
              </span>
              <span style={{ color: "#4ADE80", fontSize: "22px", fontWeight: "bold" }}>
                {h.price1YearAfter
                  ? `+${Math.round(((h.price1YearAfter - h.priceAtHalving) / h.priceAtHalving) * 100)}%`
                  : "TBD"}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1284,
      height: 2778,
    }
  );
}
