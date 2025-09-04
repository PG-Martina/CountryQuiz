import classes from './Game.module.scss';
import GamePlay from '../GamePlay/GamePlay';
import { useState } from 'react';
import GameSetup from '../GameSetup/GameSetup';

function Game() {
  const [inProgress, setIsProgress] = useState(false);

  return (
    <div className={classes.game}>
      {inProgress ? <GamePlay /> : <GameSetup setIsProgress={setIsProgress} />}
    </div>
  );
}

export default Game;
