import classes from "./Footer.module.scss";

function Footer() {
  const date = new Date().getFullYear();

  return (
    <div className={classes.footer}>
      <p className={classes.footer__copyright}>
        <span className="material-symbols-outlined">copyright</span>
        {`Guess the flag ${date}`}
      </p>
    </div>
  );
}

export default Footer;
