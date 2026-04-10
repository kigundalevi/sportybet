'use client';

import { useEffect } from 'react';

interface LeftSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const QUICK_ACTIONS = [
  { icon: <ion-icon name="list-outline" />,           label: 'MyBets' },
  { icon: <ion-icon name="person-circle-outline" />,  label: 'Profile' },
  { icon: <ion-icon name="chatbubbles-outline" />,    label: 'Chat us' },
  { icon: <ion-icon name="people-outline" />,         label: 'Join Affiliate' },
  { icon: <ion-icon name="flame" />,                  label: 'Promos' },
];

const TOP_GAMES = [
  { id: 'aviator', cls: 'game-card-aviator', image: '/images/AVIATOR.webp' },
  { id: 'jetx',    cls: 'game-card-jetx',    image: '/images/jetx.webp' },
  { id: 'nav',     cls: 'game-card-nav',     image: '/images/navigator.webp' },
];

const TOP_LEAGUES = [
  { flag: '',    name: 'International' },
  { flag: '󠁢',   name: 'England Premier League' },
  { flag: '🇪🇸',  name: 'LaLiga' },
  { flag: '🇩🇪',  name: 'Bundesliga' },
  { flag: '🇮🇹',  name: 'Serie A' },
  { flag: '',    name: 'UEFA Champions League' },
];

export default function LeftSidebar({ isOpen = false, onClose }: LeftSidebarProps) {
  // Prevent background scroll when drawer is open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    document.body.style.overflow = isMobile && isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <div
        className={`drawer-backdrop${isOpen ? ' visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside className={`left-sidebar${isOpen ? ' open' : ''}`}>
        {/* Mobile-only header row */}
        <div className="sidebar-mobile-header">
          <span className="sidebar-mobile-title">Menu</span>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="search-wrap">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input className="search-input" placeholder="Search" />
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          {QUICK_ACTIONS.map((a) => (
            <button key={a.label} className="qa-btn">
              <span className="qa-icon">{a.icon}</span>
              <span style={{ whiteSpace: 'nowrap', fontSize: '9px' }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Top Games */}
        <div className="section-heading">Top Games</div>
        {TOP_GAMES.map((g) => (
          <div key={g.id} className={`game-card ${g.cls}`}>
            <img src={g.image} alt={g.id} className="game-card-bg" />
          </div>
        ))}

        <div style={{ height: 8 }} />

        {/* Top Leagues */}
        <div className="section-heading">Top Leagues</div>
        {TOP_LEAGUES.map((l) => (
          <div key={l.name} className="league-item">
            <span className="league-flag">{l.flag}</span>
            <span style={{ fontSize: 12 }}>{l.name}</span>
          </div>
        ))}
      </aside>
    </>
  );
}