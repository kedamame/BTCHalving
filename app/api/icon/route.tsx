import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

// Build ₿ with pure divs + borderRadius (no SVG - Satori renders divs perfectly)
// Structure:
//   - Background: #F7931A
//   - Black left vertical bar (B's spine)
//   - Upper black semicircle bump (right half)
//   - Lower black semicircle bump (right half, slightly wider)
//   - Orange holes (upper + lower) with borderRadius
//   - Two thin black vertical bars passing through

export async function GET() {
  const BG = "#F7931A";
  const FG = "#000";

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
          backgroundColor: BG,
        }}
      >
        {/* ₿ container */}
        <div
          style={{
            position: "relative",
            width: 340,
            height: 440,
            display: "flex",
          }}
        >
          {/* B spine (left vertical bar) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 50,
              width: 55,
              height: 340,
              backgroundColor: FG,
            }}
          />

          {/* Upper bump (full black semicircle) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 50,
              width: 260,
              height: 170,
              backgroundColor: FG,
              borderRadius: "0 170px 170px 0",
            }}
          />

          {/* Upper hole (orange D-shape) */}
          <div
            style={{
              position: "absolute",
              left: 55,
              top: 80,
              width: 150,
              height: 110,
              backgroundColor: BG,
              borderRadius: "0 110px 110px 0",
            }}
          />

          {/* Lower bump (full black semicircle, slightly wider) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 220,
              width: 280,
              height: 170,
              backgroundColor: FG,
              borderRadius: "0 170px 170px 0",
            }}
          />

          {/* Lower hole (orange D-shape) */}
          <div
            style={{
              position: "absolute",
              left: 55,
              top: 250,
              width: 170,
              height: 110,
              backgroundColor: BG,
              borderRadius: "0 110px 110px 0",
            }}
          />

          {/* Top left bar (above B) */}
          <div
            style={{
              position: "absolute",
              left: 100,
              top: 0,
              width: 14,
              height: 50,
              backgroundColor: FG,
            }}
          />
          {/* Top right bar (above B) */}
          <div
            style={{
              position: "absolute",
              left: 145,
              top: 0,
              width: 14,
              height: 50,
              backgroundColor: FG,
            }}
          />
          {/* Bottom left bar (below B) */}
          <div
            style={{
              position: "absolute",
              left: 100,
              top: 390,
              width: 14,
              height: 50,
              backgroundColor: FG,
            }}
          />
          {/* Bottom right bar (below B) */}
          <div
            style={{
              position: "absolute",
              left: 145,
              top: 390,
              width: 14,
              height: 50,
              backgroundColor: FG,
            }}
          />

        </div>

        <span
          style={{
            fontSize: 110,
            fontWeight: "bold",
            color: FG,
            marginTop: "16px",
            letterSpacing: "8px",
          }}
        >
          HALVING
        </span>
      </div>
    ),
    {
      width: 1024,
      height: 1024,
    }
  );
}
