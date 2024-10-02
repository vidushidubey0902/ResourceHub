import { useNavigate } from "react-router-dom";

import NoResourcesFound from "./NoResourcesFound";
import TextFlipAnimated from "../TextFlipAnimated";
import { useGetFavoriteResourcesQuery } from "../../slices/resourcesApiSlice";

type Resource = {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

const DisplayFavoriteResources = () => {
  const navigate = useNavigate();

  const {
    data: favoriteResources = [],
    error,
    isLoading,
  } = useGetFavoriteResourcesQuery();

  const handleResourceClick = (resourceId: string) => {
    navigate(`/resource/${resourceId}`);
  };

  const handleExploreResources = () => {
    navigate("/resources");
  };

  return (
    <div className="h-full bg-gradient-to-r from-white to-purple-300 p-6">
      <div className="text-base sm:text-lg md:text-xl lg:text-2xl pt-2 md:pt-4 lg:pt-5 w-full mb-4">
        <TextFlipAnimated children="BOOKMARKED RESOURCES" />
      </div>

      <div className="w-full flex-grow p-4 border border-gray-300 bg-gradient-to-r from-white to-purple-200 rounded-lg shadow-md mt-6">
        {isLoading ? (
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {[...Array(6)].map((_, idx) => (
              <div
                role="status"
                key={idx}
                className="max-w-md bg-gray-100 p-8 rounded-lg shadow-md animate-pulse transition-all duration-300"
              >
                <div className="h-6 bg-gray-300 rounded-full mb-6"></div>
                <div className="h-4 bg-gray-300 rounded-full max-w-[300px] mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-full max-w-[250px] mb-4"></div>
                <div className="h-4 bg-gray-300 rounded-full max-w-[200px]"></div>
              </div>
            ))}
            <span className="sr-only">Loading...</span>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center py-8">
            <p className="text-red-500 text-lg">
              Error fetching favorite resources
            </p>
          </div>
        ) : (
          <div className="w-full">
            {favoriteResources?.length === 0 ? (
              <NoResourcesFound onExploreResources={handleExploreResources} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-8">
                {favoriteResources?.map((resource: Resource) => (
                  <div
                    key={resource._id}
                    className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
                    onClick={() => handleResourceClick(resource._id)}
                  >
                    <div className="relative pb-2/3 mb-4">
                      {resource.imageUrl ? (
                        <img
                          src={resource.imageUrl}
                          alt={resource.title}
                          className="absolute inset-0 w-full h-full object-cover rounded-lg transition-opacity duration-300"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 rounded-lg"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm md:text-lg lg:text-2xl font-bold text-gray-900 mb-4 capitalize break-words overflow-hidden whitespace-pre text-ellipsis align-middle">
                        {resource.title}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-900 mb-4 overflow-hidden break-words whitespace-break-spaces">
                        {resource.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayFavoriteResources;
