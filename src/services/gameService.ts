import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const startGame = async (roomID: string) => {
  const roomRef = doc(db, 'rooms', roomID);
  await updateDoc(roomRef, { inProgress: true });
};
