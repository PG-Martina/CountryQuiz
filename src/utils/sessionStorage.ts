export const setPlayerSession = (
  nickname: string,
  roomID: string,
  isRoomOwner?: boolean
) => {
  sessionStorage.setItem("playerName", nickname);
  sessionStorage.setItem("roomID", roomID);
  if (isRoomOwner !== undefined) {
    sessionStorage.setItem("isRoomOwner", isRoomOwner.toString());
  }
};

export const clearSession = () => {
  sessionStorage.removeItem("playerName");
  sessionStorage.removeItem("roomID");
  sessionStorage.removeItem("isRoomOwner");
};
