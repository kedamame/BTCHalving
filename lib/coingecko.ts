const COINGECKO_BASE = "https://api.coingecko.com/api/v3";

export async function fetchBTCPrice(): Promise<number> {
  const res = await fetch(
    `${COINGECKO_BASE}/simple/price?ids=bitcoin&vs_currencies=usd`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    throw new Error(`CoinGecko API error: ${res.status}`);
  }

  const data = await res.json();
  return data.bitcoin.usd as number;
}
