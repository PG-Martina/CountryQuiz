import type { QuestionType } from '../hooks/useCountriesData';

export interface PlayerType {
  avatar: { avatar: string; seed: string };
  nickname: string;
  points: number;
}

export interface GameType {
  inProgress: boolean;
  questions: QuestionType[];
  currentQuestion: number;
  startTime: number;
  roundDuration: number;
}
export interface RoomType {
  players: PlayerType[];
  owner: string;
  gane: GameType;
}
