import React from 'react';
import { render, screen } from '@testing-library/react';
import { SummaryList } from '../../../components/summary-list/SummaryList';
import { Match, TeamId } from '../../../models/match/Match';

const mockMatches: Match[] = [
  {
    matchId: '1',
    homeTeam: { type: TeamId.HOME, name: 'Team A', score: 2 },
    awayTeam: { type: TeamId.AWAY, name: 'Team B', score: 1 }
  },
  {
    matchId: '2',
    homeTeam: { type: TeamId.HOME, name: 'Team C', score: 3 },
    awayTeam: { type: TeamId.AWAY, name: 'Team D', score: 0 }
  }
];

describe('SummaryList suit', () => {
  describe('should render ', () => {
    it('nothing when no matches are passed', () => {
      // given
      // when
      render(<SummaryList matches={[]} />);
      const listItems = screen.queryAllByRole('listitem');
      // then
      expect(listItems.length).toBe(0);
    });
  
    it('a single match correctly', () => {
      // given
      const singleMatch: Match[] = [
        {
          matchId: '1',
          homeTeam: { type: TeamId.HOME, name: 'Team A', score: 2 },
          awayTeam: { type: TeamId.AWAY, name: 'Team B', score: 1 }
        }
      ];
      // when
      render(<SummaryList matches={singleMatch} />);
      const listItems = screen.getAllByRole('listitem');
      // then
      expect(listItems.length).toBe(1);
      expect(listItems[0]).toHaveTextContent('Team A 2 - Team B 1');
    });
  
    it('data with correct formatting', () => {
      // given
      // when
      render(<SummaryList matches={mockMatches} />);
      // then
      mockMatches.forEach((match) => {
        const expectedText = `${match.homeTeam.name} ${match.homeTeam.score} - ${match.awayTeam.name} ${match.awayTeam.score}`;
        expect(screen.getByText(expectedText)).toBeInTheDocument();
      });
    });
  });
});
