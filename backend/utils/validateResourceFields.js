const validateResourceFields = (title, description, languages, links) => {
  if (!title || !description || !languages || !links) {
    throw new Error("Please include all required fields");
  }

  if (!Array.isArray(languages) || !languages.length) {
    throw new Error("languages must be a non-empty array");
  }

  if (!Array.isArray(links) || !links.length) {
    throw new Error("Essentials must be a non-empty array");
  }
};

export default validateResourceFields;
