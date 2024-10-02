const validateRoadmapFields = (title, description, tags, steps) => {
  if (!title || !description || !tags || !steps) {
    throw new Error("Please include all required fields");
  }

  if (!Array.isArray(tags) || !tags.length) {
    throw new Error("Tags must be a non-empty array");
  }

  if (!Array.isArray(steps) || !steps.length) {
    throw new Error("Steps must be a non-empty array");
  }

  steps.forEach((step) => {
    if (
      !step.title ||
      !step.description ||
      !Array.isArray(step.resources) ||
      !step.resources.length
    ) {
      throw new Error(
        "Each step must have a title, description, and a resource link"
      );
    }

    if (step.resources.length > 4) {
      throw new Error("Each step can have a maximum of 4 resource links");
    }
  });
};

export default validateRoadmapFields;
