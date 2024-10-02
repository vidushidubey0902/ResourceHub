import { memo, useState, useEffect } from "react";
import { addHttpPrefix } from "../../utils/helpers";
import { DetailedLinksAndNotesProps } from "../../utils/types";

const DetailedLinksAndNotes = ({
  links,
  notes,
}: DetailedLinksAndNotesProps) => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(0);

  const toggleDescription = (idx: number) => {
    setVisibleIndex(visibleIndex === idx ? null : idx);
  };

  useEffect(() => {
    setVisibleIndex(0);
  }, [links]);

  return (
    <div className="flex md:gap-1 flex-wrap md:flex-nowrap p-0.5 max-h-[30rem]">
      {/* links */}
      <div className="w-[60%] flex flex-col py-2 xl:py-4">
        <h2 className="w-full h-fit italic text-center tracking-wide font-light text-sm md:text-base lg:text-lg xl:text-2xl text-home-text theme-transition">
          All Links
        </h2>

        <ul className="w-full text-left font-thin tracking-wider text-[0.68rem] md:text-xs lg:text-sm 2xl:text-base pt-3 md:pt-6 xl:pt-8 px-0.5 md:px-2 grid gap-2">
          {links?.map((link: any, idx: number) => (
            <li
              key={idx}
              className="bg-home-accent group p-1 md:p-2 overflow-hidden text-ellipsis whitespace-pre rounded-xl hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer"
              onClick={() => toggleDescription(idx)}
            >
              <div className="grid grid-cols-[1fr_auto] content-center">
                <p className="overflow-hidden whitespace-pre text-ellipsis text-[0.6rem] md:text-xs font-semibold text-home-text theme-transition">
                  {link.url}
                </p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(
                      addHttpPrefix(link.url),
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                  className="group relative text-[0.5rem] md:text-xs text-home-text-link theme-transition font-bold p-1 rounded transition duration-300 ease-in-out"
                >
                  Open Link
                  <span className="absolute left-0 bottom-0 w-0 group-hover:w-full h-0.5 rounded-lg bg-home-text-secondary transition-all duration-500"></span>
                </button>
              </div>
              {visibleIndex === idx && (
                <p className="text-xs text-home-text italic theme-transition">
                  {link.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* notes */}
      <div className="w-[40%] flex flex-col py-2 xl:py-4">
        <h2 className="w-full h-fit text-center tracking-wide font-normal text-sm md:text-base lg:text-lg xl:text-2xl text-home-text theme-transition">
          Author Notes
        </h2>

        <div className="px-0.5 md:px-1 text-xs md:text-sm overflow-hidden pt-3 md:pt-6 xl:pt-8">
          <p className="break-words font-light px-1 md:px-1.5 xl:px-2 py-1 text-[0.68rem] md:text-xs lg:text-sm overflow-hidden text-ellipsis rounded-sm md:rounded-md bg-home-tertiary text-home-text italic tracking-wide theme-transition">
            {notes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(DetailedLinksAndNotes);
