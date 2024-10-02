import { Link } from "react-router-dom";

const NoRecentsFound = () => {
  return (
    <div className="h-full w-full px-2 py-1 md:py-2 flex items-center">
      <h3 className="text-xs md:text-sm xl:text-base italic font-light tracking-wide text-home-text">
        As you start viewing{" "}
        <span className="relative group">
          <Link
            to="/resources"
            className="text-home-link-text font-semibold underline underline-offset-2 decoration-blue-800 group-hover:text-white transition-all duration-500 ease-in-out group-hover:decoration-transparent"
          >
            resources
            <div className="absolute left-0 top-0 w-0 h-full group-hover:w-full group-hover:bg-blue-400/20 transition-all duration-500 ease-out" />
          </Link>
        </span>{" "}
        or{" "}
        <span className="relative group">
          <Link
            to="/roadmaps"
            className="text-home-link-text font-semibold underline underline-offset-2 decoration-blue-800 group-hover:text-white transition-all duration-500 ease-in-out group-hover:decoration-transparent"
          >
            roadmaps
            <div className="absolute left-0 top-0 w-0 h-full group-hover:w-full group-hover:bg-blue-400/20 transition-all duration-500 ease-out" />
          </Link>
        </span>
        , your recently accessed ones will appear here, providing you an easy
        way to access them again.
      </h3>
    </div>
  );
};

export default NoRecentsFound;
