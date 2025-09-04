import { useParams } from 'react-router-dom';
import { startGame } from '../services/gameService';
import { useCountriesData } from './useCountriesData';
import type { RoomType } from '../types/roomTypes';

export const useGameData = () => {
  const { roomID } = useParams();
  const { createQuestions } = useCountriesData();

  const gameStart = (questionNumber: number) => {
    const questions = createQuestions(questionNumber);
    if (!questions) return;
    startGame(roomID!, questions);
  };

  const getCurrentQuestion = (room: RoomType) => {
    const questions = room.game.questions;
    const currentIndex = room.game.currentQuestion;
    return questions[currentIndex];
  };

  return {
    gameStart,
    getCurrentQuestion
  };
};
