import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MatchList } from '../../../components/match-list/MatchList';
import { Match, TeamId } from '../../../models/match/Match';

describe('MatchList suit', () => {
  const mockMatches: Match[] = [
    {
      matchId: '1',
      homeTeam: { type: TeamId.HOME, name: 'Team A', score: 2 },
      awayTeam: { type: TeamId.AWAY, name: 'Team B', score: 1 }
    },
    {
      matchId: '2',
      homeTeam: { type: TeamId.HOME, name: 'Team C', score: 2 },
      awayTeam: { type: TeamId.AWAY, name: 'Team D', score: 1 }
    },
  ],
    mockOnFinishMatch = jest.fn(),
    mockOnUpdateScore = jest.fn();

  it('should render the list of matches', () => {
    // given
    render(
      <MatchList 
        matches={mockMatches} 
        onFinishMatch={mockOnFinishMatch} 
        onUpdateScore={mockOnUpdateScore} 
      />
    );
    // when
    const matchItems = screen.getAllByRole('listitem');
    // then
    expect(matchItems).toHaveLength(mockMatches.length);
  });

  it('should display the correct match data', () => {
    // given
    render(
      <MatchList 
        matches={mockMatches} 
        onFinishMatch={mockOnFinishMatch} 
        onUpdateScore={mockOnUpdateScore} 
      />
    );
    // when
    const firstMatchItem = screen.getByText('Team A 2 - Team B 1');
    const secondMatchItem = screen.getByText('Team C 2 - Team D 1');
    // then
    expect(firstMatchItem).toBeInTheDocument();
    expect(secondMatchItem).toBeInTheDocument();
  });

  it('should call onFinishMatch with correct matchId when finish button is clicked', () => {
    // given
    render(
      <MatchList 
        matches={mockMatches} 
        onFinishMatch={mockOnFinishMatch} 
        onUpdateScore={mockOnUpdateScore} 
      />
    );
    // when
    const finishButtons = screen.getAllByText('Finish Match');
    fireEvent.click(finishButtons[0]);
    // then
    expect(mockOnFinishMatch).toHaveBeenCalledWith(mockMatches[0].matchId);
  });
});
