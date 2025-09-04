import { useEffect, useState } from 'react';
import type { GameType } from '../../types/roomTypes';
import { formatTime } from '../../utils/helpers';
import classes from './Timer.module.scss';

interface TimerProps {
  game: GameType;
}

function Timer({ game }: TimerProps) {
  const [time, setTime] = useState<number>(game.roundDuration);

  useEffect(() => {
    if (time <= 0) return;
    const start = game.startTime.toDate().getTime();
    const duration = game.roundDuration;

    const tick = () => {
      const rest = duration - (Date.now() - start);
      setTime(rest < 0 ? 0 : rest);
    };

    tick();
    const interval = setInterval(() => {
      tick();
    }, 100);

    return () => clearInterval(interval);
  }, [game, time]);

  return <div className={classes.timer}>{formatTime(time)}</div>;
}

export default Timer;
