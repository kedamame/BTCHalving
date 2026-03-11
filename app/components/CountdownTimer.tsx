"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { calculateCountdown, NEXT_HALVING_BLOCK } from "@/lib/halving";

interface CountdownTimerProps {
  blockHeight: number | null;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  blocksRemaining: number;
}

export default function CountdownTimer({ blockHeight }: CountdownTimerProps) {
  const t = useTranslations();
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (blockHeight === null) return;

    // Compute the estimated halving date once from the block height snapshot
    const { estimatedDate, blocksRemaining } = calculateCountdown(blockHeight);
    const targetMs = estimatedDate.getTime();

    const update = () => {
      const remainingMs = Math.max(0, targetMs - Date.now());
      const totalSeconds = Math.floor(remainingMs / 1000);

      setTimeLeft({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        blocksRemaining,
      });
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [blockHeight]);

  if (!timeLeft) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-400 text-sm">{t("loading")}</p>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div>
      {/* Main Countdown Display */}
      <div className="flex items-baseline gap-3 mb-4 flex-wrap">
        <div className="text-center">
          <span className="font-mono text-5xl font-bold text-white">
            {timeLeft.days}
          </span>
          <p className="text-xs text-gray-400 mt-1">{t("days")}</p>
        </div>
        <span className="font-mono text-4xl text-[#F7931A] font-bold pb-5">:</span>
        <div className="text-center">
          <span className="font-mono text-5xl font-bold text-white">
            {pad(timeLeft.hours)}
          </span>
          <p className="text-xs text-gray-400 mt-1">{t("hours")}</p>
        </div>
        <span className="font-mono text-4xl text-[#F7931A] font-bold pb-5">:</span>
        <div className="text-center">
          <span className="font-mono text-5xl font-bold text-white">
            {pad(timeLeft.minutes)}
          </span>
          <p className="text-xs text-gray-400 mt-1">{t("minutes")}</p>
        </div>
        <span className="font-mono text-4xl text-[#F7931A] font-bold pb-5">:</span>
        <div className="text-center">
          <span className="font-mono text-5xl font-bold text-white">
            {pad(timeLeft.seconds)}
          </span>
          <p className="text-xs text-gray-400 mt-1">{t("seconds")}</p>
        </div>
      </div>

      {/* Block Progress */}
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>
            {t("blocksRemaining")}: {timeLeft.blocksRemaining.toLocaleString()}
          </span>
          <span>Block #{NEXT_HALVING_BLOCK.toLocaleString()}</span>
        </div>
        <div className="w-full bg-[#2A2A2A] rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, ((NEXT_HALVING_BLOCK - timeLeft.blocksRemaining) / NEXT_HALVING_BLOCK) * 100)}%`,
              background: "linear-gradient(to right, #F7931A, #FCD34D)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
