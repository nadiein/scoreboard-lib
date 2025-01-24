import { Match } from '../../match/Match';

export interface ScoreboardContextType {
  matches: Match[];
  sortedMatches: Match[];
  startMatch: (homeTeamName: string, awayTeamName: string) => void;
  updateScore: (matchId: string, homeScore: number, awayScore: number) => void;
  finishMatch: (matchId: string) => void;
}