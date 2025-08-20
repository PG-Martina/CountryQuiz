import { useParams } from "react-router-dom";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc, DocumentReference } from "firebase/firestore";
import { db } from "../../services/firebase";
// import { useEffect } from "react";
import RoomDetails from "../../components/RoomDetails/RoomDetails";
import RoomHeader from "../../components/RoomHeader/RoomHeader";
import type { PlayerType } from "../../types/roomTypes";
import classes from "./Room.module.scss";
import Game from "../../components/Game/Game";

export interface RoomType {
  players: PlayerType[];
  owner: string;
}

function Room() {
  const { roomID } = useParams();

  const roomRef: DocumentReference<RoomType> | null = roomID
    ? (doc(db, "rooms", roomID) as DocumentReference<RoomType>)
    : null;

  const [room, loading, error] = useDocumentData<RoomType>(roomRef);

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
