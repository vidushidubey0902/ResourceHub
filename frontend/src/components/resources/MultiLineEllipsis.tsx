interface MultiLineProps {
  text: string;
  lines: number;
}

const MultiLineEllipsis = ({ text, lines = 3 }: MultiLineProps) => {
  return (
    <div
      style={{
        display: "-webkit-box",
        WebkitLineClamp: lines,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
      className="text-[0.6rem] md:text-xs 2xl:text-sm max-w-32 xl:max-w-xs tracking-wider italic font-light text-home-text"
    >
      {text}
    </div>
  );
};

export default MultiLineEllipsis;
