'use client';
import { useState } from 'react';
import { useBetSlipStore } from '@/store/betSlipStore';
import { calcReturn, calcAccaOdd } from '@/lib/utils';

export default function RightSidebar() {
  const [activeTab, setActiveTab] = useState<'betslip' | 'jenga'>('betslip');
  const [isOpen, setIsOpen] = useState(false);
  const { selections, stake, setStake, removeSelection, clearAll } = useBetSlipStore();
  const totalOdds = calcAccaOdd(selections.map((s) => s.oddValue));
  const potentialReturn = calcReturn(stake, totalOdds);

  return (
    <>
      {/* Mobile FAB */}
      {selections.length > 0 && (
        <button
          onClick={() => setIsOpen(true)}
          className="mobile-betslip-fab"
          style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 99,
            background: 'var(--green)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            boxShadow: '0 4px 12px rgba(22,163,74,0.4)',
          }}
        >
          <ion-icon name="pricetags" style={{color: '#cb2828'}}></ion-icon>
          <span style={{
            position: 'absolute',
            top: -4,
            right: -4,
            background: '#ef4444',
            color: '#fff',
            fontSize: 11,
            fontWeight: 700,
            width: 22,
            height: 22,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {selections.length}
          </span>
        </button>
      )}
      <style>{`
        @media (max-width: 768px) {
          .mobile-betslip-fab { display: flex !important; }
        }
      `}</style>

      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
            display: 'none',
          }}
          className="betslip-backdrop"
        />
      )}
      <style>{`
        @media (max-width: 768px) {
          .betslip-backdrop { display: block !important; }
        }
      `}</style>

      <aside className={`right-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header tabs */}
        <div className="betslip-tabs" style={{ position: 'relative' }}>
          <button
            className={`betslip-tab ${activeTab === 'betslip' ? 'dark-active' : ''}`}
            onClick={() => setActiveTab('betslip')}
          >
            Betslip ({selections.length})
          </button>
          <button
            className={`betslip-tab ${activeTab === 'jenga' ? 'dark-active' : ''}`}
            onClick={() => setActiveTab('jenga')}
            style={activeTab === 'jenga' ? { background: '#0f1b33', color: '#fff' } : {}}
          >
            Jenga bets (0)
          </button>
          {/* Mobile close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="mobile-close-btn"
            style={{
              display: 'none',
              position: 'absolute',
              right: 12,
              top: 12,
              background: 'none',
              border: 'none',
              fontSize: 24,
              color: 'var(--text-muted)',
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .mobile-close-btn { display: block !important; }
          }
        `}</style>

        {/* Body */}
        {activeTab === 'betslip' && (
          <>
            {selections.length === 0 ? (
              <div className="betslip-empty">
                <span style={{ fontSize: 40 }}></span>
                <p style={{ color: '#6b7280', fontSize: 13 }}>
                  No bets selected.<br />Click any odds to add to your slip.
                </p>
              </div>
            ) : (
              <>
                {/* Selections */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {selections.map((sel) => (
                    <div key={sel.eventOddId} style={{ background: '#f9fafb', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 12px', position: 'relative' }}>
                      <button
                        onClick={() => removeSelection(sel.eventOddId)}
                        style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', color: '#9ca3af', fontSize: 15, cursor: 'pointer', lineHeight: 1 }}
                      >×</button>
                      <div style={{ fontSize: 11, color: '#6b7280', marginBottom: 3, paddingRight: 18 }}>
                        {sel.homeTeam} vs {sel.awayTeam}
                      </div>
                      <div style={{ fontSize: 12, color: '#374151', marginBottom: 5 }}>
                        <span style={{ color: '#9ca3af' }}>{sel.marketName}: </span>
                        <span style={{ fontWeight: 600 }}>{sel.outcomeAlias || sel.outcomeName}</span>
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#16a34a' }}>
                        {sel.oddValue.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selections.length > 0 && (
                    <button onClick={clearAll} style={{ background: 'none', border: 'none', color: '#9ca3af', fontSize: 12, cursor: 'pointer', textAlign: 'left' }}>
                      Clear all
                    </button>
                  )}
                  <div>
                    <label style={{ display: 'block', fontSize: 11, color: '#6b7280', marginBottom: 4, fontWeight: 600 }}>Stake (KES)</label>
                    <input
                      type="number"
                      value={stake}
                      min={10}
                      onChange={(e) => setStake(Number(e.target.value))}
                      style={{ width: '100%', padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 13, outline: 'none' }}
                    />
                    <div style={{ display: 'flex', gap: 4, marginTop: 5 }}>
                      {[50, 100, 500, 1000].map((amt) => (
                        <button key={amt} onClick={() => setStake(amt)}
                          style={{ flex: 1, padding: '4px 0', border: `1px solid ${stake === amt ? '#16a34a' : 'var(--border)'}`, borderRadius: 6, background: stake === amt ? '#f0fdf4' : '#fff', color: stake === amt ? '#16a34a' : '#6b7280', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}
                        >{amt}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>Total Odds</span>
                    <span style={{ fontSize: 15, fontWeight: 700 }}>{totalOdds.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: '#6b7280' }}>Potential Return</span>
                    <span style={{ fontSize: 16, fontWeight: 700, color: '#16a34a' }}>KES {potentialReturn}</span>
                  </div>
                  <button style={{ width: '100%', padding: '10px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                    Place Bet
                  </button>
                  <p style={{ fontSize: 10, color: '#9ca3af', textAlign: 'center' }}>18+ · Gamble responsibly</p>
                </div>
              </>
            )}
          </>
        )}

        {activeTab === 'jenga' && (
          <div className="betslip-empty">
            <span style={{ fontSize: 40 }}></span>
            <p style={{ color: '#6b7280' }}>No Jenga bets placed yet.</p>
          </div>
        )}
      </aside>
    </>
  );
}
