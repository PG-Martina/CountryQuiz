import { doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
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

export const changeQuestion = async (
  roomID: string,
  questionNumber: number
) => {
  const roomRef = doc(db, 'rooms', roomID);
  const snapshoot = await getDoc(roomRef);
  const roomData = snapshoot.data();

  if (roomData) {
    await updateDoc(roomRef, {
      game: {
        ...roomData.game,
        currentQuestion: questionNumber,
        startTime: serverTimestamp()
      }
    });
  }
};
