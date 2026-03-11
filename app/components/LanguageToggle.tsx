"use client";

import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale() as "en" | "ja";
  const router = useRouter();
  const pathname = usePathname();

  const toggle = (lang: "en" | "ja") => {
    // Replace locale segment in pathname
    const newPath = pathname.replace(`/${locale}`, `/${lang}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-full p-1">
      <button
        onClick={() => toggle("en")}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
          locale === "en"
            ? "bg-[#F7931A] text-black"
            : "text-gray-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => toggle("ja")}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
          locale === "ja"
            ? "bg-[#F7931A] text-black"
            : "text-gray-400 hover:text-white"
        }`}
      >
        JP
      </button>
    </div>
  );
}
