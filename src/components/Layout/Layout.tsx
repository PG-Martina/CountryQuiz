import { Outlet } from "react-router-dom";
import classes from "./Layout.module.scss";
import Footer from "../Footer/Footer";

function Layout() {
  return (
    <main className={classes.main}>
      <div className={classes.wrapper}>
        <Outlet />
        <Footer />
      </div>
    </main>
  );
}

export default Layout;
