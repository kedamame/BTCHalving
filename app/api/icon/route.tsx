import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F7931A, #FCD34D)",
          borderRadius: "200px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "420px", lineHeight: 1, color: "#000000" }}>
            ₿
          </span>
          <span
            style={{
              fontSize: "140px",
              fontWeight: "bold",
              color: "#000000",
              marginTop: "10px",
              fontFamily: "monospace",
            }}
          >
            HALVING
          </span>
        </div>
      </div>
    ),
    {
      width: 1024,
      height: 1024,
    }
  );
}
