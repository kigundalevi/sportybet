'use client';

interface TopNavProps {
  onMenuClick?: () => void;
}

const TABS = [
  { id: 'home',    label: 'Home',    icon: <ion-icon name="home-outline" /> },
  { id: 'live',    label: 'Live',    icon: null, live: true },
  { id: 'aviator', label: 'Aviator', icon: <ion-icon name="airplane-outline" style={{ color: 'red' }} /> },
  { id: 'crash',   label: 'Crash',   icon: '🎲' },
  { id: 'league',  label: 'League',  icon: <ion-icon name="cash-outline" style={{ color: 'green' }} /> },
];

import { useState } from 'react';

export default function TopNav({ onMenuClick }: TopNavProps) {
  const [active, setActive] = useState('home');

  return (
    <nav className="top-nav">
      {/* Hamburger — mobile only */}
      <button className="nav-hamburger" onClick={onMenuClick} aria-label="Open menu">
        <ion-icon name="menu-outline" />
      </button>

      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-tab ${active === tab.id ? 'active' : ''}`}
          onClick={() => setActive(tab.id)}
        >
          {tab.live ? (
            <>
              <span style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: '#dc2626', borderRadius: 4, padding: '1px 5px',
                fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.04em',
              }}>
                LIVE
              </span>
              {tab.label}
            </>
          ) : (
            <>
              {tab.icon && <span style={{ fontSize: 15 }}>{tab.icon}</span>}
              {tab.label}
            </>
          )}
        </button>
      ))}
    </nav>
  );
}