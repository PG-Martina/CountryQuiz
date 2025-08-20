import { useState } from "react";
import classes from "./Game.module.scss";
import GamePlay from "../GamePlay/GamePlay";

function Game() {
  const [isGame, setIsGame] = useState(false);

  return (
    <div className={classes.game}>
      {isGame ? (
        <GamePlay />
      ) : (
        <button
          type="button"
          className="basic-button basic-button--big basic-button--inverse"
          onClick={() => setIsGame(true)}
        >
          Start the game!
        </button>
      )}
    </div>
  );
}

export default Game;
