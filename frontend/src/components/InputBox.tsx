import InputLabel from "./InputLabel";
import { InputBoxProps } from "../utils/types";
import { twMerge } from "tailwind-merge";

const InputBox = ({
  label,
  id,
  register,
  type,
  placeholder,
  error,
  showHelperText,
  helperText,
  className,
}: InputBoxProps) => {
  return (
    <>
      <InputLabel text={label} htmlFor={id} />
      <input
        {...register(id)}
        id={id}
        type={type}
        placeholder={placeholder}
        className={twMerge(
          "peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg text-home-text bg-home-secondary py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:ring-2 focus:ring-purple-400/40",
          className
        )}
      />
      {error ? (
        <span className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
          {error.message}
        </span>
      ) : (
        showHelperText && (
          <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-home-text-secondary hidden transition-all ease-in-out group-focus-within:block bottom-0">
            {helperText}
          </span>
        )
      )}
    </>
  );
};

export default InputBox;
