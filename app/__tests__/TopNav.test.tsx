import { render, screen, fireEvent } from '@testing-library/react';
import TopNav from '@/components/TopNav';

describe('TopNav', () => {
  it('renders all navigation tabs', () => {
    render(<TopNav />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Aviator')).toBeInTheDocument();
    expect(screen.getByText('Crash')).toBeInTheDocument();
    expect(screen.getByText('League')).toBeInTheDocument();
  });

  it('sets home as active by default', () => {
    render(<TopNav />);
    const homeTab = screen.getByText('Home').closest('button');
    expect(homeTab).toHaveClass('active');
  });

  it('changes active tab on click', () => {
    render(<TopNav />);
    const liveTab = screen.getByText('Live').closest('button');
    fireEvent.click(liveTab!);
    expect(liveTab).toHaveClass('active');
  });

  it('calls onMenuClick when hamburger is clicked', () => {
    const onMenuClick = jest.fn();
    render(<TopNav onMenuClick={onMenuClick} />);
    const hamburger = screen.getByLabelText('Open menu');
    fireEvent.click(hamburger);
    expect(onMenuClick).toHaveBeenCalledTimes(1);
  });

  it('calls onHomeClick when home tab is clicked', () => {
    const onHomeClick = jest.fn();
    render(<TopNav onHomeClick={onHomeClick} />);
    const homeTab = screen.getByText('Home').closest('button');
    fireEvent.click(homeTab!);
    expect(onHomeClick).toHaveBeenCalledTimes(1);
  });
});
