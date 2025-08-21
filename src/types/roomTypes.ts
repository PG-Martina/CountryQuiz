export interface PlayerType {
  avatar: { avatar: string; seed: string };
  nickname: string;
  points: number;
}
export interface RoomType {
  players: PlayerType[];
  owner: string;
  inProgress: boolean;
}
