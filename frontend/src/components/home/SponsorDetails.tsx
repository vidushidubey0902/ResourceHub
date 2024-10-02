import { GiPlainCircle } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";

import { addHttpPrefix } from "../../utils/helpers";
import { SponsorDetailsProps } from "../../utils/types";

const SponsorDetails = ({
  eventName,
  eventDate,
  eventLink,
}: SponsorDetailsProps) => {
  return (
    <div className="flex items-center justify-between border-2 border-home-text rounded-xl px-1 md:px-2 xl:px-3 text-[0.6rem] md:text-xs">
      <div className="flex gap-1 items-center">
        <GiPlainCircle className="text-[0.3rem] md:text-[0.4rem] lg:text-[0.5rem] text-home-text" />
        <p className="font-bold capitalize text-home-text theme-transition">
          {eventName}
        </p>
      </div>

      <div className="flex flex-col justify-center">
        <FaLocationDot className="text-center mx-auto text-sm text-home-text-secondary" />
        <p className="capitalize text-home-text theme-transition">
          {eventDate}
        </p>
      </div>

      <button className="bg-home-quaternary px-1.5 py-1 border border-black/20 rounded-lg font-semibold text-home-text theme-transition">
        <a
          href={addHttpPrefix(eventLink)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check It Out
        </a>
      </button>
    </div>
  );
};

export default SponsorDetails;
