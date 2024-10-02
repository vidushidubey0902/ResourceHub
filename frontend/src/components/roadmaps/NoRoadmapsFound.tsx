import { Link } from "react-router-dom";
import { BiPlusCircle, BiSearch } from "react-icons/bi";

import NoResults from "../../assets/NoResults.gif";
interface NoRoadmapFoundProps {
  onExploreRoadmap: () => void;
}

const NoRoadmapFound: React.FC<NoRoadmapFoundProps> = ({
  onExploreRoadmap,
}) => {
  return (
    <div className="mx-4 h-full grid grid-rows-2 rounded-xl">
      <div className="flex justify-center items-center">
        <img src={NoResults} alt="couldnt find" />
      </div>

      <div className="text-xs md:text-sm flex flex-col">
        <div className="px-2 text-center tracking-wide">
          <p className="italic font-thin text-no-roadmap-text">
            No matching roadmap could be found.
          </p>
          <p className="font-extralight text-no-roadmap-text">
            Did you mean to{" "}
            <Link to="/resources" className="text-no-roadmap-link font-light">
              search resources?
            </Link>
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center items-center md:text-base gap-y-4 gap-x-8">
          <button>
            <Link
              to="/contribute/roadmaps"
              className="bg-gradient-to-r from-no-roadmap-btn-bg-1 via-blue-400 to-no-roadmap-btn-bg-2 text-no-roadmap-btn-1-text px-3 py-2 shadow-lg hover:shadow-2xl transition-all duration-300 font-black rounded-lg flex justify-center items-center gap-2"
            >
              <BiPlusCircle size={24} color="#1c1e1f" />
              Add your own roadmap
            </Link>
          </button>

          <button
            onClick={onExploreRoadmap}
            className="bg-transparent border-2 border-no-roadmap-btn-2-border text-no-roadmap-btn-2-text px-3 py-2 shadow-lg hover:shadow-2xl transition-all duration-300 font-bold rounded-lg flex justify-center items-center gap-2"
          >
            <BiSearch size={24} /> Explore other roadmaps
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoRoadmapFound;
