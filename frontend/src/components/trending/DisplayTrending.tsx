import { useGetTrendingQuery } from "../../slices/resourcesApiSlice";
import { useNavigate } from "react-router-dom";
import TextFlipAnimated from "../TextFlipAnimated";

type Trending = {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

const DisplayTrending = () => {
  const navigate = useNavigate();

  const {
    data: trendingResources = [],
    error,
    isLoading,
  } = useGetTrendingQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading trending resources</div>;
  }

  const handleTrendingClick = (resourceId: string) => {
    navigate(`/resource/${resourceId}`);
  };

  return (
    <div className="h-full bg-home-bg p-6">
      <div className="text-base sm:text-lg md:text-xl lg:text-2xl pt-2 md:pt-4 lg:pt-5 w-full mb-4">
        <TextFlipAnimated children=" TRENDING RESOURCES" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trendingResources.map((resource: Trending) => (
          <div
            key={resource._id}
            onClick={() => handleTrendingClick(resource._id)}
            className="cursor-pointer border rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-white to-purple-200"
          >
            {resource.imageUrl && (
              <img
                src={resource.imageUrl}
                alt={resource.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <div className="text-lg font-semibold">{resource.title}</div>
              {resource.description && (
                <div className="text-sm text-violet-900 mt-2">
                  {resource.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayTrending;
