import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Match } from '../../models/match/Match';

interface ScoreboardContextType {
  matches: Match[];
  startMatch: (homeTeam: string, awayTeam: string) => void;
  updateScore: (homeTeam: string, awayTeam: string, homeScore: number, awayScore: number) => void;
  finishMatch: (matchId: string) => void;
}

export const ScoreboardContext = createContext<ScoreboardContextType | undefined>(undefined);

export const ScoreboardProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Match[]>([]);

  const startMatch = (homeTeam: string, awayTeam: string): void => {
    setMatches((prev: Match[]) => [...prev, { homeTeam, awayTeam, homeScore: 0, awayScore: 0, timestamp: Date.now() }]);
  };

  const updateScore = (homeTeam: string, awayTeam: string, homeScore: number, awayScore: number): void => {
    setMatches((prev: Match[]) =>
      prev.map((match: Match) =>
        match.homeTeam === homeTeam && match.awayTeam === awayTeam ? { ...match, homeScore, awayScore } : match
      )
    );
  };
  const finishMatch = (matchId: string): void => {
    setMatches((prev: Match[]) => prev.filter((match: Match) => `${match.homeTeam}-${match.awayTeam}` !== matchId));
  };

  return (
    <ScoreboardContext.Provider value={{ matches, startMatch, updateScore, finishMatch }}>
      {children}
    </ScoreboardContext.Provider>
  );
};

export const useScoreboard = () => {
  const context = useContext(ScoreboardContext);
  if (!context) throw new Error('Missed ScoreboardProvider');
  return context;
};
