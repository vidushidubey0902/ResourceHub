const RoadmapColumnHeading = ({ text }: { text: string }) => {
  return (
    <h3 className="text-center font-semibold tracking-wide text-sm md:text-base lg:text-lg text-home-text">
      {text}
    </h3>
  );
};

export default RoadmapColumnHeading;
