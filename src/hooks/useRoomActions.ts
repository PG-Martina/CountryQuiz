import { useNavigate } from 'react-router-dom';
import { createRoom, joinRoom, leaveRoom } from '../services/roomService';
import { clearSession, setPlayerSession } from '../utils/sessionStorage';

export const useRoomActions = () => {
  const navigate = useNavigate();

  const formCreateRoom = async (nickname: string, roomID: string) => {
    await createRoom(nickname, roomID);
    setPlayerSession(nickname, roomID, true);
    navigate(`/room/${roomID}`);
  };

  const formJoinRoom = async (nickname: string, roomID: string) => {
    await joinRoom(nickname, roomID);
    setPlayerSession(nickname, roomID);
    navigate(`/room/${roomID}`);
  };

  const formLeaveRoom = async (
    nickname: string | undefined,
    roomID: string | undefined
  ) => {
    await leaveRoom(nickname, roomID);
    clearSession();
  };

  return {
    formCreateRoom,
    formJoinRoom,
    formLeaveRoom
  };
};
