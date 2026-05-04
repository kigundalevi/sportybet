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
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const groupedGames = useMemo(() => {
    return games.reduce<Record<string, Game[]>>((acc, g) => {
      if (!acc[g.competition_name]) acc[g.competition_name] = [];
      acc[g.competition_name].push(g);
      return acc;
    }, {});
  }, []);

  return (
    <div>
      <TopNav onMenuClick={() => setLeftOpen(true)} onHomeClick={() => setSelectedGame(null)} />

      <div className="page-layout">
        <LeftSidebar isOpen={leftOpen} onClose={() => setLeftOpen(false)} onGameClick={(gameId) => setSelectedGame(gameId)} />

        <main className="main-content">
          {selectedGame === 'aviator' && (
            <iframe
              src="https://stage.100hp.app/airjet_grm/test/?b=5f132e40ee5c0215e2b1ef1e66d088a4917cbe9f6fe576a912f65a38901e16fc1fc6125be1450e859fe3d50d2e44ee20950978129070174c32d0f25c43d45f7b952aee34c76d2347f16fbb42aa020981939e19da52f106091356a2f21064f40f2aff94c8f370c43d8dda1f926eb34fec1a0bd4e0effa440ddee8833a67416d73e1d8296d49e754106e66ccc3844b0297a8e5b61233fa5ee075896f4fafb40c9ff4151dfcdbd9e624e61e8f3e12.d56b150a69f4eff6ab7d7a4c374bd7ff.4096f4ba-22e6-486d-b5e9-80639fec596f&language=en&pik=019aea9c-ab29-7a4b-aa48-844140f9db9d"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Aviator Game"
            />
          )}

          {!selectedGame && <div className="promo-strip">
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
          </div>}

          {!selectedGame && <div className="content-tabs">
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
          </div>}

          {!selectedGame && Object.entries(groupedGames).map(([competition, compGames]) => (
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