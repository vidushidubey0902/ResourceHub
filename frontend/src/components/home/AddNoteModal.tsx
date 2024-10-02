import { useState } from "react";
import { toast } from "react-toastify";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { ChromePicker } from "react-color";
import { zodResolver } from "@hookform/resolvers/zod";

import { addNoteSchema } from "../../utils/schema";
import { useCreateNoteMutation } from "../../slices/notesApiSlice";
import { AddNoteFields, AddNoteModalProps, ApiError } from "../../utils/types";

const AddNoteModal = ({
  isOpen,
  onRequestClose,
  requestRefetch,
}: AddNoteModalProps) => {
  const [color, setColor] = useState<string>("#444444");
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleColorChange = (color: { hex: string }) => {
    setColor(color.hex);
    setValue("color", color.hex);
  };
  const handleClickOutside = () => {
    if (showColorPicker) setShowColorPicker(false);
  };
  const handleColorPickerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AddNoteFields>({
    resolver: zodResolver(addNoteSchema),
  });

  const [createNewNote, { isLoading }] = useCreateNoteMutation();

  const onSubmit = async (data: AddNoteFields) => {
    try {
      const notesData = { ...data, color };
      await createNewNote(notesData).unwrap();
      toast.success("A new note has been created");
      reset();
      onRequestClose();
      requestRefetch();
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black px-1"
      onClick={onRequestClose}
    >
      <div
        className="bg-home-secondary p-6 rounded-lg shadow-xl max-w-md w-full"
        onClick={(e) => {
          e.stopPropagation();
          handleClickOutside();
        }}
      >
        <h2 className="text-center pb-4 font-medium tracking-wide sm:text-lg md:text-xl text-home-text">
          Create a New Note
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <div className="pb-4 relative">
            <label
              htmlFor="title"
              className="block text-[0.68rem] md:text-xs font-medium pb-1 text-home-text"
            >
              Title
            </label>
            <input
              {...register("title")}
              id="title"
              type="text"
              className="block w-full p-2 text-home-text text-[0.65rem] md:text-xs rounded bg-home-quaternary outline-none focus:ring-1 focus:ring-purple-300"
            />
            {errors.title && (
              <p className="absolute left-0 bottom-0 text-red-600 text-[0.6rem] md:text-[0.7rem] mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* content */}
          <div className="py-4 relative">
            <label
              htmlFor="content"
              className="block text-[0.68rem] md:text-xs font-medium pb-1 text-home-text"
            >
              Content
            </label>
            <textarea
              {...register("content")}
              id="content"
              className="block w-full p-2 text-[0.65rem] md:text-xs rounded bg-home-quaternary resize-none outline-none focus:ring-1 focus:ring-purple-300 text-home-text"
            />
            {errors.content && (
              <p className="absolute left-0 bottom-0 text-red-600 text-[0.6rem] md:text-[0.7rem] mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* color */}
          <div className="py-4 relative">
            <label
              htmlFor="color"
              className="block text-[0.68rem] md:text-xs font-medium pb-1 text-home-text"
            >
              Color
            </label>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowColorPicker(!showColorPicker);
              }}
              className={`block w-full text-home-text p-2 text-[0.65rem] md:text-xs border-[1.5px] rounded outline-none focus:ring-1 focus:ring-purple-300`}
              style={{ backgroundColor: `${color}60`, borderColor: `${color}` }}
            >
              {color}
            </button>
            {showColorPicker && (
              <div
                className="sm:pt-1 absolute right-0 top-0"
                onClick={handleColorPickerClick}
              >
                <ChromePicker color={color} onChange={handleColorChange} />
              </div>
            )}
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex bg-home-tertiary text-home-text justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-home-primary focus:outline-none"
            >
              {isLoading ? "Creating.." : "Add note"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("add-note")!
  );
};

export default AddNoteModal;
