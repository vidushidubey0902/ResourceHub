import { twMerge } from "tailwind-merge";
import { SeparatedInputBoxProps } from "../utils/types";
import InputLabel from "./InputLabel";

const SeparatedInputsBox = ({
  label,
  id,
  inputRef,
  watchField,
  value,
  setValue,
  type,
  maxInputs,
  handleKeyDown,
  handleRemove,
  placeholder,
  error,
  helperText,
  className,
}: SeparatedInputBoxProps) => {
  return (
    <>
      <InputLabel text={label} htmlFor={id} />

      <div
        onClick={() => inputRef?.current?.focus()}
        className={twMerge(
          "peer rounded-lg bg-home-secondary py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus-within:bg-home-accent focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text",
          className
        )}
      >
        <div className="flex flex-wrap gap-1">
          {watchField.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-home-quaternary text-home-text px-2 py-1 rounded"
            >
              {item}
              <button
                type="button"
                className="ml-1 font-bold"
                onClick={() => handleRemove(index)}
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type={type}
            ref={inputRef}
            value={value}
            id={id}
            disabled={watchField.length >= maxInputs}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`bg-transparent outline-none placeholder:text-xs focus:placeholder-purple-500/80 text-home-text ${
              watchField.length >= maxInputs && "hidden"
            }`}
            placeholder={placeholder}
          />
        </div>
      </div>

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

export default SeparatedInputsBox;
