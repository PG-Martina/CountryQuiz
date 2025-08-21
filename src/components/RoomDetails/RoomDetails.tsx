import type { RoomType } from '../../types/roomTypes';
import classes from './RoomDetails.module.scss';

interface RoomDetailsProps {
  room: RoomType;
}

function RoomDetails({ room }: RoomDetailsProps) {
  return (
    <div className={classes['room-details']}>
      <ul className={classes['room-details__players']}>
        {room &&
          room.players.length > 0 &&
          room.players.map((player, index) => (
            <li key={index} className={classes['room-details__player']}>
              <img src={player.avatar.avatar} alt="" />
              <div className={classes['room-details__player-details']}>
                <span>{player.nickname}</span>
                <span>Score: {player.points}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default RoomDetails;
