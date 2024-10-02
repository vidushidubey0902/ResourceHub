import { toast } from "react-toastify";
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import InputBox from "../../InputBox";
import TextAreaBox from "../../TextAreaBox";
import SeparatedInputsBox from "../../SeparatedInputsBox";
import { aboutResourceCollectionSchema } from "../../../utils/schema";
import {
  AboutCollectionFormProps,
  AboutResourceCollectionFields,
} from "../../../utils/types";

const AboutCollectionForm = ({ onSubmit }: AboutCollectionFormProps) => {
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm<AboutResourceCollectionFields>({
    resolver: zodResolver(aboutResourceCollectionSchema),
  });
  const watchLanguages = watch("languages", []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTags = input
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const validation =
        aboutResourceCollectionSchema.shape.languages.safeParse([
          ...watchLanguages,
          ...newTags,
        ]);

      if (!validation.success) {
        validation.error.errors.forEach((issue) => {
          setError("languages", { type: "manual", message: issue.message });
        });
      } else {
        clearErrors("languages");
        setValue("languages", validation.data);
        setInput("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    setValue(
      "languages",
      watchLanguages.filter((_, i) => i !== index)
    );
  };

  const handleFormSubmit: SubmitHandler<AboutResourceCollectionFields> = async (
    data
  ) => {
    try {
      onSubmit(data);
    } catch (error) {
      toast.error("An error has occurrred:", error!);
    }
  };

  return (
    <div className="h-full bg-home-bg theme-transition">
      <h1 className="text-center text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl py-4 font-semibold text-home-text theme-transition">
        Create Resource Collection
      </h1>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="px-2 md:px-8 pt-4 lg:pt-8 flex flex-col gap-2 md:gap-3"
      >
        {/* title */}
        <div className="flex flex-col group relative pb-5">
          <InputBox
            label="Title"
            id="title"
            register={register}
            type="text"
            placeholder="Resource collection's title"
            error={errors.title}
            showHelperText={true}
            helperText="Title of the resource collection"
            className="xl:w-2/3"
          />
        </div>

        {/* languages */}
        <div className="flex flex-col group relative pb-5">
          <SeparatedInputsBox
            label="Languages"
            id="languages"
            inputRef={inputRef}
            watchField={watchLanguages}
            value={input}
            setValue={setInput}
            type="text"
            maxInputs={3}
            handleKeyDown={handleKeyDown}
            handleRemove={handleRemoveTag}
            placeholder="Enter comma separated languages"
            error={errors.languages}
            helperText="Enter related languages / frameworks"
            className="lg:w-1/2"
          />
        </div>

        {/* description */}
        <div className="flex flex-col group relative pb-5">
          <TextAreaBox
            label="Short Description"
            id="description"
            register={register}
            placeholder="Description of what this resource collection is about"
            error={errors.description}
            helperText="Short Description About the Collection (Max 150 letters)"
          />
        </div>

        {/* notes */}
        <div className="flex flex-col group relative pb-5">
          <TextAreaBox
            label="Additional Notes"
            id="notes"
            register={register}
            placeholder="Additional notes to guide learners"
            error={errors.notes}
            helperText="Additional Notes for Learners (Max 200 letters)"
          />
        </div>

        <button
          className="bg-home-quaternary text-home-text font-bold tracking-wider rounded-lg md:rounded-xl p-3 text-sm lg:text-base"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading..." : "Next Page"}
        </button>
      </form>
    </div>
  );
};

export default AboutCollectionForm;
