import { Link } from "react-router-dom";
import classes from "./Header.module.scss";

interface HeaderProps {
  hasBack: boolean;
}

function Header({ hasBack }: HeaderProps) {
  return (
    <div className={classes.header}>
      <div className={classes.header__left}>
        {hasBack && (
          <>
            <Link className="back-button" to="..">
              <span className="material-symbols-outlined">
                keyboard_backspace
              </span>
              Back
            </Link>
          </>
        )}
      </div>
      <h1>Guess the flags</h1>
    </div>
  );
}

export default Header;
