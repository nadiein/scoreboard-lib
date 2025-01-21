import * as React from 'react';
import { FunctionComponent, ReactElement } from 'react';
import { useScoreboard } from '../../contexts/scoreboard/ScoreboardContext';

export const Scoreboard: FunctionComponent = (): ReactElement => {
  const { matches } = useScoreboard();

  console.log(matches);

  return (
    <div>
      <h2>Live Football Scoreboard</h2>
    </div>
  );
};
