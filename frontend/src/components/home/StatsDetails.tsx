const StatsNumber = ({
  number,
  decimal,
}: {
  number: number;
  decimal?: boolean;
}) => {
  return (
    <h2 className="flex justify-center items-start font-black text-3xl sm:text-4xl lg:text-5xl text-home-text theme-transition">
      {decimal ? number?.toFixed(1) : number || "N/A"}
    </h2>
  );
};

export default StatsNumber;
