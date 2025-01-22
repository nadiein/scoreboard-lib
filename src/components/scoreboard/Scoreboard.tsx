import React, { FunctionComponent, ReactElement, useState } from 'react';
import { useScoreboard } from '../../contexts/scoreboard/ScoreboardContext';
import { Match } from '../../models/match/Match';

interface MatchStartProps {
  onMatchStart?: (homeTeam: string, awayTeam: string) => void;
}

interface MatchUpdateProps {
  onMatchUpdate?: (match: Match) => void;
}

interface MatchFinishProps {
  onMatchFinish?: (matchId: string) => void;
}

type ScoreboardProps = MatchUpdateProps & MatchFinishProps & MatchStartProps;

export const Scoreboard: FunctionComponent<ScoreboardProps> = ({
  onMatchStart,
  onMatchUpdate,
  onMatchFinish
}: ScoreboardProps): ReactElement => {
  const { matches, startMatch, updateScore, finishMatch } = useScoreboard(),
    [homeTeam, setHomeTeam] = useState<string>(''),
    [awayTeam, setAwayTeam] = useState<string>(''),
    [scores, setScores] = useState<{ [key: string]: { home: string; away: string } }>({}),
    [showSummary, setShowSummary] = useState<boolean>(false);

  const handleStartMatch = (): void => {
    if (!homeTeam && !awayTeam) alert('Both teams are required');

    startMatch(homeTeam, awayTeam);
    setHomeTeam('');
    setAwayTeam('');
    onMatchStart?.(homeTeam, awayTeam);
  };

  const handleUpdateMatch = (homeTeam: string, awayTeam: string): void => {
    const key = `${homeTeam}-${awayTeam}`;
    const home = parseInt(scores[key]?.home || '0', 10);
    const away = parseInt(scores[key]?.away || '0', 10);

    if (isNaN(home) || isNaN(away)) return alert('Scores must be numbers!');

    updateScore(homeTeam, awayTeam, home, away);
    onMatchUpdate?.({ homeTeam, awayTeam, homeScore: home, awayScore: away, timestamp: Date.now() });
  };

  const handleFinishMatch = (matchId: string): void => {
    finishMatch(matchId);
    setScores((prevScores) => {
      const updatedScores = { ...prevScores };
      delete updatedScores[matchId];
      return updatedScores;
    });
    onMatchFinish?.(matchId);
  };

  const getSortedMatches = (): Match[] => {
    return [...matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;
      return totalScoreB === totalScoreA ? (b.timestamp ?? 0) - (a.timestamp ?? 0) : totalScoreB - totalScoreA;
    });
  };

  return (
    <div className="scoreboard-wrapper">
      <h2>Live Football Scoreboard</h2>

      <ul>
        {matches.map((match, index) => {
          const key = `${match.homeTeam}-${match.awayTeam}`;
          return (
            <li key={index}>
              {match.homeTeam} {match.homeScore} - {match.awayTeam} {match.awayScore}
              <div>
                <input
                  type="text"
                  placeholder="Home Score"
                  value={scores[key]?.home || 0}
                  onChange={(e) =>
                    setScores((prev) => ({ ...prev, [key]: { ...prev[key], home: e.target.value } }))
                  }
                />
                <input
                  type="text"
                  placeholder="Away Score"
                  value={scores[key]?.away || 0}
                  onChange={(e) =>
                    setScores((prev) => ({ ...prev, [key]: { ...prev[key], away: e.target.value } }))
                  }
                />
                <button onClick={() => handleUpdateMatch(match.homeTeam, match.awayTeam)}>Update Score</button>
                <button onClick={() => handleFinishMatch(key)}>Finish Match</button>
              </div>
            </li>
          );
        })}
      </ul>

      <div>
        <input
          type="text"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        />
        <button onClick={handleStartMatch}>Start Match</button>
      </div>

      {showSummary && (
        <ul>
          {getSortedMatches().map((match, index) => (
            <li key={index}>
              {match.homeTeam} {match.homeScore} - {match.awayTeam} {match.awayScore}
            </li>
          ))}
        </ul>
      )}
      <button disabled={getSortedMatches().length === 0} onClick={() => setShowSummary((prev) => !prev)}>
        {showSummary ? 'Hide Summary' : 'Show Summary (Ordered by Score)'}
      </button>
    </div>
  );
};
