import { render, screen, fireEvent } from '@testing-library/react';
import LeftSidebar from '@/components/LeftSidebar';

describe('LeftSidebar', () => {
  it('renders search input', () => {
    render(<LeftSidebar />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('renders all quick action buttons', () => {
    render(<LeftSidebar />);
    expect(screen.getByText('MyBets')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Chat us')).toBeInTheDocument();
    expect(screen.getByText('Join Affiliate')).toBeInTheDocument();
    expect(screen.getByText('Promos')).toBeInTheDocument();
  });

  it('renders top games section', () => {
    render(<LeftSidebar />);
    expect(screen.getByText('Top Games')).toBeInTheDocument();
  });

  it('renders top leagues section', () => {
    render(<LeftSidebar />);
    expect(screen.getByText('Top Leagues')).toBeInTheDocument();
    expect(screen.getByText('England Premier League')).toBeInTheDocument();
    expect(screen.getByText('LaLiga')).toBeInTheDocument();
  });

  it('applies open class when isOpen is true', () => {
    const { container } = render(<LeftSidebar isOpen={true} />);
    expect(container.querySelector('.left-sidebar')).toHaveClass('open');
  });

  it('calls onClose when backdrop is clicked', () => {
    const onClose = jest.fn();
    render(<LeftSidebar isOpen={true} onClose={onClose} />);
    const backdrop = document.querySelector('.drawer-backdrop');
    fireEvent.click(backdrop!);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onGameClick when game card is clicked', () => {
    const onGameClick = jest.fn();
    render(<LeftSidebar onGameClick={onGameClick} />);
    const gameCards = document.querySelectorAll('.game-card');
    fireEvent.click(gameCards[0]);
    expect(onGameClick).toHaveBeenCalledWith('aviator');
  });
});
