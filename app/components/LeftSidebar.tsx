'use client';

const QUICK_ACTIONS = [
  { icon: '📋', label: 'My Bets' },
  { icon: '👤', label: 'Profile' },
  { icon: '💬', label: 'Chat us' },
  { icon: '👥', label: 'Join Affiliate' },
  { icon: '🎁', label: 'Promos' },
];

const TOP_GAMES = [
  { id: 'aviator', label: '', cls: 'game-card-aviator', image: '/images/AVIATOR.webp' },
  { id: 'jetx',    label: '',    cls: 'game-card-jetx',    image: '/images/JET X.webp' },
  { id: 'nav',     label: '', cls: 'game-card-nav',   image: '/images/navigator.webp' },
];

const TOP_LEAGUES = [
  { flag: '🌍', name: 'International' },
  { flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', name: 'England Premier League' },
  { flag: '🇪🇸', name: 'LaLiga' },
  { flag: '🇩🇪', name: 'Bundesliga' },
  { flag: '🇮🇹', name: 'Serie A' },
  { flag: '🏆', name: 'UEFA Champions League' },
];

export default function LeftSidebar() {
  return (
    <aside className="left-sidebar">
      {/* Search */}
      <div className="search-wrap">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input className="search-input" placeholder="Search" />
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {QUICK_ACTIONS.map((a) => (
          <button key={a.label} className="qa-btn">
            <span className="qa-icon">{a.icon}</span>
            <span>{a.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Top Games */}
      <div className="section-heading">Top Games</div>
      {TOP_GAMES.map((g) => (
        <div key={g.id} className="game-card">
          <img src={g.image} alt={g.label} className="game-card-bg"/>
          <span className="game-card-label">{g.label}</span>
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
  );
}