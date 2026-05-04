import { renderHook, act } from '@testing-library/react';
import { useBetSlipStore } from '@/store/betSlipStore';

describe('betSlipStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useBetSlipStore());
    act(() => {
      result.current.clearAll();
      result.current.setStake(100);
    });
  });

  it('initializes with empty selections', () => {
    const { result } = renderHook(() => useBetSlipStore());
    expect(result.current.selections).toEqual([]);
  });

  it('adds selection to betslip', () => {
    const { result } = renderHook(() => useBetSlipStore());
    const selection = {
      matchId: 1,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      marketName: '1x2',
      outcomeName: 'Home',
      outcomeAlias: '1',
      oddValue: 2.5,
      eventOddId: 123,
    };

    act(() => {
      result.current.addSelection(selection);
    });

    expect(result.current.selections).toHaveLength(1);
    expect(result.current.selections[0]).toEqual(selection);
  });

  it('removes selection when same odd is clicked', () => {
    const { result } = renderHook(() => useBetSlipStore());
    const selection = {
      matchId: 1,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      marketName: '1x2',
      outcomeName: 'Home',
      outcomeAlias: '1',
      oddValue: 2.5,
      eventOddId: 123,
    };

    act(() => {
      result.current.addSelection(selection);
      result.current.addSelection(selection);
    });

    expect(result.current.selections).toHaveLength(0);
  });

  it('replaces selection from same match', () => {
    const { result } = renderHook(() => useBetSlipStore());
    const selection1 = {
      matchId: 1,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      marketName: '1x2',
      outcomeName: 'Home',
      outcomeAlias: '1',
      oddValue: 2.5,
      eventOddId: 123,
    };
    const selection2 = {
      matchId: 1,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      marketName: '1x2',
      outcomeName: 'Away',
      outcomeAlias: '2',
      oddValue: 3.0,
      eventOddId: 124,
    };

    act(() => {
      result.current.addSelection(selection1);
      result.current.addSelection(selection2);
    });

    expect(result.current.selections).toHaveLength(1);
    expect(result.current.selections[0].eventOddId).toBe(124);
  });

  it('removes selection by eventOddId', () => {
    const { result } = renderHook(() => useBetSlipStore());
    const selection = {
      matchId: 1,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      marketName: '1x2',
      outcomeName: 'Home',
      outcomeAlias: '1',
      oddValue: 2.5,
      eventOddId: 123,
    };

    act(() => {
      result.current.addSelection(selection);
      result.current.removeSelection(123);
    });

    expect(result.current.selections).toHaveLength(0);
  });

  it('checks if selection exists', () => {
    const { result } = renderHook(() => useBetSlipStore());
    const selection = {
      matchId: 1,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      marketName: '1x2',
      outcomeName: 'Home',
      outcomeAlias: '1',
      oddValue: 2.5,
      eventOddId: 123,
    };

    act(() => {
      result.current.addSelection(selection);
    });

    expect(result.current.hasSelection(123)).toBe(true);
    expect(result.current.hasSelection(999)).toBe(false);
  });

  it('clears all selections', () => {
    const { result } = renderHook(() => useBetSlipStore());
    const selection = {
      matchId: 1,
      homeTeam: 'Team A',
      awayTeam: 'Team B',
      marketName: '1x2',
      outcomeName: 'Home',
      outcomeAlias: '1',
      oddValue: 2.5,
      eventOddId: 123,
    };

    act(() => {
      result.current.addSelection(selection);
      result.current.clearAll();
    });

    expect(result.current.selections).toHaveLength(0);
  });

  it('updates stake', () => {
    const { result } = renderHook(() => useBetSlipStore());

    act(() => {
      result.current.setStake(500);
    });

    expect(result.current.stake).toBe(500);
  });
});
