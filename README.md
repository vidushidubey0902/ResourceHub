# Dev-10

A comprehensive resource hub, made specifically for all types of experienced, as well as aspiring developers, using the MERN stack.

## Contains the following features:

- Authentication system
- Users can explore collections of resources, which contains who the resources are for, what purpose they solve, and links that can help them learn
- Similar to this, there are collections of roadmaps as well. Our target users can explore roadmaps and decide the path they need to take in order to reach their goal.
- Consumers of these resources and roadmaps have the feature to rate and comment on them to give feedback on how good of a collection it is, what it lacks, where it excels, etc.
- Creators of those collections have the full ability to later edit or delete their collection, or check the total views of it over time, and see the feedback, responses, and ratings their collections are getting.
- Consumers have the ability to search for specific roadmaps or resources, or sort them based on factors such as ratings / popularity, creation date, etc.
- We, the admins of the website, provide our own officially made resources and roadmaps as well, and users can tell them apart from community-made collections
- Users have the ability to bookmark their favorite resources or collections, so they can easily check them out later.
- On the home page, their last 3 viewed resources and roadmaps are displayed as well, for easy accessibility.
- We also give a curated list of projects for different types of developers, that could aid them in taking their skills to the next level.
- Has an AI chatbot for people to interact with, and clear their doubts up in real time.
- And many more side features, which are updated regularly

<hr /><hr />

# Project Explanation

1.  The [**backend**](https://github.com/dev10-org/Dev-10/tree/main/backend) folder contains all of the server's files (database URIs, routes, controllers, schemas, etc.)
2.  The [**frontend**](https://github.com/dev10-org/Dev-10/tree/main/frontend) folder contains all of the components which are displayed to the client (UI / UX, CSS, components, API integrations, state management, etc.)

## backend folder

> **[server.js](https://github.com/dev10-org/Dev-10/blob/main/backend/server.js)**

Main entry point for the server to access everything from. This is the only file that runs when the server start, and this file alone manages everything.

    app.use(express.json());
    app.use(express.urlencoded({  extended:  true  }));
    app.use(cookieParser());

    cron.schedule("0 0 1 * *",  async  ()  =>  {
        try  {
    	    await  Resource.updateMany({},  {  $set:  {  monthlyViews:  0  }  });
        }  catch (error) {
    	    console.error("error resetting monthly views:",  error);
        }
    });
    app.use("/api/users",  userRoutes);
    app.use("/api/resources",  resourceRoutes);
    app.use("/api/resources/report",  resourceReportRoutes);
    app.use("/api/notes",  noteRoutes);
    app.use(notFound);
    app.use(errorHandler);

Adds middleware to parse JSON and cookies in API routes, and adds a cron job that resets monthlyViews of resources every month at midnight. Also adds base path for each type of routes, and adds middleware at the end for error handlers.

> **folder [routes/](https://github.com/dev10-org/Dev-10/tree/main/backend/routes)**

Contains extended paths for controller functions, that concatenate with the base path in server.js and runs the corresponding controller function mentioned in it, along with the request method.

    const  createResourceRateLimiter  =  rateLimit({
        windowMs:  15  *  60  *  60,
        limit:  20,
        message:  "Too many requests to create collections, please try again later.",
    });

Creates a rate limiter, so that an end user can't send too many requests at once

> **folder [models/](https://github.com/dev10-org/Dev-10/tree/main/backend/models)**

Defines schemas of different types of models.

    userSchema.methods.matchPassword  =  async  function  (enteredPassword)  {
        return  await  bcrypt.compare(enteredPassword,  this.password);
    };

    userSchema.pre("save",  async  function  (next)  {
        if (!this.isModified("password")) {
        next();
    }
        const  salt  =  await  bcrypt.genSalt(8);
        this.password  =  await  bcrypt.hash(this.password,  salt);
    });

Defines a function that hashes the password, which executes before any data is saved in this model. Also defines a helper function that helps compare hashed passwords to normal passwords, to make it easier to authenticate in the backend.

> **folder [middleware/](https://github.com/dev10-org/Dev-10/tree/main/backend/middleware)**

Defines middlewares. [_Auth middleware_](https://github.com/dev10-org/Dev-10/blob/main/backend/middleware/authMiddleware.js) checks if the user is logged in before executing any controller function which is called right after this middleware is called;
[_Error middleware_](https://github.com/dev10-org/Dev-10/blob/main/backend/middleware/errorMiddleware.js) runs right after a controller function is called, in order to handle errors accordingly.

> **folder [config/](https://github.com/dev10-org/Dev-10/tree/main/backend/config)**

Has a file which contains a function that connects to the MongoDB cloud database (called in [server.js](https://github.com/dev10-org/Dev-10/blob/main/backend/server.js))

> **folder [controllers/](https://github.com/dev10-org/Dev-10/tree/main/backend/controllers)**

Contains functions that are executed on different routes and request methods.
Uses `asyncHandler` library to handle asynchronous functions without having to use try-catch repeatedly

> **folder [utils/](https://github.com/dev10-org/Dev-10/tree/main/backend/utils)**

Contains some utility helper functions that are used by controllers and middlewares

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
}

const UpdateResourceForm: React.FC<UpdateResourceFormProps> = ({
  resourceId,
  onClose,
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

    console.log("Submitting data:", data); // Debug: Log the data being submitted

    try {
      updateResourceSchema.parse(data);
      setErrors({});

      await updateResource({ id: resourceId, data }).unwrap();
      toast.success("Resource updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      onClose();
    } catch (error) {
      console.error("Update failed:", error); // Debug: Log the error

      if (error instanceof z.ZodError) {
        const newErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        toast.error("Failed to update resource");
      }
    }
  };

  return (
    <Portal>
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
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
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg"
              >
                Update Resource
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default UpdateResourceForm;
