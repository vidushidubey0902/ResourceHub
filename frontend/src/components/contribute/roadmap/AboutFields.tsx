import { useRef, useState } from "react";

import InputBox from "../../InputBox";
import TextAreaBox from "../../TextAreaBox";
import SeparatedInputsBox from "../../SeparatedInputsBox";
import RoadmapColumnHeading from "./RoadmapColumnHeading";
import { createRoadmapSchema } from "../../../utils/schema";
import { CreateRoadmapFieldsProps } from "../../../utils/types";

const AboutFields = ({
  register,
  errors,
  watch,
  setError,
  clearErrors,
  setValue,
}: CreateRoadmapFieldsProps) => {
  const watchTags = watch("tags", []);
  const [tagInput, setTagInput] = useState<string>("");
  const tagInputRef = useRef<HTMLInputElement | null>(null);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "," || e.key === "Enter") {
      e.preventDefault();
      const newTags = tagInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const validation = createRoadmapSchema.shape.tags.safeParse([
        ...watchTags,
        ...newTags,
      ]);

      if (!validation.success) {
        validation.error.errors.forEach((issue) => {
          setError("tags", { type: "manual", message: issue.message });
        });
      } else {
        clearErrors("tags");
        setValue("tags", validation.data);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (index: number) => {
    setValue(
      "tags",
      watchTags.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="bg-home-accent rounded-lg p-2">
      <RoadmapColumnHeading text="About the Roadmap" />
      <h4 className="text-center pt-4 text-xs text-home-text-secondary italic tracking-wide">
        General information about the roadmap you're submitting
      </h4>

      <div className="grid gap-0.5 group relative pt-3 pb-5">
        <InputBox
          label="Title"
          id="title"
          register={register}
          type="text"
          placeholder="Enter roadmap's title"
          error={errors.title}
          showHelperText={true}
          helperText="Enter your roadmap's title here"
        />
      </div>

      <div className="grid gap-0.5 group relative pt-3 pb-5">
        <TextAreaBox
          label="Description"
          id="description"
          register={register}
          placeholder="Enter roadmap's description"
          error={errors.description}
          helperText="Enter your roadmap's description"
        />
      </div>

      <div className="grid gap-0.5 group relative pt-3 pb-5">
        <SeparatedInputsBox
          label="Tags"
          id="tags"
          inputRef={tagInputRef}
          watchField={watchTags}
          value={tagInput}
          setValue={setTagInput}
          type="text"
          maxInputs={3}
          handleKeyDown={handleTagKeyDown}
          handleRemove={handleRemoveTag}
          placeholder="Enter comma separated tags"
          error={errors.tags}
          helperText="Enter comma separated tags to make your roadmap easily discoverable"
        />
      </div>
    </div>
  );
};

export default AboutFields;
