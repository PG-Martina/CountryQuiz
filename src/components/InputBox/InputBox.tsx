import { useFormContext } from "react-hook-form";
import classes from "./InputBox.module.scss";

interface InputBoxProps {
  label: string;
  registerName: string;
  placeholder?: string;
}

function InputBox({ label, placeholder, registerName }: InputBoxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <label className={classes["input-box"]}>
      {label}
      {errors[registerName] && (
        <span className={classes["input-box__error"]}>
          <span className="material-symbols-outlined">error</span>
          {(errors[registerName]?.message as string) || ""}
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder ? placeholder : "Type here..."}
        {...register(registerName)}
      />
    </label>
  );
}

export default InputBox;
