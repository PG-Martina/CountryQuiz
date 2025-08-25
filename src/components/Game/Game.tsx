import classes from './Game.module.scss';
import GamePlay from '../GamePlay/GamePlay';
import { useRoomData } from '../../hooks/useRoomData';
import { startGame } from '../../services/gameService';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useCountriesData } from '../../hooks/useCountriesData';

function Game() {
  const [questionNumber, setQuestionNumber] = useState(10);

  const isOwner = sessionStorage.getItem('isRoomOwner');
  const { roomID } = useParams();
  const { room } = useRoomData();
  const { createQuestions } = useCountriesData();

  const onGameStartHandle = () => {
    if (roomID) {
      const questions = createQuestions(questionNumber);
      if (!questions) return;

      startGame(roomID, questions);
    }
  };

  return (
    <div className={classes.game}>
      {room?.inProgress && <GamePlay />}
      {!room?.inProgress && (
        <>
          {isOwner ? (
            <>
              <button
                type="button"
                className="basic-button basic-button--big basic-button--inverse"
                onClick={onGameStartHandle}
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
