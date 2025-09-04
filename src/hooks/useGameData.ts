import { useParams } from 'react-router-dom';
import { startGame } from '../services/gameService';
import { useCountriesData } from './useCountriesData';

export const useGameData = () => {
  const { roomID } = useParams();
  const { createQuestions } = useCountriesData();

  const gameStart = (questionNumber: number) => {
    const questions = createQuestions(questionNumber);
    if (!questions) return;
    startGame(roomID!, questions);
  };

  return {
    gameStart
  };
};
