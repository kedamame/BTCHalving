"use client";

import { useTranslations } from "next-intl";
import { openUrl } from "@/lib/farcaster";
import { calculateCountdown, formatPrice } from "@/lib/halving";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://btc-halving-two.vercel.app";

interface ShareButtonProps {
  btcPrice: number | null;
  blockHeight: number | null;
}

export default function ShareButton({
  btcPrice,
  blockHeight,
}: ShareButtonProps) {
  const t = useTranslations();

  const handleShare = () => {
    const days =
      blockHeight !== null ? calculateCountdown(blockHeight).days : "???";
    const price = btcPrice !== null ? formatPrice(btcPrice) : "???";

    const shareText = t("shareText", { days: String(days), price });

    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(APP_URL)}`;
    openUrl(shareUrl);
  };

  return (
    <button
      onClick={handleShare}
      className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all duration-200 active:scale-95"
      style={{
        background: "linear-gradient(135deg, #F7931A, #FB923C)",
        boxShadow: "0 4px 20px rgba(247, 147, 26, 0.3)",
      }}
    >
      🟣 {t("shareOnWarpcast")}
    </button>
  );
}
