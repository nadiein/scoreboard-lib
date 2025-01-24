import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MatchForm } from '../../../components/match-form/MatchForm';

describe('MatchForm suit', () => {
  describe('should render ', () => {
    it('input fields and button', () => {
      // given
      const matchForm = { home: '', away: '' },
        setMatchForm = jest.fn(),
        onStartMatch = jest.fn();
      // when
      render(<MatchForm matchForm={matchForm} setMatchForm={setMatchForm} onStartMatch={onStartMatch} />);
      // then
      expect(screen.getByPlaceholderText('Home Team')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Away Team')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /start match/i })).toBeInTheDocument();
    });

    it('disabled button when inputs are empty', () => {
      // given
      const matchForm = { home: '', away: '' },
        setMatchForm = jest.fn(),
        onStartMatch = jest.fn();
      // when
      render(<MatchForm matchForm={matchForm} setMatchForm={setMatchForm} onStartMatch={onStartMatch} />);
      // then
      expect(screen.getByRole('button', { name: /start match/i })).toBeDisabled();
    });

    it('enabled button when both inputs have values', () => {
      // given
      const matchForm = { home: 'Team A', away: 'Team B' },
        setMatchForm = jest.fn(),
        onStartMatch = jest.fn();
      // when
      render(<MatchForm matchForm={matchForm} setMatchForm={setMatchForm} onStartMatch={onStartMatch} />);
      // then
      expect(screen.getByRole('button', { name: /start match/i })).toBeEnabled();
    });
  });

  describe('should handle', () => {
    it('calls onStartMatch when button is clicked', () => {
      // given
      const matchForm = { home: 'Team A', away: 'Team B' },
        setMatchForm = jest.fn(),
        onStartMatch = jest.fn();
      render(<MatchForm matchForm={matchForm} setMatchForm={setMatchForm} onStartMatch={onStartMatch} />);
      // when
      fireEvent.click(screen.getByRole('button', { name: /start match/i }));
      // then
      expect(onStartMatch).toHaveBeenCalledTimes(1);
    });
  });
});
