"use client";

import { useTranslations } from "next-intl";
import { HALVING_DATA, formatPrice } from "@/lib/halving";

export default function HalvingHistoryTable() {
  const t = useTranslations();

  return (
    <div>
      <h2 className="text-base font-bold mb-4 text-white">{t("pastHalvings")}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2A2A2A]">
              <th className="text-left text-gray-400 font-normal pb-2 pr-3">#</th>
              <th className="text-left text-gray-400 font-normal pb-2 pr-3">{t("date")}</th>
              <th className="text-right text-gray-400 font-normal pb-2 pr-3">{t("priceAtHalving")}</th>
              <th className="text-right text-gray-400 font-normal pb-2">{t("gain1Year")}</th>
            </tr>
          </thead>
          <tbody>
            {HALVING_DATA.map((halving) => (
              <tr
                key={halving.epoch}
                className="border-b border-[#2A2A2A] last:border-0"
              >
                <td className="py-3 pr-3">
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-black"
                    style={{ backgroundColor: halving.color }}
                  >
                    {halving.epoch}
                  </span>
                </td>
                <td className="py-3 pr-3 text-gray-300">{halving.date}</td>
                <td className="py-3 pr-3 text-right text-white font-mono">
                  ${formatPrice(halving.priceAtHalving)}
                </td>
                <td className="py-3 text-right font-bold font-mono" style={{ color: halving.color }}>
                  {halving.gainPercent !== null
                    ? `+${halving.gainPercent.toLocaleString()}%`
                    : <span className="text-gray-500">{t("tbd")}</span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
