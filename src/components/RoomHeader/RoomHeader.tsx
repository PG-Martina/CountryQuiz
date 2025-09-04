import { useParams } from 'react-router-dom';
import classes from './RoomHeader.module.scss';
import { useRoomActions } from '../../hooks/useRoomActions';
import { useState } from 'react';
import Timer from '../Timer/Timer';
import { useRoomData } from '../../hooks/useRoomData';

interface RoomHeaderProps {
  owner: string;
}

function RoomHeader({ owner }: RoomHeaderProps) {
  const { roomID } = useParams();
  const { formLeaveRoom } = useRoomActions();

  const [isCopied, setIsCopied] = useState(false);
  const { room } = useRoomData();

  const playerName = sessionStorage.getItem('playerName') ?? undefined;

  const onCopyCodeHandler = async () => {
    if (roomID) {
      await navigator.clipboard.writeText(roomID);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        <button
          className="basic-button"
          type="button"
          onClick={onCopyCodeHandler}
        >
          {isCopied ? 'Code copied!' : 'Invite friends'}
        </button>
      </div>
      <h1>
        {owner.slice(-1).toLowerCase() === 's'
          ? `${owner}' room`
          : `${owner}'s room`}
      </h1>
      <div className={classes.header__right}>
        {room && room.game && room.game.startTime && <Timer game={room.game} />}
        <button
          className="cancel-button"
          type="button"
          onClick={() => formLeaveRoom(playerName, roomID)}
        >
          Leave room
        </button>
      </div>
    </div>
  );
}

export default RoomHeader;
