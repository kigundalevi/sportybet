import { render, screen, fireEvent } from '@testing-library/react';
import RightSidebar from '@/components/RightSidebar';
import { useBetSlipStore } from '@/store/betSlipStore';

jest.mock('@/store/betSlipStore');

describe('RightSidebar', () => {
  const mockSetStake = jest.fn();
  const mockRemoveSelection = jest.fn();
  const mockClearAll = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows empty state when no selections', () => {
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      selections: [],
      stake: 100,
      setStake: mockSetStake,
      removeSelection: mockRemoveSelection,
      clearAll: mockClearAll,
    });

    render(<RightSidebar />);
    expect(screen.getByText(/No bets selected/)).toBeInTheDocument();
  });

  it('displays selections when present', () => {
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      selections: [
        {
          matchId: 1,
          homeTeam: 'Arsenal',
          awayTeam: 'Chelsea',
          marketName: '1x2',
          outcomeName: 'Home',
          outcomeAlias: '1',
          oddValue: 2.5,
          eventOddId: 1,
        },
      ],
      stake: 100,
      setStake: mockSetStake,
      removeSelection: mockRemoveSelection,
      clearAll: mockClearAll,
    });

    render(<RightSidebar />);
    expect(screen.getByText(/Arsenal vs Chelsea/)).toBeInTheDocument();
    expect(screen.getAllByText('2.50')[0]).toBeInTheDocument();
  });

  it('calculates total odds correctly', () => {
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      selections: [
        { matchId: 1, homeTeam: 'A', awayTeam: 'B', marketName: '1x2', outcomeName: 'Home', outcomeAlias: '1', oddValue: 2.0, eventOddId: 1 },
        { matchId: 2, homeTeam: 'C', awayTeam: 'D', marketName: '1x2', outcomeName: 'Away', outcomeAlias: '2', oddValue: 3.0, eventOddId: 2 },
      ],
      stake: 100,
      setStake: mockSetStake,
      removeSelection: mockRemoveSelection,
      clearAll: mockClearAll,
    });

    render(<RightSidebar />);
    expect(screen.getByText('6.00')).toBeInTheDocument();
  });

  it('calculates potential return correctly', () => {
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      selections: [
        { matchId: 1, homeTeam: 'A', awayTeam: 'B', marketName: '1x2', outcomeName: 'Home', outcomeAlias: '1', oddValue: 2.5, eventOddId: 1 },
      ],
      stake: 100,
      setStake: mockSetStake,
      removeSelection: mockRemoveSelection,
      clearAll: mockClearAll,
    });

    render(<RightSidebar />);
    expect(screen.getByText(/KES 250.00/)).toBeInTheDocument();
  });

  it('calls removeSelection when X is clicked', () => {
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      selections: [
        { matchId: 1, homeTeam: 'A', awayTeam: 'B', marketName: '1x2', outcomeName: 'Home', outcomeAlias: '1', oddValue: 2.5, eventOddId: 1 },
      ],
      stake: 100,
      setStake: mockSetStake,
      removeSelection: mockRemoveSelection,
      clearAll: mockClearAll,
    });

    render(<RightSidebar />);
    const removeButtons = screen.getAllByRole('button');
    const removeBtn = removeButtons.find(btn => btn.textContent === '×');
    fireEvent.click(removeBtn!);
    expect(mockRemoveSelection).toHaveBeenCalledWith(1);
  });

  it('calls clearAll when clear all is clicked', () => {
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      selections: [
        { matchId: 1, homeTeam: 'A', awayTeam: 'B', marketName: '1x2', outcomeName: 'Home', outcomeAlias: '1', oddValue: 2.5, eventOddId: 1 },
      ],
      stake: 100,
      setStake: mockSetStake,
      removeSelection: mockRemoveSelection,
      clearAll: mockClearAll,
    });

    render(<RightSidebar />);
    const clearBtn = screen.getByText('Clear all');
    fireEvent.click(clearBtn);
    expect(mockClearAll).toHaveBeenCalledTimes(1);
  });

  it('updates stake when input changes', () => {
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      selections: [
        { matchId: 1, homeTeam: 'A', awayTeam: 'B', marketName: '1x2', outcomeName: 'Home', outcomeAlias: '1', oddValue: 2.5, eventOddId: 1 },
      ],
      stake: 100,
      setStake: mockSetStake,
      removeSelection: mockRemoveSelection,
      clearAll: mockClearAll,
    });

    render(<RightSidebar />);
    const stakeInput = screen.getByDisplayValue('100');
    fireEvent.change(stakeInput, { target: { value: '500' } });
    expect(mockSetStake).toHaveBeenCalledWith(500);
  });

  it('switches between betslip and jenga tabs', () => {
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      selections: [],
      stake: 100,
      setStake: mockSetStake,
      removeSelection: mockRemoveSelection,
      clearAll: mockClearAll,
    });

    render(<RightSidebar />);
    const jengaTab = screen.getByText(/Jenga bets/);
    fireEvent.click(jengaTab);
    expect(screen.getByText(/No Jenga bets placed yet/)).toBeInTheDocument();
  });
});
