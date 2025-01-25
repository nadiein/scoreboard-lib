import * as React from 'react';
import { ScoreboardProvider } from './contexts/scoreboard/ScoreboardContext';
import { Scoreboard } from './components/scoreboard/Scoreboard';

export const App = () => {
  return(
    <ScoreboardProvider>
      <Scoreboard />
    </ScoreboardProvider>
  );
};
