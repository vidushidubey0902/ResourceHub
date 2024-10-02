import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RiArrowRightDoubleLine } from "react-icons/ri";

import BoxHeading from "./BoxHeading";
import { RootState } from "../../store";
import NoRecentsFound from "./NoRecentsFound";

const RecentVisits = () => {
  const { recents } = useSelector((state: RootState) => state.recentlyVisited);

  return (
    <div className="bg-gradient-to-br from-home-secondary via-home-bg to-home-accent rounded-xl shadow-md shadow-black/10 theme-transition">
      <BoxHeading text="Recently Viewed Resources" />

      {recents.length !== 0 && (
        <p className="text-[0.65rem] md:text-xs italic text-home-text-secondary font-light text-center tracking-wide">
          Continue where you left off !
        </p>
      )}

      {recents.length === 0 ? (
        <NoRecentsFound />
      ) : (
        <ul className="flex-grow px-3 py-1 md:py-2 grid grid-cols-1 gap-2">
          {recents?.map((recent) => (
            <li
              key={recent.id}
              className="text-sm flex items-center gap-2 h-fit"
            >
              <Link
                to={`/${recent.type}/${recent.id}`}
                className="p-2 w-full capitalize whitespace-pre overflow-hidden text-ellipsis relative flex items-center group text-home-text"
              >
                {recent.title}

                <div className="absolute h-full flex items-center justify-end left-0 w-0 px-0 overflow-hidden bg-gradient-to-r from-blue-600/15 via-blue-400/10 to-blue-100/25 rounded-xl group-hover:w-full transition-all duration-500 group-hover:px-4">
                  <RiArrowRightDoubleLine className="opacity-0 group-hover:opacity-100 transition-opacity duration-1000 text-lg" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentVisits;
