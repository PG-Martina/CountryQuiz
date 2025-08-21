import { useNavigate, useParams } from 'react-router-dom';
import classes from './RoomHeader.module.scss';
import { useRoomActions } from '../../hooks/useRoomActions';
import { useState } from 'react';

interface RoomHeaderProps {
  owner: string;
}

function RoomHeader({ owner }: RoomHeaderProps) {
  const [isCopied, setIsCopied] = useState(false);

  const playerName = sessionStorage.getItem('playerName') ?? undefined;

  const { roomID } = useParams();
  const { formLeaveRoom } = useRoomActions();
  const navigate = useNavigate();

  const onLeaveRoomHandler = () => {
    formLeaveRoom(playerName, roomID);
    navigate('/');
  };

  const onInviteFriendsHandler = async () => {
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
          onClick={onInviteFriendsHandler}
        >
          {isCopied ? 'Code copied!' : 'Invite friends'}
        </button>
      </div>
      <h1>{`${owner}'s room`}</h1>
      <div className={classes.header__right}>
        <button
          className="cancel-button"
          type="button"
          onClick={onLeaveRoomHandler}
        >
          Leave room
        </button>
      </div>
    </div>
  );
}

export default RoomHeader;
