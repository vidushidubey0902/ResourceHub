import { useState } from "react";
import { projects } from "../utils/project-constants";

const DisplayProjects = () => {
  const [selectedType, setSelectedType] = useState("All Types");

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const filteredProjects =
    selectedType === "All Types"
      ? projects
      : projects.filter((project) => project.type === selectedType);

  return (
    <>
      <section className="flex flex-col md:flex-row h-full bg-home-bg theme-transition">
        <div className="flex flex-col items-center w-full pt-1 md:pt-6">
          <div className="shadow-md w-full">
            <div className="py-2 md:py-3 px-4 w-full flex justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-home-text text-center">
                Explore Amazing Projects Here
              </h1>
            </div>
            <div className="py-2 px-4 w-full flex flex-col justify-center items-center mt-2">
              <label
                className="block w-full text-lg md:text-xl lg:text-2xl font-semibold text-black text-center mb-2 text-home-text-secondary"
                htmlFor="projectType"
              >
                Choose Project Type:
              </label>
              <div className="w-full flex flex-wrap justify-center space-x-0 space-y-2 sm:space-x-4 sm:space-y-0">
                <button
                  onClick={() => handleTypeChange("All Types")}
                  className={`appearance-none w-auto bg-home-primary border border-purple-300 text-home-text text-xs md:text-sm rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    selectedType === "All Types" ? "bg-home-quaternary" : ""
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleTypeChange("Game Dev")}
                  className={`appearance-none w-auto bg-home-primary border border-purple-300 text-home-text text-xs md:text-sm rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    selectedType === "Game Dev" ? "bg-home-quaternary" : ""
                  }`}
                >
                  Game Dev
                </button>
                <button
                  onClick={() => handleTypeChange("Web Dev")}
                  className={`appearance-none w-auto bg-home-primary border border-purple-300 text-home-text text-xs md:text-sm rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    selectedType === "Web Dev" ? "bg-home-quaternary" : ""
                  }`}
                >
                  Web Dev
                </button>
                <button
                  onClick={() => handleTypeChange("Android Dev")}
                  className={`appearance-none w-auto bg-home-primary border border-purple-300 text-home-text text-xs md:text-sm rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    selectedType === "Android Dev" ? "bg-home-quaternary" : ""
                  }`}
                >
                  Android Dev
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 w-full mt-4">
            {filteredProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-home-quaternary to-home-accent shadow-lg shadow-white/10 border border-purple-300 rounded-lg p-4 transform transition-transform duration-300 hover:scale-105"
              >
                <h2 className="text-xl font-bold text-home-text">
                  {project.title}
                </h2>
                <p className="text-home-text-secondary">
                  {project.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default DisplayProjects;
