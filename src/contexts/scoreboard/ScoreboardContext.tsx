import * as React from 'react';
import { createContext, useContext, useState, ReactNode } from 'react';
import { Match } from '../../models/match/Match';

interface ScoreboardContextType {
  matches: Match[];
  startMatch: () => void;
  updateScore: () => void;
  finishMatch: () => void;
}

export const ScoreboardContext = createContext<ScoreboardContextType | undefined>(undefined);

export const ScoreboardProvider = ({ children }: { children: ReactNode }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const startMatch = (): void => {};
  const updateScore = () => {};
  const finishMatch = (): void => {};

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
