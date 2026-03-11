import { NextRequest, NextResponse } from "next/server";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://halving-countdown.vercel.app";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const buttonIndex = body?.untrustedData?.buttonIndex;

    if (buttonIndex === 1) {
      // Redirect to the app
      return NextResponse.json({
        type: "frame",
        frameUrl: APP_URL,
      });
    }

    return NextResponse.json({
      type: "frame",
      frameUrl: APP_URL,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid frame request" },
      { status: 400 }
    );
  }
}
