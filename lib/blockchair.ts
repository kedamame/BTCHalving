const BLOCKCHAIR_BASE = "https://api.blockchair.com";

export async function fetchBlockHeight(): Promise<number> {
  const res = await fetch(`${BLOCKCHAIR_BASE}/bitcoin/stats`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Blockchair API error: ${res.status}`);
  }

  const data = await res.json();
  return data.data.best_block_height as number;
}
