import { render, screen, fireEvent } from '@testing-library/react';
import MatchRow from '@/components/MatchRow';
import { useBetSlipStore } from '@/store/betSlipStore';

jest.mock('@/store/betSlipStore');

const mockGame = {
  parent_match_id: 1,
  home_team: 'Arsenal',
  away_team: 'Chelsea',
  start_time: '2024-01-15T14:30:00Z',
  sport_name: 'Football',
  competition_id: 1,
  competition_name: 'Premier League',
  country_name: 'England',
  country_code: 'GB',
  result: '',
  status: 1,
  status_desc: 'Not Started',
  total_markets: 150,
  markets: [
    {
      sub_type_id: 1,
      name: '1x2',
      market_type: 'main',
      odds: [
        { event_odd_id: 1, parent_match_id: 1, sub_type_id: 1, outcome_id: '1', outcome_name: 'Home', outcome_alias: '1', market_name: '1x2', odd_value: 2.5, prev_odd_value: 2.4, status: 1, market_status: 1 },
        { event_odd_id: 2, parent_match_id: 1, sub_type_id: 1, outcome_id: '2', outcome_name: 'Draw', outcome_alias: 'X', market_name: '1x2', odd_value: 3.2, prev_odd_value: 3.1, status: 1, market_status: 1 },
        { event_odd_id: 3, parent_match_id: 1, sub_type_id: 1, outcome_id: '3', outcome_name: 'Away', outcome_alias: '2', market_name: '1x2', odd_value: 2.8, prev_odd_value: 2.9, status: 1, market_status: 1 },
      ],
    },
  ],
};

describe('MatchRow', () => {
  const mockAddSelection = jest.fn();
  const mockHasSelection = jest.fn().mockReturnValue(false);

  beforeEach(() => {
    jest.clearAllMocks();
    (useBetSlipStore as unknown as jest.Mock).mockReturnValue({
      addSelection: mockAddSelection,
      hasSelection: mockHasSelection,
    });
  });

  it('renders team names', () => {
    render(<MatchRow game={mockGame} />);
    expect(screen.getByText('Arsenal')).toBeInTheDocument();
    expect(screen.getByText('Chelsea')).toBeInTheDocument();
  });

  it('renders match time', () => {
    render(<MatchRow game={mockGame} />);
    expect(screen.getByText(/Mon 15 Jan/)).toBeInTheDocument();
  });

  it('renders 1x2 odds', () => {
    render(<MatchRow game={mockGame} />);
    expect(screen.getByText('2.50')).toBeInTheDocument();
    expect(screen.getByText('3.20')).toBeInTheDocument();
    expect(screen.getByText('2.80')).toBeInTheDocument();
  });

  it('calls addSelection when odd is clicked', () => {
    render(<MatchRow game={mockGame} />);
    const homeOdd = screen.getByText('2.50').closest('button');
    fireEvent.click(homeOdd!);
    expect(mockAddSelection).toHaveBeenCalledWith({
      matchId: 1,
      homeTeam: 'Arsenal',
      awayTeam: 'Chelsea',
      marketName: '1x2',
      outcomeName: 'Home',
      outcomeAlias: '1',
      oddValue: 2.5,
      eventOddId: 1,
    });
  });

  it('shows selected state for active odds', () => {
    mockHasSelection.mockReturnValue(true);
    render(<MatchRow game={mockGame} />);
    const homeOdd = screen.getByText('2.50').closest('button');
    expect(homeOdd).toHaveClass('selected');
  });

  it('displays total markets count', () => {
    render(<MatchRow game={mockGame} />);
    expect(screen.getByText('150+')).toBeInTheDocument();
  });
});
