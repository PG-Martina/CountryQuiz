import classes from "./Button.module.scss";

interface ButtonProps {
  handleClick: () => void;
  label: string;
}

function Button({ handleClick, label }: ButtonProps) {
  return (
    <button className={classes.button} onClick={handleClick}>
      {label}
    </button>
  );
}

export default Button;
