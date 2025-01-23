export enum TeamId {
  HOME = 'home',
  AWAY = 'away'
}

export type TeamType = TeamId.HOME | TeamId.AWAY;

export interface Team {
  type: TeamType;
  name: string;
  score: number;
}

export interface Match {
  matchId: string;
  homeTeam: Team;
  awayTeam: Team;
  timestamp?: number;
}
