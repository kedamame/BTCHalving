"use client";

import { useTranslations } from "next-intl";
import { formatPrice, formatBlockHeight } from "@/lib/halving";

interface BlockStatsProps {
  btcPrice: number | null;
  blockHeight: number | null;
  isDelayed: boolean;
}

export default function BlockStats({ btcPrice, blockHeight, isDelayed }: BlockStatsProps) {
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {/* BTC Price */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4">
        <p className="text-xs text-gray-400 mb-1">{t("currentPrice")}</p>
        <p className="text-2xl font-bold text-[#F7931A]">
          {btcPrice !== null ? (
            `$${formatPrice(btcPrice)}`
          ) : (
            <span className="text-gray-500 text-base">{t("loading")}</span>
          )}
        </p>
      </div>

      {/* Block Height */}
      <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-4">
        <p className="text-xs text-gray-400 mb-1">{t("blockHeight")}</p>
        <p className="text-2xl font-bold text-white">
          {blockHeight !== null ? (
            `#${formatBlockHeight(blockHeight)}`
          ) : (
            <span className="text-gray-500 text-base">{t("loading")}</span>
          )}
        </p>
      </div>

      {/* Delayed notice */}
      {isDelayed && (
        <div className="col-span-2">
          <p className="text-xs text-amber-500 text-center">⚠ {t("dataDelayed")}</p>
        </div>
      )}
    </div>
  );
}
