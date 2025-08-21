import classes from './Game.module.scss';
import GamePlay from '../GamePlay/GamePlay';
import { useRoomData } from '../../hooks/useRoomData';
import { startGame } from '../../services/gameService';
import { useParams } from 'react-router-dom';

function Game() {
  const isOwner = sessionStorage.getItem('isRoomOwner');
  const { roomID } = useParams();
  const { room } = useRoomData();

  const onGameStartHandle = () => {
    if (roomID) {
      startGame(roomID);
    }
  };

  return (
    <div className={classes.game}>
      {room?.inProgress && <GamePlay />}
      {!room?.inProgress && (
        <>
          {isOwner ? (
            <button
              type="button"
              className="basic-button basic-button--big basic-button--inverse"
              onClick={onGameStartHandle}
            >
              Start the game!
            </button>
          ) : (
            `Waiting for ${room?.owner} to start the game...`
          )}
        </>
      )}
    </div>
  );
}

export default Game;
