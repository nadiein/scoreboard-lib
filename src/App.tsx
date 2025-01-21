import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { Scoreboard } from './components/scoreboard/Scoreboard';
import { ScoreboardProvider } from './contexts/scoreboard/ScoreboardContext';

export const App: FunctionComponent = (): ReactElement => {
  return (
    <ScoreboardProvider>
      <Scoreboard />
    </ScoreboardProvider>
  );
};
