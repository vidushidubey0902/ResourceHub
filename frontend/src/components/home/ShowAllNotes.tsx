import { createPortal } from "react-dom";

import ModifyNotePopup from "./ModifyNotePopup";
import { ShowAllNotesProps } from "../../utils/types";

const ShowAllNotes = ({
  isOpen,
  notes,
  onRequestClose,
  requestRefetch,
}: ShowAllNotesProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black px-1"
      onClick={onRequestClose}
    >
      <div
        className="bg-home-secondary p-1 md:px-2 rounded-lg shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-home-text pb-4 font-medium tracking-wide sm:text-lg md:text-xl">
          Your Notes
        </h2>

        <div className="grid grid-cols-3 gap-0.5 sm:gap-1">
          {notes?.map((note) => (
            <div
              className="h-32 md:h-36 lg:h-40 rounded sm:rounded-lg p-1 overflow-hidden relative group"
              style={{ backgroundColor: `${note.color}` }}
              key={note._id}
            >
              <h2 className="pb-1 text-[0.7rem] md:text-xs lg:text-sm text-center font-bold md:font-black capitalize md:tracking-wide overflow-hidden whitespace-pre text-ellipsis">
                {note.title}
              </h2>
              <p className="font-light text-[0.7rem] md:text-xs lg:text-sm p-1">
                {note.content}
              </p>

              <div className="absolute bottom-0 left-0 w-full bg-black/30 h-0 group-hover:h-full transition-all duration-500 ease-in-out flex flex-col">
                <ModifyNotePopup note={note} requestRefetch={requestRefetch} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.getElementById("all-notes")!
  );
};

export default ShowAllNotes;
