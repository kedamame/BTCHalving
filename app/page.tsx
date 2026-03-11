"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Client-side redirect so Farcaster crawler can read fc:frame meta from layout
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/en");
  }, [router]);

  return null;
}
