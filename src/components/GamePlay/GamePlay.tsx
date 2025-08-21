import { useState } from 'react';
import Countdown from '../Countdown/Countdown';
import Question from '../Question/Question';

function GamePlay() {
  const [isCounterDone, setIsCounterDone] = useState(false);

  return (
    <>
      {isCounterDone ? (
        <Question />
      ) : (
        <Countdown setIsDone={setIsCounterDone} />
      )}
    </>
  );
}

export default GamePlay;
