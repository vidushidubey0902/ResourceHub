import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { LuArrowUpRight } from "react-icons/lu";

import { homeMainBannerButtons } from "../../utils/constants";

const MainHeaderButtons = () => {
  return (
    <div className="grid text-xs sm:text-sm lg:text-base xl:text-lg flex-grow max-w-56 lg:max-w-60 xl:max-w-80">
      {homeMainBannerButtons.map((button, idx) => (
        <div
          key={idx}
          className={twMerge(
            "flex items-center p-1 sm:p-2 lg:p-3 xl:p-4",
            idx === 1 && "justify-end"
          )}
        >
          <Link
            to={button.url}
            className="bg-home-quaternary text-home-text font-semibold rounded-full p-1.5 lg:px-2 lg:py-1.5 relative group overflow-hidden"
          >
            <span className="relative z-[1]">
              &lt; {button.text} &#x2215;&gt;
            </span>
            <span className="absolute z-10 left-0 top-0 h-full w-0 rounded-full flex items-center justify-center group-hover:w-full transition-all duration-700 ease-in-out bg-gradient-to-tr from-home-primary to-home-tertiary text-home-text shadow-2xl overflow-clip">
              <LuArrowUpRight />
            </span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MainHeaderButtons;
