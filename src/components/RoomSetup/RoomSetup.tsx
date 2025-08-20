import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import classes from "./RoomSetup.module.scss";

function RoomSetup() {
  const navigate = useNavigate();

  return (
    <div className={classes["room-setup"]}>
      <Button handleClick={() => navigate("/createRoom")} label="Create Room" />
      <Button handleClick={() => navigate("/joinRoom")} label="Join Room" />
    </div>
  );
}

export default RoomSetup;
