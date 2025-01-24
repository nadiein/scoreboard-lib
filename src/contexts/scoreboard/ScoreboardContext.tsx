import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Match, Team, TeamId } from '../../models/match/Match';
import { ScoreboardContextType } from '../../models/contexts/scoreboard/ScoreboardContextType';

export const ScoreboardContext = createContext<ScoreboardContextType | undefined>(undefined);

export const ScoreboardProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Match[]>([]);

  const startMatch = (homeTeamName: string, awayTeamName: string): void => {
    const matchId = `${homeTeamName}-${awayTeamName}`;
    const homeTeam: Team = { type: TeamId.HOME, name: homeTeamName, score: 0 };
    const awayTeam: Team = { type: TeamId.AWAY, name: awayTeamName, score: 0 };

    setMatches((prev: Match[]) => [...prev, { matchId, homeTeam, awayTeam, timestamp: Date.now() }]);
  };

  const updateScore = (matchId: string, homeScore: number, awayScore: number): void => {
    setMatches((prev: Match[]) =>
      prev.map((match: Match) =>
        match.matchId === matchId ? {
          ...match,
          homeTeam: { ...match.homeTeam, score: homeScore },
          awayTeam: { ...match.awayTeam, score: awayScore }
        } : match
      )
    );
  };

  const finishMatch = (matchId: string): void => {
    setMatches((prev: Match[]) => prev.filter((match: Match) => match.matchId !== matchId));
  };

  const sortedMatches = [...matches].sort((a, b) => {
    const totalScoreA = a.homeTeam.score + a.awayTeam.score;
    const totalScoreB = b.homeTeam.score + b.awayTeam.score;
    return totalScoreB === totalScoreA ? (b.timestamp ?? 0) - (a.timestamp ?? 0) : totalScoreB - totalScoreA;
  });

  return (
    <ScoreboardContext.Provider value={{ matches, sortedMatches, startMatch, updateScore, finishMatch }}>
      {children}
    </ScoreboardContext.Provider>
  );
};

export const useScoreboard = () => {
  const context = useContext(ScoreboardContext);
  if (!context) throw new Error('Missed ScoreboardProvider');
  return context;
};
