export const HALVING_DATA = [
  {
    epoch: 1,
    block: 210000,
    date: "2012-11-28",
    priceAtHalving: 12.35,
    price1YearAfter: 1008,
    gainPercent: 8069,
    color: "#F97316",
  },
  {
    epoch: 2,
    block: 420000,
    date: "2016-07-09",
    priceAtHalving: 650,
    price1YearAfter: 2526,
    gainPercent: 289,
    color: "#FB923C",
  },
  {
    epoch: 3,
    block: 630000,
    date: "2020-05-11",
    priceAtHalving: 8750,
    price1YearAfter: 57000,
    gainPercent: 551,
    color: "#FBBF24",
  },
  {
    epoch: 4,
    block: 840000,
    date: "2024-04-20",
    priceAtHalving: 63000,
    price1YearAfter: null,
    gainPercent: null,
    color: "#FCD34D",
  },
] as const;

export const NEXT_HALVING_BLOCK = 1050000;
export const AVG_BLOCK_TIME_SECONDS = 600;

export function calculateCountdown(currentBlockHeight: number) {
  const blocksRemaining = Math.max(0, NEXT_HALVING_BLOCK - currentBlockHeight);
  const secondsRemaining = blocksRemaining * AVG_BLOCK_TIME_SECONDS;
  const estimatedDate = new Date(Date.now() + secondsRemaining * 1000);

  const days = Math.floor(secondsRemaining / 86400);
  const hours = Math.floor((secondsRemaining % 86400) / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = Math.floor(secondsRemaining % 60);

  return { blocksRemaining, secondsRemaining, estimatedDate, days, hours, minutes, seconds };
}

export function formatPrice(price: number): string {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: price < 1 ? 2 : 0,
    maximumFractionDigits: price < 1 ? 4 : 0,
  });
}

export function formatBlockHeight(height: number): string {
  return height.toLocaleString("en-US");
}
