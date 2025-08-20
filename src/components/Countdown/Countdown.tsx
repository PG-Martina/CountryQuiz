import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import classes from "./Countdown.module.scss";

interface CountdownProps {
  setIsDone: Dispatch<SetStateAction<boolean>>;
}

function Countdown({ setIsDone }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      setIsDone(true);
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, setIsDone]);

  return <div className={classes.countdown}>{count}</div>;
}

export default Countdown;
