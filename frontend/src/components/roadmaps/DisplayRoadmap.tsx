import { FormEvent, useCallback, useMemo, useState, useRef } from "react";

import TextFlipAnimated from "../TextFlipAnimated";
import {
  filterRoadmapDropdownItems,
  sortRoadmapDropdownItems,
} from "../../utils/constants";
import { RoadmapByRate, RoadmapSortType } from "../../utils/types";
import { useGetRoadmapQuery } from "../../slices/roadmapApiSlice";
import Dropdown from "../resources/Dropdown";
import { toast } from "react-toastify";
import RoadmapCard from "./RoadmapCard";
import NoRoadmapsFound from "./NoRoadmapsFound";
import PaginationButton from "../resources/PaginationButton";
import { focusAndClearSearch } from "../../utils/helpers";
import SearchIcon from "../resources/SearchIcon";

const DisplayRoadmaps = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [formInputs, setFormInputs] = useState({
    search: "",
    sort: "recent" as RoadmapSortType,
    filter: "highest" as RoadmapByRate,
    pageNumber: 1,
  });

  const memoizedFormInputs = useMemo(() => formInputs, [formInputs]);

  const { data, error, isLoading, isFetching, refetch } = useGetRoadmapQuery(
    memoizedFormInputs,
    {
      refetchOnConnect: true,
    }
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const newFormInputs = {
        search: searchQuery,
        sort: formInputs.sort,
        filter: formInputs.filter,
        pageNumber: 1,
      };

      if (
        JSON.stringify(newFormInputs) !== JSON.stringify(memoizedFormInputs)
      ) {
        setFormInputs(newFormInputs);
        refetch().then(() => {
          if (error) {
            toast.error(error.message);
          }
          console.log("refetched");
          console.log("data:\n", data);
          console.log("\n");
        });
      }
    },
    [
      searchQuery,
      formInputs.sort,
      formInputs.filter,
      memoizedFormInputs,
      refetch,
      error,
    ]
  );

  const handleNextPage = useCallback(() => {
    setFormInputs((prev) => ({ ...prev, pageNumber: prev.pageNumber + 1 }));
  }, []);

  const handlePrevPage = useCallback(() => {
    setFormInputs((prev) => ({
      ...prev,
      pageNumber: prev.pageNumber > 1 ? prev.pageNumber - 1 : 1,
    }));
  }, []);

  const handleSortSelect = useCallback((item: RoadmapSortType) => {
    setFormInputs((prev) => ({ ...prev, sort: item }));
  }, []);

  const handleFilterSelect = useCallback((item: RoadmapByRate) => {
    setFormInputs((prev) => ({ ...prev, filter: item }));
  }, []);

  const memoizedData = useMemo(() => data, [data]);

  return (
    <div className="h-full flex flex-col bg-home-bg theme-transition">
      <div className="text-center font-light pt-1 md:pt-2 text-sm sm:text-lg lg:text-xl xl:text-2xl">
        <TextFlipAnimated children="The perfect roadmaps curated for devs just like you" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="py-6 md:py-6 lg:py-6 px-2 md:px-4 xl:px-8 flex flex-wrap"
      >
        {/* search */}
        <div className="w-full relative flex justify-center items-center bg-home-primary rounded-xl">
          <label htmlFor="roadmap-search" className="absolute left-2">
            <SearchIcon isFetching={isFetching} />
          </label>
          <input
            ref={searchInputRef}
            id="roadmap-search"
            placeholder="Search for roadmaps.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full appearance-none text-home-text bg-transparent rounded-l-xl text-xs tracking-wider font-medium py-1.5 md:py-2 px-1 pl-8 outline-none"
          />
          <button
            type="submit"
            className="mr-1 md:mr-2 border-l-2 border-gray-600/50 pl-1 md:pl-2"
          >
            <span className="px-2 md:px-4 py-0.5 flex items-center justify-center text-xs md:text-sm font-medium transition-all duration-200 ease-in-out text-search-btn-text bg-home-quaternary hover:bg-home-accent rounded-lg">
              Search
            </span>
          </button>
        </div>

        <div className="w-full grid grid-cols-2 gap-2 place-items-center">
          <Dropdown
            label={`${formInputs.sort}`}
            items={sortRoadmapDropdownItems}
            onSelect={handleSortSelect}
          />
          <Dropdown
            label={formInputs.filter}
            items={filterRoadmapDropdownItems}
            onSelect={handleFilterSelect}
          />
        </div>
      </form>

      <div className="text-home-text w-full flex-grow">
        {isLoading || isFetching ? (
          <div className="w-full h-full grid grid-cols-2 grid-rows-2">
            {[...Array(4)].map((_, idx) => (
              <div role="status" key={idx} className="max-w-sm animate-pulse">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              </div>
            ))}
            <span className="sr-only">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center text-home-text">
            <p>Error fetching roadmaps</p>
          </div>
        ) : (
          <div className="min-w-full h-full">
            {data?.roadmaps?.length === 0 ? (
              <NoRoadmapsFound
                onExploreRoadmap={() =>
                  focusAndClearSearch(searchInputRef, setSearchQuery)
                }
              />
            ) : (
              <div className="h-full flex flex-col justify-between">
                <RoadmapCard resources={memoizedData?.roadmaps} />

                <div className="flex justify-center items-center gap-4 md:gap-6 xl:gap-8 py-1 pt-2 lg:py-1.5">
                  <PaginationButton
                    onClick={handlePrevPage}
                    disabled={formInputs.pageNumber === 1}
                    direction="prev"
                  />

                  <div>
                    <p className="text-home-text text-xs lg:text-sm font-medium">
                      Page <span>{formInputs.pageNumber}</span> of{" "}
                      <span>{data?.pages}</span>
                    </p>
                  </div>

                  <PaginationButton
                    onClick={handleNextPage}
                    disabled={data?.pages === formInputs.pageNumber}
                    direction="next"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayRoadmaps;
