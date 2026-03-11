import { NextRequest, NextResponse } from "next/server";

// Farcaster MiniApp webhook handler
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Farcaster webhook received:", body);

    // Handle webhook events here (e.g., frame_added, notifications_enabled)
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
