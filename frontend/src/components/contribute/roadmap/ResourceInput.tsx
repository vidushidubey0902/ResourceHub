import { ResourceInputProps } from "../../../utils/types";
import RoadmapInputLabel from "./RoadmapInputLabel";

const ResourceInput = ({
  label,
  id,
  resources,
  resourceInput,
  onResourceInputChange,
  onResourceKeyDown,
  onRemoveResource,
  onDivClick,
  disabled,
  resourceRef,
  error,
  placeholder,
}: ResourceInputProps) => (
  <div className="grid gap-0.5 group relative pt-3 pb-5">
    <RoadmapInputLabel htmlFor={id} text={label} />

    <div
      onClick={onDivClick}
      className="peer rounded-lg bg-home-secondary py-2 px-2 text-sm font-light outline-none transition-all duration-500 ease-in-out focus-within:ring-2 focus-within:ring-purple-400/40 cursor-text"
    >
      <div className="flex flex-wrap gap-1">
        {resources.map((resource, resourceIdx) => (
          <div
            key={resourceIdx}
            className="flex items-center bg-home-quaternary text-home-text px-2 py-1 rounded"
          >
            {resource}
            <button
              type="button"
              className="ml-1 font-bold"
              onClick={() => onRemoveResource(resourceIdx)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          ref={(el) => {
            if (el && resourceRef) {
              resourceRef = el;
            }
          }}
          value={resourceInput}
          onChange={onResourceInputChange}
          onKeyDown={onResourceKeyDown}
          id={id}
          className="bg-transparent w-full outline-none placeholder:text-xs text-home-text focus:placeholder-purple-500/80 disabled:placeholder-transparent"
          placeholder="Enter comma separated resources"
          disabled={disabled}
        />
      </div>
    </div>

    {error ? (
      <p className="text-[0.6rem] md:text-[0.65rem] text-red-500 absolute pl-0.5 pt-1 font-semibold bottom-0">
        {error}
      </p>
    ) : (
      <span className="absolute text-[0.6rem] md:text-[0.65rem] pl-0.5 pt-1 font-semibold text-home-text hidden transition-all ease-in-out group-focus-within:block bottom-0">
        {placeholder}
      </span>
    )}
  </div>
);

export default ResourceInput;
