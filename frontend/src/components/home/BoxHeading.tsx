const BoxHeading = ({ text }: { text: string }) => {
  return (
    <h3 className="italic text-center pt-2 pb-1 font-medium lg:tracking-wide text-base lg:text-xl text-home-text theme-transition">
      {text}
    </h3>
  );
};

export default BoxHeading;
