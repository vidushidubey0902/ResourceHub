import React from "react";

const NoNotes = () => {
  return (
    <React.Fragment>
      {[0, 1].map((_, idx) => (
        <div
          key={idx}
          className="h-32 lg:h-40 rounded-lg p-1 overflow-hidden shadow-lg bg-gray-400"
        >
          <h2 className="pb-1 text-[0.6rem] md:text-xs lg:text-base text-center font-bold md:font-black capitalize md:tracking-wide overflow-hidden whitespace-pre text-ellipsis">
            Your notes
          </h2>
          <p className="italic font-light text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-sm p-1">
            will be displayed here
          </p>
        </div>
      ))}
    </React.Fragment>
  );
};

export default NoNotes;
