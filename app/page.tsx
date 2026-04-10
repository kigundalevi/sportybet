'use client';
import { useState, useMemo } from 'react';
import TopNav from '@/components/TopNav';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import MatchRow from '@/components/MatchRow';
import { Game } from '@/types';
import gamesData from '@/data/games.json';

const games = gamesData as Game[];

const PROMO_CARDS = [
  { image: '/images/promo-nobag.png', title: 'Sports welcome bonus.', bold: '100% up to KES 5,000', sub: 'on first deposit.', color: '#16a34a' },
  { image: '/images/promo.png',       title: 'Early Payout',           bold: 'on a 2-goal or',      sub: '20-point lead.',    color: '#16a34a' },
  { image: '/images/promo-nobag.png', title: 'Sports welcome bonus.', bold: '100% up to KES 5,000', sub: 'on first deposit.', color: '#16a34a' },
];

const CONTENT_TABS = ['Highlights', 'Live', 'Upcoming'];

export default function HomePage() {
  const [activeTab, setActiveTab]   = useState('Highlights');
  const [leftOpen,  setLeftOpen]    = useState(false);

  const groupedGames = useMemo(() => {
    return games.reduce<Record<string, Game[]>>((acc, g) => {
      if (!acc[g.competition_name]) acc[g.competition_name] = [];
      acc[g.competition_name].push(g);
      return acc;
    }, {});
  }, []);

  return (
    <div>
      <TopNav onMenuClick={() => setLeftOpen(true)} />

      <div className="page-layout">
        <LeftSidebar isOpen={leftOpen} onClose={() => setLeftOpen(false)} />

        <main className="main-content">
          <div className="promo-strip">
            {PROMO_CARDS.map((p, i) => (
              <div key={i} className="promo-card">
                <div className="promo-content">
                  <div className="promo-text">{p.title}</div>
                  <div className="promo-text" style={{ color: p.color }}>{p.bold}</div>
                  <div className="promo-sub">{p.sub}</div>
                </div>
                <img src={p.image} alt="promo" className="promo-image" />
              </div>
            ))}
          </div>

          <div className="content-tabs">
            {CONTENT_TABS.map((tab) => (
              <button
                key={tab}
                className={`content-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'Live' && (
                  <span style={{ marginRight: 5,
                    width: 7, height: 7, borderRadius: '50%',
                    background: activeTab === 'Live' ? '#fff' : '#ef4444',
                    display: 'inline-block',
                  }} />
                )}
                {tab}
              </button>
            ))}
          </div>

          {Object.entries(groupedGames).map(([competition, compGames]) => (
            <div key={competition} className="sport-block">
              <div className="sport-header">
                <span><ion-icon name="football-outline" style={{ fontSize: '30px' }} /></span>
                <span>Soccer</span>
              </div>
              {compGames.map((game) => (
                <MatchRow key={game.parent_match_id} game={game} />
              ))}
            </div>
          ))}
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}