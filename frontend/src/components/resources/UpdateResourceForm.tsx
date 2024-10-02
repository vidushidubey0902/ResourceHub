import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { useUpdateResourceMutation } from "../../slices/resourcesApiSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { z } from "zod";
import { updateResourceSchema } from "../../utils/schema";

// Portal Component
const Portal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return ReactDOM.createPortal(
    children,
    document.getElementById("update-resource") as HTMLElement
  );
};

// URLInput Component
const URLInput: React.FC<{
  urls: string[];
  setUrls: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  error?: string;
}> = ({ urls, setUrls, label, error }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (input.trim()) {
        setUrls((prevUrls) => [...prevUrls, input.trim()]);
        setInput("");
      }
    } else if (e.key === "Backspace" && !input && urls.length) {
      setUrls((prevUrls) => prevUrls.slice(0, -1));
    }
  };

  const handleRemoveUrl = (index: number) => {
    setUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col group relative pb-5">
      <label
        htmlFor={label}
        className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
      >
        {label}
      </label>
      <div
        onClick={handleDivClick}
        className="peer rounded-lg bg-gray-300 w-full py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus-within:bg-gray-200 focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text"
      >
        <div className="flex flex-wrap gap-1">
          {urls.map((url, index) => (
            <div
              key={index}
              className="flex items-center bg-purple-200 text-purple-700 px-2 py-1 rounded"
            >
              {url}
              <button
                type="button"
                className="ml-1 font-bold"
                onClick={() => handleRemoveUrl(index)}
              >
                &times;
              </button>
            </div>
          ))}
          <input
            type="text"
            ref={inputRef}
            value={input}
            id={label}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent outline-none placeholder:text-xs focus:placeholder-purple-500/80 flex-grow"
            placeholder={`Enter ${label} and press Enter`}
          />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

// UpdateResourceForm Component
interface UpdateResourceFormProps {
  resourceId: string;
  onClose: () => void;
  refetchResources: () => void;
}

const UpdateResourceForm: React.FC<UpdateResourceFormProps> = ({
  resourceId,
  onClose,
  refetchResources,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [essentials, setEssentials] = useState<string[]>([]);
  const [extras, setExtras] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [updateResource] = useUpdateResourceMutation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState("");

  const handleDivClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (input.trim() && tags.length < 5) {
        if (input.length <= 8) {
          setTags((prevTags) => [...prevTags, input.trim()]);
          setInput("");
          setErrors((prev) => ({ ...prev, tags: "" }));
        } else {
          setErrors((prev) => ({
            ...prev,
            tags: "Each tag can't exceed more than 8 characters",
          }));
        }
      } else if (tags.length >= 5) {
        setErrors((prev) => ({ ...prev, tags: "Can't have more than 5 tags" }));
      }
    } else if (e.key === "Backspace" && !input && tags.length) {
      setTags((prevTags) => prevTags.slice(0, -1));
      setErrors((prev) => ({ ...prev, tags: "" }));
    }
  };

  const handleRemoveTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      title,
      description,
      tags,
      essentials,
      extras,
      notes,
    };

    try {
      updateResourceSchema.parse(data);
      setErrors({});

      await updateResource({ id: resourceId, data }).unwrap();

      // Move success toast here
      toast.success("Resource updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      refetchResources();
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        // This will handle API errors or any other unexpected errors
        toast.error("Failed to update resource", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
        });
      }
    }
  };

  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
          <h2 className="text-2xl font-bold text-purple-700 mb-4">
            Update Resource
          </h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-purple-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>
            <div className="flex flex-col group relative pb-5">
              <label
                htmlFor="tags"
                className="text-xs pb-1 pl-0.5 font-medium text-gray-500 transition-all duration-500 ease-in-out group-focus-within:text-purple-500"
              >
                Tags
              </label>
              <div
                onClick={handleDivClick}
                className="peer rounded-lg bg-gray-300 lg:w-1/2 py-2 px-2 text-sm font-light outline-none drop-shadow-sm transition-all duration-500 ease-in-out focus-within:bg-gray-200 focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text"
              >
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-purple-200 text-purple-700 px-2 py-1 rounded"
                    >
                      {tag}
                      <button
                        type="button"
                        className="ml-1 font-bold"
                        onClick={() => handleRemoveTag(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <input
                    type="text"
                    ref={inputRef}
                    value={input}
                    id="tags"
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent outline-none placeholder:text-xs focus:placeholder-purple-500/80 flex-grow"
                    placeholder="Enter tags and press Enter"
                  />
                </div>
              </div>
              {errors.tags && (
                <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
              )}
            </div>
            <URLInput
              urls={essentials}
              setUrls={setEssentials}
              label="Essentials"
              error={errors.essentials}
            />
            <URLInput
              urls={extras}
              setUrls={setExtras}
              label="Extras"
              error={errors.extras}
            />
            <div className="mb-4">
              <label className="block text-purple-700 font-semibold mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg border-gray-300"
              />
              {errors.notes && (
                <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
              )}
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                Update Resource
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </Portal>
  );
};

export default UpdateResourceForm;
