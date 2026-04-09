'use client';
import { useState } from 'react';
import { useBetSlipStore } from '@/store/betSlipStore';
import { calcReturn, calcAccaOdd } from '@/lib/utils';

export default function RightSidebar() {
  const [activeTab, setActiveTab] = useState<'betslip' | 'jenga'>('betslip');
  const { selections, isOpen, stake, setStake, removeSelection, clearAll } = useBetSlipStore();
  const totalOdds = calcAccaOdd(selections.map((s) => s.oddValue));
  const potentialReturn = calcReturn(stake, totalOdds);

  return (
    <aside className="right-sidebar">
      {/* Header tabs */}
      <div className="betslip-tabs">
        <button
          className={`betslip-tab ${activeTab === 'betslip' ? 'active' : ''}`}
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
      </div>

      {/* Body */}
      {activeTab === 'betslip' && (
        <>
          {selections.length === 0 ? (
            <div className="betslip-empty">
              <span style={{ fontSize: 40 }}>🎯</span>
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
          <span style={{ fontSize: 40 }}>🎲</span>
          <p style={{ color: '#6b7280' }}>No Jenga bets placed yet.</p>
        </div>
      )}
    </aside>
  );
}