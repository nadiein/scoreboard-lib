import React from 'react';
import { render, act } from '@testing-library/react';
import { ScoreboardProvider, useScoreboard } from '../../../contexts/scoreboard/ScoreboardContext';
import { TeamId } from '../../../models/match/Match';
import { ScoreboardContextType } from '../../../models/contexts/scoreboard/ScoreboardContextType';

describe('ScoreboardContext suit', () => {
  const MockComponent = ({ callback }: { callback: (context: ScoreboardContextType) => void }) => {
    const context = useScoreboard();
    callback(context);
    return null;
  };

  it('throws an error when used outside of ScoreboardProvider', () => {
    // given
    // when
    // then
    expect(() => render(<MockComponent callback={() => {}} />)).toThrow('Missed ScoreboardProvider');
  });

  describe('should ', () => {
    it('start a match correctly', () => {
      // given
      let context!: ScoreboardContextType;
      render(
        <ScoreboardProvider>
          <MockComponent callback={(ctx) => (context = ctx)} />
        </ScoreboardProvider>
      );
      // when
      act(() => {
        context.startMatch('Team A', 'Team B');
      });
      // then
      expect(context.matches).toHaveLength(1);
      expect(context.matches[0]).toMatchObject({
        matchId: 'Team A-Team B',
        homeTeam: { type: TeamId.HOME, name: 'Team A', score: 0 },
        awayTeam: { type: TeamId.AWAY, name: 'Team B', score: 0 }
      });
    });
  
    it('update match score correctly', () => {
      // given
      let context!: ScoreboardContextType;
      render(
        <ScoreboardProvider>
          <MockComponent callback={(ctx) => (context = ctx)} />
        </ScoreboardProvider>
      );
      // when
      act(() => {
        context.startMatch('Team A', 'Team B');
        context.updateScore('Team A-Team B', 2, 1);
      });
      // then
      expect(context.matches[0].homeTeam.score).toBe(2);
      expect(context.matches[0].awayTeam.score).toBe(1);
    });
  
    it('finish a match correctly', () => {
      // given
      let context!: ScoreboardContextType;
      render(
        <ScoreboardProvider>
          <MockComponent callback={(ctx) => (context = ctx)} />
        </ScoreboardProvider>
      );
      // when
      act(() => {
        context.startMatch('Team A', 'Team B');
        context.finishMatch('Team A-Team B');
      });
      // then
      expect(context.matches).toHaveLength(0);
    });
  
    it('sort matches correctly based on score and timestamp', () => {
      // given
      let context!: ScoreboardContextType;
      render(
        <ScoreboardProvider>
          <MockComponent callback={(ctx) => (context = ctx)} />
        </ScoreboardProvider>
      );
      // when
      act(() => {
        context.startMatch('Team A', 'Team B');
        context.startMatch('Team C', 'Team D');
        context.updateScore('Team A-Team B', 1, 0);
        context.updateScore('Team C-Team D', 2, 2);
      });
      // then
      expect(context.sortedMatches[0].matchId).toBe('Team C-Team D');
      expect(context.sortedMatches[1].matchId).toBe('Team A-Team B');
    });
  });
});
