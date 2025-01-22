import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Match } from '../../models/match/Match';

interface ScoreboardContextType {
  matches: Match[];
  sortedMatches: Match[];
  startMatch: (homeTeam: string, awayTeam: string) => void;
  updateScore: (matchId: string, homeScore: number, awayScore: number) => void;
  finishMatch: (matchId: string) => void;
}

export const ScoreboardContext = createContext<ScoreboardContextType | undefined>(undefined);

export const ScoreboardProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Match[]>([]);

  const startMatch = (homeTeam: string, awayTeam: string): void => {
    const matchId = `${homeTeam}-${awayTeam}`;
    setMatches((prev: Match[]) => [...prev, { matchId, homeTeam, awayTeam, homeScore: 0, awayScore: 0, timestamp: Date.now() }]);
  };

  const updateScore = (matchId: string, homeScore: number, awayScore: number): void => {
    setMatches((prev: Match[]) =>
      prev.map((match: Match) =>
        match.matchId === matchId ? { ...match, homeScore, awayScore } : match
      )
    );
  };

  const finishMatch = (matchId: string): void => {
    setMatches((prev: Match[]) => prev.filter((match: Match) => match.matchId !== matchId));
  };

  const sortedMatches = [...matches].sort((a, b) => {
    const totalScoreA = a.homeScore + a.awayScore,
      totalScoreB = b.homeScore + b.awayScore;
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
