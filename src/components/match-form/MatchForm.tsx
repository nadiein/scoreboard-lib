import React, { FunctionComponent } from 'react';

export const MatchForm: FunctionComponent<{
  matchForm: { home: string; away: string };
  setMatchForm: React.Dispatch<React.SetStateAction<{ home: string; away: string}>>;
  onStartMatch: () => void
}> = ({ matchForm, setMatchForm, onStartMatch }) => (
  <div>
    <input
      type="text"
      placeholder="Home Team"
      value={matchForm.home}
      onChange={(e) => setMatchForm((prev) => ({ ...prev, home: e.target.value }))}
    />
    <input
      type="text"
      placeholder="Away Team"
      value={matchForm.away}
      onChange={(e) => setMatchForm((prev) => ({ ...prev, away: e.target.value }))}
    />
    <button
      onClick={onStartMatch}
      disabled={!matchForm.home.trim() || !matchForm.away.trim()}
    >
      Start Match
    </button>
  </div>
);
