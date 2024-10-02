import { toast } from "react-toastify";
import { ChromePicker } from "react-color";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

import {
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from "../../slices/notesApiSlice";
import useDebounce from "../../hooks/useDebounce";
import { ApiError, ModifyNoteProps } from "../../utils/types";

const ModifyNotePopup = ({ note, requestRefetch }: ModifyNoteProps) => {
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<string>(note.color);
  const debouncedColor = useDebounce(color, 700);

  const [deleteNote, { isLoading: isDeleting }] = useDeleteNoteMutation();
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation();

  const handleDelete = async () => {
    try {
      await deleteNote(note?._id).unwrap();
      toast.success("Note has been removed");
      requestRefetch();
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
    }
  };

  const handleColorChange = async (color: { hex: string }) => {
    setColor(color.hex);
  };

  useEffect(() => {
    const updateColor = async () => {
      if (debouncedColor !== note.color) {
        try {
          await updateNote({ id: note._id, color: debouncedColor }).unwrap();
          toast.success("Note color has been updated");
          requestRefetch();
        } catch (error) {
          const err = error as ApiError;
          toast.error(err?.data?.message || err?.error);
        }
      }
    };

    updateColor();
  }, [debouncedColor, note._id, note.color, updateNote, requestRefetch]);

  return (
    <>
      <div className="flex justify-end py-1 px-2">
        <div
          className="inline rounded-full border border-white cursor-pointer"
          style={{ backgroundColor: color }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        >
          <div className="w-2 h-2 md:w-3 md:h-3" />
        </div>
      </div>
      {showColorPicker && (
        <div className="absolute top-4 z-10">
          <ChromePicker color={color} onChange={handleColorChange} />
        </div>
      )}

      <div className="flex-grow flex justify-center items-center">
        <div
          onClick={handleDelete}
          className="bg-gray-400/40 p-2 rounded-full border border-white cursor-pointer"
        >
          {isDeleting || isUpdating ? (
            <div className="w-2 h-2 md:w-3 md:h-3 bg-gradient-to-r from-purple-100 via-purple-800 to-purple-400 rounded-full border-2 p-1 animate-spin">
              <div
                className="rounded-full h-full w-full"
                style={{ backgroundColor: `${note.color}` }}
              ></div>
            </div>
          ) : (
            <FaRegTrashCan className="md:text-xl xl:text-2xl" />
          )}
        </div>
      </div>
    </>
  );
};

export default ModifyNotePopup;
