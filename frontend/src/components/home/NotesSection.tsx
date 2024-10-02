import { RiMenu3Line } from "react-icons/ri";
import DisplayNotes from "./DisplayNotes";
import { NotesSectionProps } from "../../utils/types";

const NotesSkeletonLoader = () => {
  return (
    <>
      {[1, 2, 3].map((_, idx) => (
        <div
          className={`h-24 sm:h-28 md:h-32 lg:h-40 rounded-lg grid gap-2 grid-cols-1 grid-rows-3 ${
            idx === 2 ? "col-span-2" : ""
          } w-full bg-slate-100 shadow-md p-2`}
          key={idx}
        >
          <div className="w-full max-h-2.5 md:max-h-4 rounded-3xl bg-gradient-to-r from-gray-400 via-gray-400 to-gray-200"></div>
          <div className="w-[80%] max-h-2.5 md:max-h-4 rounded-3xl bg-gradient-to-r from-gray-400 via-gray-400 to-gray-200"></div>
          <div className="w-[95%] max-h-2.5 md:max-h-4 rounded-3xl bg-gradient-to-r from-gray-400 via-gray-400 to-gray-200"></div>
        </div>
      ))}
    </>
  );
};

const NotesSection = ({
  isError,
  isLoading,
  handleViewAllNotes,
  handleCreateNote,
  data,
}: NotesSectionProps) => {
  if (isError) {
    return (
      <div className="italic w-full flex justify-center items-center h-32 lg:h-48 text-home-text">
        <h1>Error fetching notes..</h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full h-full bg-gradient-to-b from-home-secondary via-home-bg to-home-accent shadow-md shadow-black/10 p-1 rounded-xl theme-transition">
      <div className="flex justify-end items-center px-2 py-0.5">
        <h3 className="flex-grow text-center text-xs lg:text-sm font-light italic text-home-text theme-transition">
          Sticky Notes
        </h3>
        <RiMenu3Line
          className="cursor-pointer text-xs lg:text-sm text-home-text"
          onClick={handleViewAllNotes}
        />
      </div>
      <div className="grid grid-cols-2 gap-1">
        {isLoading ? (
          <NotesSkeletonLoader />
        ) : (
          <DisplayNotes notes={data} handleCreateNote={handleCreateNote} />
        )}
      </div>
    </div>
  );
};

export default NotesSection;
