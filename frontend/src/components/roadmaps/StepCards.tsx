import React, { useState } from "react";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa"; // For the close and arrow icons

interface Step {
  title: string;
  description: string;
  resources: string[];
}

const RoadmapSteps: React.FC<{ steps: Step[] }> = ({ steps }) => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(
    null
  );

  const openDialog = (index: number) => {
    setSelectedStepIndex(index);
  };

  const closeDialog = () => {
    setSelectedStepIndex(null);
  };

  const nextStep = () => {
    if (selectedStepIndex !== null && selectedStepIndex < steps.length - 1) {
      setSelectedStepIndex(selectedStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (selectedStepIndex !== null && selectedStepIndex > 0) {
      setSelectedStepIndex(selectedStepIndex - 1);
    }
  };

  return (
    <div className="relative">
      {/* Horizontal scrollable step cards */}
      <div className="flex space-x-6 overflow-x-auto py-4 w-full scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {steps.map((_, index) => (
          <div
            key={index}
            onClick={() => openDialog(index)}
            className="flex-shrink-0 w-64 h-48 bg-gradient-to-br from-home-quaternary to-home-accent text-white flex items-center justify-center cursor-pointer transition-all duration-300 hover:from-home-primary hover:to-home-accent rounded-lg"
          >
            <h2 className="text-4xl font-bold">
              {(index + 1).toString().padStart(2, "0")}
            </h2>
          </div>
        ))}
      </div>

      {/* Thin horizontal scrollbar */}
      <style>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          height: 4px;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
      `}</style>

      {/* Dialog Box */}
      {selectedStepIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-home-bg p-8 rounded-2xl shadow-xl relative max-w-lg w-full transform transition-transform duration-300 ease-out scale-100 opacity-100"
            style={{ animation: "fadeIn 0.4s ease-out, slideIn 0.4s ease-out" }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
              style={{
                animation: "fadeOut 0.4s ease-out, slideOut 0.4s ease-out",
              }}
              onClick={closeDialog}
            >
              <FaTimes size={24} />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevStep}
              className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors ${
                selectedStepIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={selectedStepIndex === 0}
            >
              <FaArrowLeft size={24} />
            </button>
            <button
              onClick={nextStep}
              className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors ${
                selectedStepIndex === steps.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={selectedStepIndex === steps.length - 1}
            >
              <FaArrowRight size={24} />
            </button>

            {/* Dialog Content */}
            <h3 className="text-2xl font-bold mb-4 text-home-text">
              {steps[selectedStepIndex].title}
            </h3>
            <p className="text-home-text-secondary mb-6">
              {steps[selectedStepIndex].description}
            </p>
            <ul className="list-disc ml-5 mb-4">
              {steps[selectedStepIndex].resources.map((resource, idx) => (
                <li key={idx}>
                  <a
                    href={resource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-home-text-link hover:underline"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-home-text-secondary mt-4 italic">
              Step {selectedStepIndex + 1} of {steps.length}
            </p>
            <button
              onClick={closeDialog}
              className="mt-4 bg-home-primary text-home-text px-6 py-2 rounded-lg hover:bg-home-quaternary theme-transition"
            >
              Close
            </button>
          </div>

          {/* Animation Styles */}
          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes slideIn {
              from {
                transform: translateY(30px);
              }
              to {
                transform: translateY(0);
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            @keyframes slideOut {
              from {
                transform: translateY(0);
              }
              to {
                transform: translateY(30px);
              }
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default RoadmapSteps;
