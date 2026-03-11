import { NextResponse } from "next/server";
import { fetchBTCPrice } from "@/lib/coingecko";
import { fetchBlockHeight } from "@/lib/blockchair";

let cache: { btcPrice: number; blockHeight: number; timestamp: number } | null = null;
const CACHE_DURATION = 60 * 1000; // 60 seconds

export async function GET() {
  // Return cached data if still fresh
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return NextResponse.json({
      btcPrice: cache.btcPrice,
      blockHeight: cache.blockHeight,
      cached: true,
    });
  }

  try {
    const [btcPrice, blockHeight] = await Promise.all([
      fetchBTCPrice(),
      fetchBlockHeight(),
    ]);

    cache = { btcPrice, blockHeight, timestamp: Date.now() };

    return NextResponse.json({ btcPrice, blockHeight, cached: false });
  } catch (error) {
    console.error("Price API error:", error);

    // Return stale cache if available
    if (cache) {
      return NextResponse.json({
        btcPrice: cache.btcPrice,
        blockHeight: cache.blockHeight,
        cached: true,
        stale: true,
      });
    }

    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}
