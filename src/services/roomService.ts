import { doc, runTransaction, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { avatarGenerator } from "../utils/avatarGenerator";
import type { PlayerType } from "../types/roomTypes";

export const createRoom = async (nickname: string, roomId: string) => {
  const roomRef = doc(db, "rooms", roomId);

  await setDoc(roomRef, {
    owner: nickname,
    players: [
      {
        avatar: avatarGenerator(),
        nickname,
        points: 0,
      },
    ],
  });
};

export const joinRoom = async (nickname: string, roomId: string) => {
  const roomRef = doc(db, "rooms", roomId);

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);

    if (!roomSnapshot.exists()) {
      throw new Error("Room does not exist");
    }
    const roomData = roomSnapshot.data();

    if (roomData.players.length >= 4) {
      throw new Error("Room is full");
    }

    const usedAvatars = roomData.players.map(
      (player: PlayerType) => player.avatar.seed
    );

    if (
      roomData.players.some(
        (player: PlayerType) => player.nickname === nickname
      )
    ) {
      throw new Error("Nickname already taken in this room");
    }

    transaction.update(roomRef, {
      players: [
        ...roomData.players,
        { avatar: avatarGenerator(usedAvatars), nickname, points: 0 },
      ],
    });
  });
};

export const leaveRoom = async (
  nickname: string | undefined,
  roomId: string | undefined
) => {
  if (!nickname || !roomId) throw new Error("No setup data");

  const roomRef = doc(db, "rooms", roomId);

  await runTransaction(db, async (transaction) => {
    const roomSnapshot = await transaction.get(roomRef);
    if (!roomSnapshot.exists()) {
      throw new Error("Room does not exist");
    }

    const roomData = roomSnapshot.data();

    if (roomData.players && roomData.players.length > 1) {
      const newPlayers = roomData.players.filter(
        (player: PlayerType) => player.nickname !== nickname
      );
      transaction.update(roomRef, { players: newPlayers });
    } else {
      transaction.delete(roomRef);
    }
  });
};
