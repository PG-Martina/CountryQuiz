import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { QuestionType } from '../hooks/useCountriesData';

export const startGame = async (roomID: string, questions: QuestionType[]) => {
  const roomRef = doc(db, 'rooms', roomID);
  await updateDoc(roomRef, {
    game: {
      inProgress: true,
      questions,
      currentQuestion: 0,
      startTime: serverTimestamp(),
      roundDuration: 15000
    }
  });
};
