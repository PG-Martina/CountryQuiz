import { useState } from 'react';
import { useGameData } from '../../hooks/useGameData';
import { useRoomData } from '../../hooks/useRoomData';
import classes from './GameSetup.module.scss';

interface GameStartProps {
  setIsProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

function GameStart({ setIsProgress }: GameStartProps) {
  const [questionNumber, setQuestionNumber] = useState(10);

  const { room } = useRoomData();
  const { gameStart } = useGameData();

  const isOwner = sessionStorage.getItem('isRoomOwner');

  const handleGameStart = () => {
    setIsProgress(true);
    setTimeout(() => {
      gameStart(questionNumber);
    }, 3000); //animation time
  };

  const handleQuestionNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < 251 && parseInt(e.target.value) > 0) {
      setQuestionNumber(parseInt(e.target.value));
    }
  };

  return (
    <div className={classes['game-start']}>
      {isOwner ? (
        <>
          <button
            type="button"
            className="basic-button basic-button--big basic-button--inverse"
            onClick={handleGameStart}
          >
            Start the game!
          </button>
          <label
            htmlFor="question-number"
            className={classes['game-start__input']}
          >
            Number of questions
            <input
              name="question-number"
              type="number"
              value={questionNumber}
              onChange={handleQuestionNumber}
            />
          </label>
        </>
      ) : (
        `Waiting for ${room?.owner} to start the game...`
      )}
    </div>
  );
}

export default GameStart;
