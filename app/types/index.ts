
export interface Odd {
  event_odd_id: number;
  parent_match_id: number;
  sub_type_id: number;
  outcome_id: string;
  outcome_name: string;
  outcome_alias: string;
  market_name: string;
  odd_value: number;
  prev_odd_value: number;
  status: number;
  market_status: number;
}

export interface Market {
  sub_type_id: number;
  name: string;
  market_type: string;
  market_priority?: number;
  odds: Odd[];
}

export interface Game {
  parent_match_id: number;
  home_team: string;
  away_team: string;
  start_time: string;
  sport_name: string;
  competition_id: number;
  competition_name: string;
  country_name: string;
  country_code: string;
  result: string;
  status: number;
  status_desc: string;
  total_markets: number;
  markets: Market[];
}

export interface BetSelection {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  marketName: string;
  outcomeName: string;
  outcomeAlias: string;
  oddValue: number;
  eventOddId: number;
}