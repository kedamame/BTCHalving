"use client";

import { useTranslations } from "next-intl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { HALVING_DATA } from "@/lib/halving";

const chartData = HALVING_DATA
  .filter((h): h is typeof h & { gainPercent: number } => h.gainPercent !== null)
  .map((h) => ({
    name: h.date.split("-")[0],
    gain: h.gainPercent,
    color: h.color,
  }));

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#2A2A2A] border border-[#3A3A3A] rounded-lg px-3 py-2 text-sm">
        <p className="text-gray-400">{label}</p>
        <p className="text-white font-bold">+{payload[0].value.toLocaleString()}%</p>
      </div>
    );
  }
  return null;
}

export default function HalvingBarChart() {
  const t = useTranslations();

  return (
    <div>
      <p className="text-xs text-gray-400 mb-4">{t("gain1Year")} (1 year after halving)</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: "#9CA3AF", fontSize: 12 }}
            axisLine={{ stroke: "#2A2A2A" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `+${(v / 1000).toFixed(0)}k%`}
            tick={{ fill: "#9CA3AF", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.05)" }} />
          <Bar dataKey="gain" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
