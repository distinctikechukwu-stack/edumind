export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function calculateLevel(xp: number) {
  return Math.floor(xp / 500) + 1;
}

export function xpForNextLevel(xp: number) {
  const level = calculateLevel(xp);
  return level * 500 - xp;
}
