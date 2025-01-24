import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MatchItem } from '../../../components/match-item/MatchItem';
import { Match, TeamId } from '../../../models/match/Match';

describe('MatchItem suit', () => {
  describe('should render', () => {
    it('match details correctly', () => {
      // given
      const match: Match = {
        matchId: '1',
        homeTeam: { type: TeamId.HOME, name: 'Team A', score: 2 },
        awayTeam: { type: TeamId.AWAY, name: 'Team B', score: 1 }
      },
        onFinishMatch = jest.fn(),
        onUpdateScore = jest.fn();
      // when
      render(<MatchItem match={match} onFinishMatch={onFinishMatch} onUpdateScore={onUpdateScore} />);
      // then
      expect(screen.getByText('Team A 2 - Team B 1')).toBeInTheDocument();
    });
  });

  describe('should handle', () => {
    it('score update correctly', () => {
      // given
      const match: Match = {
        matchId: '1',
        homeTeam: { type: TeamId.HOME, name: 'Team A', score: 2 },
        awayTeam: { type: TeamId.AWAY, name: 'Team B', score: 1 }
      },
        onFinishMatch = jest.fn(),
        onUpdateScore = jest.fn();
      render(<MatchItem match={match} onFinishMatch={onFinishMatch} onUpdateScore={onUpdateScore} />);
      const homeInput = screen.getAllByPlaceholderText('0')[0],
        awayInput = screen.getAllByPlaceholderText('0')[1];
      // when
      fireEvent.change(homeInput, { target: { value: '3' } });
      fireEvent.change(awayInput, { target: { value: '2' } });
      // then
      expect(onUpdateScore).toHaveBeenCalledTimes(2);
      expect(onUpdateScore).toHaveBeenCalledWith('1', 3, 1);
      expect(onUpdateScore).toHaveBeenCalledWith('1', 2, 2);
    });

    it('finish match', () => {
      // given
      const match: Match = {
        matchId: '1',
        homeTeam: { type: TeamId.HOME, name: 'Team A', score: 2 },
        awayTeam: { type: TeamId.AWAY, name: 'Team B', score: 1 }
      },
        onFinishMatch = jest.fn(),
        onUpdateScore = jest.fn();
      render(<MatchItem match={match} onFinishMatch={onFinishMatch} onUpdateScore={onUpdateScore} />);
      // when
      fireEvent.click(screen.getByRole('button', { name: /finish match/i }));
      // then
      expect(onFinishMatch).toHaveBeenCalledTimes(1);
      expect(onFinishMatch).toHaveBeenCalledWith('1');
    });
  });
});
