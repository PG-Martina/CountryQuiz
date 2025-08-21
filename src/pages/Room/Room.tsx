// import { useEffect } from "react";
import RoomDetails from '../../components/RoomDetails/RoomDetails';
import RoomHeader from '../../components/RoomHeader/RoomHeader';
import classes from './Room.module.scss';
import Game from '../../components/Game/Game';
import { useParams } from 'react-router-dom';
import { useRoomData } from '../../hooks/useRoomData';

function Room() {
  const { roomID } = useParams();
  const { room, error, loading } = useRoomData();

  // useEffect(() => {
  //   return () => {
  //     if (sessionStorage.getItem("playerName")) {
  //       formLeaveRoom(playerName!, roomID!);
  //     }
  //   };
  // }, []); Prod only

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={classes.room}>
      {room ? (
        <>
          <RoomHeader owner={room.owner} />
          <div className={classes.room__details}>
            <RoomDetails room={room} />
            <Game />
          </div>
        </>
      ) : (
        <p>{`Room with the id: ${roomID} do not exists.`}</p>
      )}
    </div>
  );
}

export default Room;
