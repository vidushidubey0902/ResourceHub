import { SelectBoxProps } from "../utils/types";
import InputLabel from "./InputLabel";

const SelectBox = ({ label, id, register, error, options }: SelectBoxProps) => {
  return (
    <>
      <InputLabel text={label} htmlFor={id} />

      <select
        id={id}
        {...register(id)}
        className="peer focus:placeholder-purple-500/80 placeholder:text-xs rounded-lg bg-home-secondary text-home-text py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus:ring-2 focus:ring-purple-400/40"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && (
        <span className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
          {error.message}
        </span>
      )}
    </>
  );
};

export default SelectBox;
