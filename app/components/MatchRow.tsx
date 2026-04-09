'use client';
import { Game } from '@/types';
import { formatMatchTime } from '@/lib/utils';
import { useBetSlipStore } from '@/store/betSlipStore';

interface MatchRowProps {
  game: Game;
}

// Flatten all odds we need from multiple markets
function getMarketOdd(game: Game, subTypeId: number, outcomeId: string) {
  const market = game.markets.find((m) => m.sub_type_id === subTypeId);
  return market?.odds.find((o) => o.outcome_id === outcomeId);
}

export default function MatchRow({ game }: MatchRowProps) {
  const { addSelection, hasSelection } = useBetSlipStore();

  const handleOdd = (marketName: string, outcomeId: string, subTypeId: number) => {
    const market = game.markets.find((m) => m.sub_type_id === subTypeId);
    const odd = market?.odds.find((o) => o.outcome_id === outcomeId);
    if (!odd) return;
    addSelection({
      matchId: game.parent_match_id,
      homeTeam: game.home_team,
      awayTeam: game.away_team,
      marketName,
      outcomeName: odd.outcome_name,
      outcomeAlias: odd.outcome_alias,
      oddValue: odd.odd_value,
      eventOddId: odd.event_odd_id,
    });
  };

  // 1x2 market (sub_type_id=1): outcomes 1, X(2), 2(3)
  const h   = getMarketOdd(game, 1, '1');   // home win
  const d   = getMarketOdd(game, 1, '2');   // draw
  const a   = getMarketOdd(game, 1, '3');   // away win

  // Double chance (sub_type_id=10): 1orX(9), 1or2(10), Xor2(11)
  const hd  = getMarketOdd(game, 10, '9');
  const ha  = getMarketOdd(game, 10, '10');
  const da  = getMarketOdd(game, 10, '11');

  // BTTS (sub_type_id=29): yes(74), no(76)
  const yes = getMarketOdd(game, 29, '74');
  const no  = getMarketOdd(game, 29, '76');

  const OddCell = ({ odd, marketName, outcomeId, subTypeId, label }: {
    odd: typeof h; marketName: string; outcomeId: string; subTypeId: number; label: string;
  }) => {
    if (!odd) return <div className="odd-btn" style={{ opacity: 0.3 }}><span className="odd-label">{label}</span><span className="odd-value">-</span></div>;
    const sel = hasSelection(odd.event_odd_id);
    return (
      <button
        className={`odd-btn ${sel ? 'selected' : ''}`}
        onClick={() => handleOdd(marketName, outcomeId, subTypeId)}
        title={odd.outcome_alias}
      >
        <span className="odd-label">{label}</span>
        <span className="odd-value">{odd.odd_value.toFixed(2)}</span>
      </button>
    );
  };

  return (
    <div className="match-row">
      {/* Teams + time */}
      <div className="match-teams">
        <div className="team-name">{game.home_team}</div>
        <div className="team-name">{game.away_team}</div>
        <div className="match-time">{formatMatchTime(game.start_time)}</div>
      </div>

      {/* All odds inline */}
      <div className="odds-group">
        {/* 1x2 */}
        <OddCell odd={h}  marketName="1x2" outcomeId="1" subTypeId={1} label="1" />
        <OddCell odd={d}  marketName="1x2" outcomeId="2" subTypeId={1} label="X" />
        <OddCell odd={a}  marketName="1x2" outcomeId="3" subTypeId={1} label="2" />

        <div className="odds-divider" />

        {/* Double Chance */}
        <OddCell odd={hd} marketName="Double Chance" outcomeId="9"  subTypeId={10} label="1 or X" />
        <OddCell odd={ha} marketName="Double Chance" outcomeId="10" subTypeId={10} label="1 or 2" />
        <OddCell odd={da} marketName="Double Chance" outcomeId="11" subTypeId={10} label="X or 2" />

        <div className="odds-divider" />

        {/* BTTS */}
        <OddCell odd={yes} marketName="BTTS" outcomeId="74" subTypeId={29} label="Yes" />
        <OddCell odd={no}  marketName="BTTS" outcomeId="76" subTypeId={29} label="No" />
      {/* More markets */}
      <button className="more-btn">
        <span>{game.total_markets}+</span>
        <span>More</span>
      </button>
      </div>

    </div>
  );
}