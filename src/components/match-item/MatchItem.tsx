import React, { FunctionComponent } from 'react';
import { Match, TeamId } from '../../models/match/Match';

export const MatchItem: FunctionComponent<{ match: Match; onFinishMatch: (id: string) => void; onUpdateScore: (id: string, home: number, away: number) => void }> = ({ match, onFinishMatch, onUpdateScore }) => {
  const handleScoreChange = (teamId: TeamId) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
    onUpdateScore(match.matchId, teamId === TeamId.HOME ? value : match.homeTeam.score, teamId === TeamId.AWAY ? value : match.awayTeam.score);
  };

  return (
    <li>
      {match.homeTeam.name} {match.homeTeam.score} - {match.awayTeam.name} {match.awayTeam.score}
      <div>
        <input type="number" step="1" min={0} placeholder="0" value={match.homeTeam.score} onChange={handleScoreChange(TeamId.HOME)} />
        <input type="number" step="1" min={0} placeholder="0" value={match.awayTeam.score} onChange={handleScoreChange(TeamId.AWAY)} />
        <button onClick={() => onFinishMatch(match.matchId)}>Finish Match</button>
      </div>
    </li>
  );
};
