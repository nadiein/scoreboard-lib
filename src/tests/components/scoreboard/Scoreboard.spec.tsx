import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Scoreboard } from '../../../components/scoreboard/Scoreboard';
import { useScoreboard } from '../../../contexts/scoreboard/ScoreboardContext';
import { TeamId } from '../../../models/match/Match';
import { ScoreboardContextType } from '../../../models/contexts/scoreboard/ScoreboardContextType';

jest.mock('../../../contexts/scoreboard/ScoreboardContext', () => ({
  useScoreboard: jest.fn()
}));

describe('Scoreboard suit', () => {
  const mockStartMatch = jest.fn(),
    mockFinishMatch = jest.fn(),
    mockUpdateScore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useScoreboard as jest.Mock<ScoreboardContextType>).mockReturnValue({
      matches: [],
      sortedMatches: [],
      startMatch: mockStartMatch,
      finishMatch: mockFinishMatch,
      updateScore: mockUpdateScore
    });
  });

  describe('should render', () => {
    it('scoreboard with essential elements', () => {
      // given
      // when
      render(<Scoreboard />);
      // then
      expect(screen.getByRole('heading', { name: /live football scoreboard/i })).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Home Team')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Away Team')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start match/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /show summary/i })).toBeDisabled();
    });
  });

  describe('should handle', () => {
    it('starting a match and resetting the form', () => {
      // given
      render(<Scoreboard />);
      const homeInput = screen.getByPlaceholderText('Home Team') as HTMLInputElement,
        awayInput = screen.getByPlaceholderText('Away Team') as HTMLInputElement,
        startButton = screen.getByRole('button', { name: /start match/i });
      // when
      fireEvent.change(homeInput, { target: { value: 'Team A' } });
      fireEvent.change(awayInput, { target: { value: 'Team B' } });
      fireEvent.click(startButton);
      // then
      expect(mockStartMatch).toHaveBeenCalledWith('Team A', 'Team B');
      expect(homeInput.value).toBe('');
      expect(awayInput.value).toBe('');
    });

    it('toggling summary view', () => {
      // given
      const mockSortedMatches = [
        {
          matchId: '1',
          homeTeam: { type: TeamId.HOME, name: 'Team A', score: 2 },
          awayTeam: { type: TeamId.AWAY, name: 'Team B', score: 1 }
        }
      ];
      (useScoreboard as jest.Mock<ScoreboardContextType>).mockReturnValue({
        matches: [],
        sortedMatches: mockSortedMatches,
        startMatch: mockStartMatch,
        finishMatch: mockFinishMatch,
        updateScore: mockUpdateScore
      });
      render(<Scoreboard />);
      const summaryButton = screen.getByRole('button', { name: /show summary/i });
      // when
      fireEvent.click(summaryButton);
      // then
      expect(screen.getByText(/team a 2 - team b 1/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /hide summary/i })).toBeInTheDocument();
    });
  });
});
