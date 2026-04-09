export function formatMatchTime(isoString: string): string {
  const date = new Date(isoString);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const day = days[date.getDay()];
  const d = String(date.getDate()).padStart(2, '0');
  const m = months[date.getMonth()];
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${day} ${d} ${m} · ${h}:${min}`;
}

/**
 * Calculate potential return from a stake and decimal odd.
 * Decimal odds: potential return = stake × odd
 */
export function calcReturn(stake: number, odd: number): string {
  return (stake * odd).toFixed(2);
}

/**
 * Calculate combined (accumulator) odd from all selections.
 */
export function calcAccaOdd(odds: number[]): number {
  return odds.reduce((acc, o) => acc * o, 1);
}

/**
 * Format competition name to a short badge label.
 */
export function competitionBadge(name: string): string {
  if (name.includes('Champions')) return 'UCL';
  if (name.includes('LaLiga') || name.includes('La Liga')) return 'LaLiga';
  if (name.includes('Premier')) return 'EPL';
  if (name.includes('Bundesliga')) return 'BL';
  if (name.includes('Serie A')) return 'SA';
  return name.slice(0, 6).toUpperCase();
}

/**
 * Return a colour class for a competition badge.
 */
export function competitionColor(name: string): string {
  if (name.includes('Champions')) return 'ucl';
  if (name.includes('LaLiga') || name.includes('La Liga')) return 'laliga';
  return 'default';
}

/**
 * Determine if an odd has drifted up, down, or stayed the same.
 */
export function oddDirection(current: number, prev: number): 'up' | 'down' | 'same' {
  if (current > prev) return 'up';
  if (current < prev) return 'down';
  return 'same';
}