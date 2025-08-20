import classes from "./Home.module.scss";
import RoomSetup from "../../components/RoomSetup/RoomSetup";
import Header from "../../components/Header/Header";

function Home() {
  return (
    <div className={classes.home}>
      <Header hasBack={false} />
      <RoomSetup />
    </div>
  );
}

export default Home;
