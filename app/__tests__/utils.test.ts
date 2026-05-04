import { formatMatchTime, calcReturn, calcAccaOdd, competitionBadge, competitionColor, oddDirection } from '@/lib/utils';

describe('utils', () => {
  describe('formatMatchTime', () => {
    it('formats ISO date string correctly', () => {
      const result = formatMatchTime('2024-01-15T14:30:00Z');
      expect(result).toMatch(/Mon 15 Jan · \d{2}:\d{2}/);
    });
  });

  describe('calcReturn', () => {
    it('calculates potential return correctly', () => {
      expect(calcReturn(100, 2.5)).toBe('250.00');
      expect(calcReturn(50, 1.8)).toBe('90.00');
    });
  });

  describe('calcAccaOdd', () => {
    it('multiplies all odds together', () => {
      expect(calcAccaOdd([2, 3, 1.5])).toBe(9);
      expect(calcAccaOdd([1.5, 2])).toBe(3);
    });

    it('returns 1 for empty array', () => {
      expect(calcAccaOdd([])).toBe(1);
    });
  });

  describe('competitionBadge', () => {
    it('returns UCL for Champions League', () => {
      expect(competitionBadge('UEFA Champions League')).toBe('UCL');
    });

    it('returns LaLiga for Spanish league', () => {
      expect(competitionBadge('LaLiga')).toBe('LaLiga');
    });

    it('returns EPL for Premier League', () => {
      expect(competitionBadge('Premier League')).toBe('EPL');
    });

    it('returns first 6 chars uppercase for unknown', () => {
      expect(competitionBadge('Random League')).toBe('RANDOM');
    });
  });

  describe('competitionColor', () => {
    it('returns ucl for Champions League', () => {
      expect(competitionColor('Champions League')).toBe('ucl');
    });

    it('returns laliga for LaLiga', () => {
      expect(competitionColor('LaLiga')).toBe('laliga');
    });

    it('returns default for others', () => {
      expect(competitionColor('Premier League')).toBe('default');
    });
  });

  describe('oddDirection', () => {
    it('returns up when current > prev', () => {
      expect(oddDirection(2.5, 2.0)).toBe('up');
    });

    it('returns down when current < prev', () => {
      expect(oddDirection(1.8, 2.0)).toBe('down');
    });

    it('returns same when equal', () => {
      expect(oddDirection(2.0, 2.0)).toBe('same');
    });
  });
});
