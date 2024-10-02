const InputLabel = ({ text, htmlFor }: { text: string; htmlFor: string }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-[0.6rem] lg:text-xs pb-1 pl-0.5 font-medium text-home-text-secondary transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
    >
      {text}
    </label>
  );
};

export default InputLabel;
