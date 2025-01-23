import React, { FunctionComponent, ReactElement, useState } from 'react';
import { useScoreboard } from '../../contexts/scoreboard/ScoreboardContext';
import { MatchList } from '../match-list/MatchList';
import { MatchForm } from '../match-form/MatchForm';
import { SummaryList } from '../summary-list/SummaryList';

interface MatchStartProps {
  onMatchStart?: (homeTeam: string, awayTeam: string) => void;
}

interface MatchFinishProps {
  onMatchFinish?: (matchId: string) => void;
}

type ScoreboardProps = MatchStartProps & MatchFinishProps;

export const Scoreboard: FunctionComponent<ScoreboardProps> = ({
  onMatchStart,
  onMatchFinish
}: ScoreboardProps): ReactElement => {
  const { matches, sortedMatches, startMatch, updateScore, finishMatch } = useScoreboard(),
    [matchForm, setMatchForm] = useState({ home: '', away: '' }),
    [showSummary, setShowSummary] = useState<boolean>(false);

  const handleStartMatch = (): void => {
    startMatch(matchForm.home, matchForm.away);
    setMatchForm({ home: '', away: '' });
    onMatchStart?.(matchForm.home, matchForm.away);
  };

  const handleFinishMatch = (matchId: string): void => {
    finishMatch(matchId);
    onMatchFinish?.(matchId);
  };

  const toggleShowSummary = () => {
    setShowSummary((prev) => !prev);
  };

  return (
    <div className="scoreboard-wrapper">
      <h2>Live Football Scoreboard</h2>
      <MatchList matches={matches} onFinishMatch={handleFinishMatch} onUpdateScore={updateScore} />
      <MatchForm matchForm={matchForm} setMatchForm={setMatchForm} onStartMatch={handleStartMatch} />
      <button disabled={sortedMatches.length === 0} onClick={toggleShowSummary}>
        {showSummary ? 'Hide Summary' : 'Show Summary (Ordered by Score)'}
      </button>
      {showSummary && <SummaryList matches={sortedMatches} />}
    </div>
  );
};
