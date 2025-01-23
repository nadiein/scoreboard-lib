import React, { FunctionComponent } from 'react';
import { MatchItem } from '../match-item/MatchItem';
import { Match } from '../../models/match/Match';

export const MatchList: FunctionComponent<{
  matches: Match[];
  onFinishMatch: (id: string) => void;
  onUpdateScore: (id: string, home: number, away: number) => void
}> = ({ matches, onFinishMatch, onUpdateScore }) => (
  <ul>
    {matches.map((match) => (
      <MatchItem key={match.matchId} match={match} onFinishMatch={onFinishMatch} onUpdateScore={onUpdateScore} />
    ))}
  </ul>
);
