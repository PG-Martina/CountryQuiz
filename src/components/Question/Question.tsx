import { useState } from 'react';
import { useRoomData } from '../../hooks/useRoomData';
import classes from './Question.module.scss';

function Question() {
  const { room } = useRoomData();
  const currentQuestion = room?.questions[room?.currentQuestion];

  const [isLocked, setIsLocked] = useState(false);

  const onAnswerHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const answer = e.currentTarget.dataset.name;
    if (answer === currentQuestion?.name.toLowerCase()) {
      e.currentTarget.classList.add(classes.correct);
    } else {
      e.currentTarget.classList.add(classes.wrong);
    }

    setIsLocked(true);
  };

  return (
    <div className={classes.question}>
      <img
        className={classes.question__flag}
        src={currentQuestion?.flag.svg}
        alt={currentQuestion?.flag.alt}
      />
      <div className={classes.question__answers}>
        {currentQuestion?.answers!.map((answer, index) => (
          <button
            key={index}
            className={classes.question__answer}
            data-name={answer.name.toLowerCase()}
            type="button"
            disabled={isLocked}
            onClick={onAnswerHandler}
          >
            {answer.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
