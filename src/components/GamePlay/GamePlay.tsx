import { useState } from "react";
import Countdown from "../Countdown/Countdown";

function GamePlay() {
  const [isCounterDone, setIsCounterDone] = useState(false);

  return (
    <>{isCounterDone ? "Play!" : <Countdown setIsDone={setIsCounterDone} />}</>
  );
}

export default GamePlay;
