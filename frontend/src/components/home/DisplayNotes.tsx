import { FaPlus } from "react-icons/fa6";

import NoNotes from "./NoNotes";
import { DisplayNotesProps } from "../../utils/types";

const DisplayNotes = ({ notes, handleCreateNote }: DisplayNotesProps) => {
  return (
    <>
      {notes.length === 0 ? (
        <NoNotes />
      ) : (
        <>
          {notes.map((note) => (
            <div
              key={note._id}
              className="h-32 lg:h-40 rounded-lg p-1 overflow-hidden shadow-lg"
              style={{ backgroundColor: `${note.color}` }}
            >
              <h2 className="pb-1 text-[0.6rem] md:text-xs lg:text-base text-center font-bold md:font-black capitalize md:tracking-wide overflow-hidden whitespace-pre text-ellipsis">
                {note.title}
              </h2>
              <p className="italic font-light text-[0.5rem] sm:text-[0.6rem] md:text-[0.7rem] lg:text-sm p-1">
                {note.content}
              </p>
            </div>
          ))}
        </>
      )}

      <div
        className="col-span-2 bg-home-note-add h-32 rounded-lg flex justify-center items-center cursor-pointer theme-transition"
        onClick={handleCreateNote}
      >
        <FaPlus className="text-home-text-secondary text-3xl bg-home-secondary border-black/30 border-2 rounded-full p-1 theme-transition" />
      </div>
    </>
  );
};

export default DisplayNotes;
