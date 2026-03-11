import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #F7931A, #FCD34D)",
          borderRadius: "40px",
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
          <span style={{ fontSize: "80px", lineHeight: 1 }}>₿</span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#000000",
              marginTop: "4px",
              fontFamily: "monospace",
            }}
          >
            HALVING
          </span>
        </div>
      </div>
    ),
    {
      width: 200,
      height: 200,
    }
  );
}
