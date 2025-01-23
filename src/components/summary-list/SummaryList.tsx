import React, { FunctionComponent } from 'react';
import { Match } from '../../models/match/Match';

export const SummaryList: FunctionComponent<{ matches: Match[] }> = ({ matches }) => (
  <ul>
    {matches.map((match) => (
      <li key={match.matchId}>
        {match.homeTeam.name} {match.homeTeam.score} - {match.awayTeam.name} {match.awayTeam.score}
      </li>
    ))}
  </ul>
);
