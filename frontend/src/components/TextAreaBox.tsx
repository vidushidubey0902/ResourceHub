import { TextAreaBoxProps } from "../utils/types";
import InputLabel from "./InputLabel";

const TextAreaBox = ({
  label,
  id,
  register,
  placeholder,
  error,
  helperText,
}: TextAreaBoxProps) => {
  return (
    <>
      <InputLabel text={label} htmlFor={id} />
      <textarea
        {...register(id)}
        id={id}
        placeholder={placeholder}
        className="peer placeholder:text-xs text-home-text focus:placeholder-purple-600/80 rounded-lg h-[4rem] bg-home-secondary py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:bg-home-accent focus:ring-2 focus:ring-purple-400/40 resize-none scrollbar-thin scrollbar-thumb-slate-700/20 scrollbar-track-slate-300/40"
      ></textarea>
      {error ? (
        <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
          {error.message}
        </p>
      ) : (
        <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-home-text-secondary hidden transition-all ease-in-out group-focus-within:block bottom-0">
          {helperText}
        </span>
      )}
    </>
  );
};

export default TextAreaBox;
