"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import CountdownTimer from "../components/CountdownTimer";
import BlockStats from "../components/BlockStats";
import HalvingBarChart from "../components/HalvingBarChart";
import HalvingHistoryTable from "../components/HalvingHistoryTable";
import ShareButton from "../components/ShareButton";
import LanguageToggle from "../components/LanguageToggle";
import sdk from "@farcaster/frame-sdk";

interface MarketData {
  btcPrice: number | null;
  blockHeight: number | null;
  isDelayed: boolean;
}

export default function HomePage() {
  const t = useTranslations();
  const [marketData, setMarketData] = useState<MarketData>({
    btcPrice: null,
    blockHeight: null,
    isDelayed: false,
  });

  useEffect(() => {
    // Initialize Farcaster MiniApp
    sdk.actions.ready().catch(() => {
      // Not in Farcaster context, ignore
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/price");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setMarketData({
          btcPrice: data.btcPrice,
          blockHeight: data.blockHeight,
          isDelayed: false,
        });
      } catch {
        setMarketData((prev) => ({ ...prev, isDelayed: true }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#0D0D0D] text-white">
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span>🪙</span>
            <span className="text-[#F7931A]">{t("title")}</span>
          </h1>
          <LanguageToggle />
        </div>

        {/* Countdown Section */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-4">
          <p className="text-sm text-gray-400 mb-3">{t("nextHalving")}</p>
          <CountdownTimer blockHeight={marketData.blockHeight} />
        </div>

        {/* Block Stats */}
        <BlockStats
          btcPrice={marketData.btcPrice}
          blockHeight={marketData.blockHeight}
          isDelayed={marketData.isDelayed}
        />

        {/* Past Halvings Bar Chart */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-4">
          <h2 className="text-base font-bold mb-4 text-white">{t("pastHalvings")}</h2>
          <HalvingBarChart />
        </div>

        {/* Past Halvings Table */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6 mb-4">
          <HalvingHistoryTable />
        </div>

        {/* Share Button */}
        <ShareButton
          btcPrice={marketData.btcPrice}
          blockHeight={marketData.blockHeight}
        />

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-6">
          Powered by CoinGecko & Blockchair
        </p>
      </div>
    </main>
  );
}
