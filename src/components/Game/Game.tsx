import classes from './Game.module.scss';
import GamePlay from '../GamePlay/GamePlay';
import { useRoomData } from '../../hooks/useRoomData';
import { useState } from 'react';
import { useGameData } from '../../hooks/useGameData';

function Game() {
  const [questionNumber, setQuestionNumber] = useState(10);
  const [inProgress, setIsProgress] = useState(false);

  const isOwner = sessionStorage.getItem('isRoomOwner');
  const { room } = useRoomData();
  const { gameStart } = useGameData();

  const handleGameStart = () => {
    setIsProgress(true);
    setTimeout(() => {
      gameStart(questionNumber);
    }, 3000); //animation time
  };

  return (
    <div className={classes.game}>
      {inProgress && <GamePlay />}
      {!inProgress && (
        <>
          {isOwner ? (
            <>
              <button
                type="button"
                className="basic-button basic-button--big basic-button--inverse"
                onClick={handleGameStart}
              >
                Start the game!
              </button>
              <label htmlFor="question-number" className={classes.game__input}>
                Number of questions
                <input
                  name="question-number"
                  type="number"
                  value={questionNumber}
                  onChange={(e) => {
                    if (
                      parseInt(e.target.value) < 251 &&
                      parseInt(e.target.value) > 0
                    ) {
                      setQuestionNumber(parseInt(e.target.value));
                    }
                  }}
                />
              </label>
            </>
          ) : (
            `Waiting for ${room?.owner} to start the game...`
          )}
        </>
      )}
    </div>
  );
}

export default Game;
